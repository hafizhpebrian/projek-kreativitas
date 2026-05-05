import { db } from "../db/index.js";
import { booking, room } from "../db/schema.js";
import { eq, and, or, sql, desc, asc, gte, lte, ne } from "drizzle-orm";

export const bookingService = {
  async getMyBookings(userId: string, status?: string) {
    const conditions = [eq(booking.userId, userId)];

    if (status && status !== "all") {
      conditions.push(eq(booking.status, status));
    }

    return db.query.booking.findMany({
      where: and(...conditions),
      with: {
        room: {
          with: { images: { limit: 1 } },
        },
        user: true,
      },
      orderBy: [asc(booking.date), asc(booking.startTime)],
    });
  },

  async getById(id: string) {
    return db.query.booking.findFirst({
      where: eq(booking.id, id),
      with: {
        room: {
          with: { images: { limit: 1 } },
        },
        user: true,
      },
    });
  },

  async create(data: {
    userId: string;
    roomId: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    attendees: number;
    notes?: string;
    isPrivate?: boolean;
    paymentMethod?: string;
    onBehalfOf?: string;
  }) {
    // Validate times
    if (data.startTime >= data.endTime) {
      throw new Error("Start time must be before end time");
    }

    const bookingDateTime = new Date(`${data.date}T${data.startTime}`);
    if (bookingDateTime < new Date()) {
      throw new Error("Cannot book a time in the past");
    }

    // Check for time conflicts
    const conflicts = await this.checkConflicts(
      data.roomId,
      data.date,
      data.startTime,
      data.endTime
    );

    if (conflicts.length > 0) {
      throw new Error(
        `Time conflict: room is already booked from ${conflicts[0].startTime} to ${conflicts[0].endTime}`
      );
    }

    // Validate capacity
    const targetRoom = await db.query.room.findFirst({
      where: eq(room.id, data.roomId),
    });

    if (!targetRoom) {
      throw new Error("Room not found");
    }

    if (data.attendees > targetRoom.capacity) {
      throw new Error(
        `Attendee count (${data.attendees}) exceeds room capacity (${targetRoom.capacity})`
      );
    }

    // Calculate duration in hours
    const [startH, startM] = data.startTime.split(':').map(Number);
    const [endH, endM] = data.endTime.split(':').map(Number);
    const durationHours = (endH + endM / 60) - (startH + startM / 60);

    const hourlyRate = parseFloat(targetRoom.hourlyRate?.toString() || "0");
    const totalPrice = (durationHours * hourlyRate).toFixed(2);

    // Status logic
    const paymentMethod = data.paymentMethod === 'cod' ? 'cod' : 'online';
    const status = paymentMethod === 'cod' ? 'reserved' : 'pending';
    const expiresAt = paymentMethod === 'online' ? new Date(Date.now() + 15 * 60000) : null;

    const [newBooking] = await db
      .insert(booking)
      .values({
        userId: data.userId,
        roomId: data.roomId,
        title: data.title,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        attendees: data.attendees,
        notes: data.notes,
        isPrivate: data.isPrivate || false,
        onBehalfOf: data.onBehalfOf || null,
        paymentMethod,
        totalPrice,
        status,
        paymentExpiresAt: expiresAt,
      })
      .returning();

    return this.getById(newBooking.id);
  },

  async update(
    id: string,
    userId: string,
    data: Partial<{
      title: string;
      date: string;
      startTime: string;
      endTime: string;
      attendees: number;
      notes: string;
      isPrivate: boolean;
    }>,
    role?: string
  ) {
    // Verify ownership
    const existing = await this.getById(id);
    if (!existing) throw new Error("Booking not found");
    if (existing.userId !== userId && role !== 'admin') throw new Error("Not authorized to update this booking");
    if (existing.status !== "confirmed") throw new Error("Can only edit confirmed bookings");

    // If time changed, check conflicts
    if (data.date || data.startTime || data.endTime) {
      const checkDate = data.date || existing.date;
      const checkStart = data.startTime || existing.startTime;
      const checkEnd = data.endTime || existing.endTime;

      const conflicts = await this.checkConflicts(
        existing.roomId,
        checkDate,
        checkStart,
        checkEnd,
        id // exclude self
      );

      if (conflicts.length > 0) {
        throw new Error("Time conflict with another booking");
      }
    }

    await db
      .update(booking)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(booking.id, id));

    return this.getById(id);
  },

  async payBooking(id: string, userId: string, role?: string) {
    const b = await this.getById(id);
    if (!b) throw new Error("Booking not found");
    if (b.userId !== userId && role !== 'admin') throw new Error("Not authorized");
    if (b.status !== "pending") throw new Error("Booking is not pending");

    await db.update(booking).set({ status: "confirmed", paymentExpiresAt: null, updatedAt: new Date() }).where(eq(booking.id, id));
    return this.getById(id);
  },

  async adminCheckIn(id: string) {
    const b = await this.getById(id);
    if (!b) throw new Error("Booking not found");
    if (b.status !== "reserved") throw new Error("Booking is not reserved");

    await db.update(booking).set({ status: "confirmed", checkInTime: new Date(), updatedAt: new Date() }).where(eq(booking.id, id));
    return this.getById(id);
  },

  async userCheckout(id: string, userId: string, role?: string) {
    const b = await this.getById(id);
    if (!b) throw new Error("Booking not found");
    if (b.userId !== userId && role !== 'admin') throw new Error("Not authorized");
    if (b.status !== "confirmed" && b.status !== "waiting_checkout" && b.status !== "overdue") {
      throw new Error("Cannot checkout in this status");
    }

    await db.update(booking).set({ status: "awaiting_verification", updatedAt: new Date() }).where(eq(booking.id, id));
    return this.getById(id);
  },

  async adminApproveCheckout(id: string) {
    const b = await this.getById(id);
    if (!b) throw new Error("Booking not found");
    if (b.status !== "awaiting_verification" && b.status !== "waiting_checkout" && b.status !== "overdue" && b.status !== "confirmed") {
      throw new Error("Booking cannot be finalized from current status");
    }

    await db.update(booking).set({ status: "completed", checkOutTime: new Date(), updatedAt: new Date() }).where(eq(booking.id, id));
    return this.getById(id);
  },

  async cancel(id: string, userId: string, reason?: string, role?: string) {
    const existing = await this.getById(id);
    if (!existing) throw new Error("Booking not found");
    if (existing.userId !== userId && role !== 'admin') throw new Error("Not authorized to cancel this booking");
    if (existing.status !== "confirmed" && existing.status !== "pending" && existing.status !== "reserved") throw new Error("Cannot cancel this booking");

    await db
      .update(booking)
      .set({
        status: "cancelled",
        cancellationReason: reason,
        updatedAt: new Date(),
      })
      .where(eq(booking.id, id));

    return this.getById(id);
  },

  async checkConflicts(
    roomId: string,
    date: string,
    startTime: string,
    endTime: string,
    excludeBookingId?: string
  ) {
    const conditions = [
      eq(booking.roomId, roomId),
      eq(booking.date, date),
      eq(booking.status, "confirmed"),
      // Overlap check: existing.start < new.end AND existing.end > new.start
      sql`${booking.startTime} < ${endTime}`,
      sql`${booking.endTime} > ${startTime}`,
    ];

    if (excludeBookingId) {
      conditions.push(ne(booking.id, excludeBookingId));
    }

    return db.query.booking.findMany({
      where: and(...conditions),
    });
  },

  // Admin: get all bookings
  async getAll(filters?: { date?: string; roomId?: string; status?: string }) {
    const conditions = [];

    if (filters?.date) {
      conditions.push(eq(booking.date, filters.date));
    }
    if (filters?.roomId) {
      conditions.push(eq(booking.roomId, filters.roomId));
    }
    if (filters?.status) {
      conditions.push(eq(booking.status, filters.status));
    }

    return db.query.booking.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      with: {
        room: {
          with: { images: { limit: 1 } },
        },
        user: true,
      },
      orderBy: [desc(booking.createdAt)],
    });
  },
};
