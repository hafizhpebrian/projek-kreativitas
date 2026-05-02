import { db } from "../db/index.js";
import { booking, room, user } from "../db/schema.js";
import { eq, and, sql, desc, count } from "drizzle-orm";

export const adminService = {
  async getStats() {
    const today = new Date().toISOString().split("T")[0];
    const [totalBookingsToday] = await db.select({ count: sql<number>`count(*)` }).from(booking).where(and(eq(booking.date, today), eq(booking.status, "confirmed")));
    const [totalRooms] = await db.select({ count: sql<number>`count(*)` }).from(room);
    const [activeRooms] = await db.select({ count: sql<number>`count(*)` }).from(room).where(eq(room.status, "available"));
    const [issues] = await db.select({ count: sql<number>`count(*)` }).from(room).where(eq(room.status, "maintenance"));
    const totalRoomCount = Number(totalRooms.count);
    const bookedRooms = await db.selectDistinct({ roomId: booking.roomId }).from(booking).where(and(eq(booking.date, today), eq(booking.status, "confirmed")));
    const occupancyRate = totalRoomCount > 0 ? Math.round((bookedRooms.length / totalRoomCount) * 100) : 0;
    return { totalBookingsToday: Number(totalBookingsToday.count), occupancyRate, activeRooms: Number(activeRooms.count), totalRooms: totalRoomCount, issues: Number(issues.count) };
  },

  async getActivity(limit = 20) {
    const recentBookings = await db.query.booking.findMany({ with: { user: true, room: true }, orderBy: [desc(booking.updatedAt)], limit });
    const recentUsers = await db.query.user.findMany({ orderBy: [desc(user.createdAt)], limit: 5 });
    const activities: Array<{ type: string; message: string; detail: string; status: string; timestamp: Date }> = [];
    for (const b of recentBookings) {
      if (b.status === "cancelled") {
        activities.push({ type: "cancellation", message: `${b.user?.name || "User"} cancelled "${b.title}"`, detail: `Room: ${b.room?.name}`, status: "processed", timestamp: b.updatedAt });
      } else {
        activities.push({ type: "booking", message: `${b.user?.name || "User"} booked ${b.room?.name}`, detail: `${b.date}, ${b.startTime}`, status: b.status, timestamp: b.createdAt });
      }
    }
    for (const u of recentUsers) {
      activities.push({ type: "user_registered", message: `New user: ${u.name}`, detail: `Role: ${u.role}`, status: "verified", timestamp: u.createdAt });
    }
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return activities.slice(0, limit);
  },

  async getUsers() { return db.query.user.findMany({ orderBy: [desc(user.createdAt)] }); },

  async updateUserRole(userId: string, role: string) {
    await db.update(user).set({ role, updatedAt: new Date() }).where(eq(user.id, userId));
    return db.query.user.findFirst({ where: eq(user.id, userId) });
  },
};
