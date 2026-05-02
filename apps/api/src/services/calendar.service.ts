import { db } from "../db/index.js";
import { room, booking, roomImage } from "../db/schema.js";
import { and, eq, gte, lte, asc } from "drizzle-orm";

export const calendarService = {
  async getResourceTimeline(date: string) {
    // Get all rooms with their bookings for the given date
    const rooms = await db.query.room.findMany({
      with: {
        images: { limit: 1, orderBy: [asc(roomImage.order)] },
        bookings: {
          where: and(
            eq(booking.date, date),
            eq(booking.status, "confirmed")
          ),
          with: { user: true },
          orderBy: [asc(booking.startTime)],
        },
      },
      orderBy: [asc(room.name)],
    });

    const resources = rooms.map((r) => ({
      id: r.id,
      title: r.name,
      floor: r.floor,
      capacity: r.capacity,
      image: r.images[0]?.filePath || null,
    }));

    const events = rooms.flatMap((r) =>
      r.bookings.map((b) => ({
        id: b.id,
        resourceId: r.id,
        title: b.isPrivate ? "Private Meeting" : b.title,
        start: `${b.date}T${b.startTime}`,
        end: `${b.date}T${b.endTime}`,
        extendedProps: {
          organizer: b.user?.name || "Unknown",
          organizerId: b.userId,
          attendees: b.attendees,
        },
      }))
    );

    return { resources, events };
  },

  async getWeekTimeline(startDate: string, endDate: string) {
    const rooms = await db.query.room.findMany({
      with: {
        bookings: {
          where: and(
            gte(booking.date, startDate),
            lte(booking.date, endDate),
            eq(booking.status, "confirmed")
          ),
          with: { user: true },
          orderBy: [asc(booking.date), asc(booking.startTime)],
        },
      },
      orderBy: [asc(room.name)],
    });

    const resources = rooms.map((r) => ({
      id: r.id,
      title: r.name,
      floor: r.floor,
      capacity: r.capacity,
    }));

    const events = rooms.flatMap((r) =>
      r.bookings.map((b) => ({
        id: b.id,
        resourceId: r.id,
        title: b.isPrivate ? "Private Meeting" : b.title,
        start: `${b.date}T${b.startTime}`,
        end: `${b.date}T${b.endTime}`,
        extendedProps: {
          organizer: b.user?.name || "Unknown",
          organizerId: b.userId,
        },
      }))
    );

    return { resources, events };
  },
};
