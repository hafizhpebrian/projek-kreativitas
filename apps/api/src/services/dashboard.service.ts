import { db } from "../db/index.js";
import { room, booking } from "../db/schema.js";
import { eq, and, sql, gte, desc, asc } from "drizzle-orm";

export const dashboardService = {
  async getStats() {
    const today = new Date().toISOString().split("T")[0];

    const [totalRooms] = await db
      .select({ count: sql<number>`count(*)` })
      .from(room);

    const [availableNow] = await db
      .select({ count: sql<number>`count(*)` })
      .from(room)
      .where(eq(room.status, "available"));

    const [todayBookings] = await db
      .select({ count: sql<number>`count(*)` })
      .from(booking)
      .where(and(eq(booking.date, today), eq(booking.status, "confirmed")));

    return {
      totalRooms: Number(totalRooms.count),
      availableNow: Number(availableNow.count),
      todayBookings: Number(todayBookings.count),
    };
  },

  async getUpcoming(userId: string, limit = 5) {
    const today = new Date().toISOString().split("T")[0];

    return db.query.booking.findMany({
      where: and(
        eq(booking.userId, userId),
        eq(booking.status, "confirmed"),
        gte(booking.date, today)
      ),
      with: {
        room: {
          with: { images: { limit: 1 } },
        },
      },
      orderBy: [asc(booking.date), asc(booking.startTime)],
      limit,
    });
  },
};
