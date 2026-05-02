import { db } from "../db/index.js";
import { booking, room, user } from "../db/schema.js";
import { eq, and, sql, gte, lte, desc } from "drizzle-orm";

export const reportService = {
  async getKPI(startDate: string, endDate: string) {
    const cond = and(gte(booking.date, startDate), lte(booking.date, endDate));
    const [total] = await db.select({ count: sql<number>`count(*)` }).from(booking).where(cond);
    const [avgDur] = await db.select({ avg: sql<string>`coalesce(avg(extract(epoch from (${booking.endTime}::time - ${booking.startTime}::time)) / 3600), 0)` }).from(booking).where(and(cond, eq(booking.status, "confirmed")));
    const uniqueUsers = await db.selectDistinct({ userId: booking.userId }).from(booking).where(cond);
    const [totalRooms] = await db.select({ count: sql<number>`count(*)` }).from(room);
    const bookedRooms = await db.selectDistinct({ roomId: booking.roomId }).from(booking).where(and(cond, eq(booking.status, "confirmed")));
    const utilization = Number(totalRooms.count) > 0 ? Math.round((bookedRooms.length / Number(totalRooms.count)) * 100) : 0;
    return { utilization, avgDuration: parseFloat(parseFloat(avgDur.avg || "0").toFixed(1)), totalBookings: Number(total.count), uniqueUsers: uniqueUsers.length };
  },

  async getTrends(startDate: string, endDate: string) {
    const result = await db.select({ date: booking.date, count: sql<number>`count(*)` }).from(booking).where(and(gte(booking.date, startDate), lte(booking.date, endDate), eq(booking.status, "confirmed"))).groupBy(booking.date).orderBy(booking.date);
    return result.map(r => ({ date: r.date, count: Number(r.count) }));
  },

  async getByDepartment(startDate: string, endDate: string) {
    const result = await db.select({ department: user.department, count: sql<number>`count(*)` }).from(booking).innerJoin(user, eq(booking.userId, user.id)).where(and(gte(booking.date, startDate), lte(booking.date, endDate))).groupBy(user.department);
    const total = result.reduce((sum, r) => sum + Number(r.count), 0);
    return result.map(r => ({ department: r.department || "Unassigned", count: Number(r.count), percentage: total > 0 ? Math.round((Number(r.count) / total) * 100) : 0 }));
  },

  async getRoomUtilization(startDate: string, endDate: string) {
    const rooms = await db.query.room.findMany();
    const result = await db.select({ roomId: booking.roomId, totalHours: sql<string>`coalesce(sum(extract(epoch from (${booking.endTime}::time - ${booking.startTime}::time)) / 3600), 0)` }).from(booking).where(and(gte(booking.date, startDate), lte(booking.date, endDate), eq(booking.status, "confirmed"))).groupBy(booking.roomId);
    const days = Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000));
    const maxHoursPerDay = 10; // 08:00-18:00
    return rooms.map(r => {
      const usage = result.find(u => u.roomId === r.id);
      const totalHours = parseFloat(usage?.totalHours || "0");
      const utilization = Math.min(100, Math.round((totalHours / (days * maxHoursPerDay)) * 100));
      return { roomId: r.id, roomName: r.name, totalHours: parseFloat(totalHours.toFixed(1)), utilization };
    }).sort((a, b) => b.utilization - a.utilization);
  },
};
