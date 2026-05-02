import { db } from "../db/index.js";
import { room, roomImage, roomAmenity, amenity, booking } from "../db/schema.js";
import { eq, ilike, and, or, sql, desc, asc, inArray } from "drizzle-orm";

export interface RoomFilters {
  search?: string;
  floor?: string;
  capacity?: string;
  status?: string;
  amenities?: string; // comma-separated amenity IDs
  type?: string;
  sortBy?: string;
  page?: string;
  limit?: string;
}

export const roomService = {
  async list(filters: RoomFilters) {
    const page = parseInt(filters.page || "1", 10);
    const limit = parseInt(filters.limit || "12", 10);
    const offset = (page - 1) * limit;

    const conditions = [];

    if (filters.search) {
      conditions.push(
        or(
          ilike(room.name, `%${filters.search}%`),
          ilike(room.floor, `%${filters.search}%`),
          ilike(room.location || "", `%${filters.search}%`)
        )
      );
    }

    if (filters.floor && filters.floor !== "all") {
      conditions.push(ilike(room.floor, `%${filters.floor}%`));
    }

    if (filters.capacity) {
      const [min, max] = filters.capacity.split("-").map(Number);
      if (max) {
        conditions.push(
          and(
            sql`${room.capacity} >= ${min}`,
            sql`${room.capacity} <= ${max}`
          )
        );
      } else if (min) {
        conditions.push(sql`${room.capacity} >= ${min}`);
      }
    }

    if (filters.status && filters.status !== "all") {
      conditions.push(eq(room.status, filters.status));
    }

    if (filters.type && filters.type !== "all") {
      conditions.push(eq(room.type, filters.type));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [rooms, countResult] = await Promise.all([
      db.query.room.findMany({
        where,
        with: {
          images: { orderBy: [asc(roomImage.order)] },
          roomAmenities: {
            with: { amenity: true },
          },
        },
        orderBy: [desc(room.createdAt)],
        limit,
        offset,
      }),
      db.select({ count: sql<number>`count(*)` }).from(room).where(where),
    ]);

    return {
      data: rooms,
      pagination: {
        page,
        limit,
        total: Number(countResult[0].count),
        totalPages: Math.ceil(Number(countResult[0].count) / limit),
      },
    };
  },

  async getById(id: string) {
    return db.query.room.findFirst({
      where: eq(room.id, id),
      with: {
        images: { orderBy: [asc(roomImage.order)] },
        roomAmenities: {
          with: { amenity: true },
        },
      },
    });
  },

  async getBySlug(slug: string) {
    return db.query.room.findFirst({
      where: eq(room.slug, slug),
      with: {
        images: { orderBy: [asc(roomImage.order)] },
        roomAmenities: {
          with: { amenity: true },
        },
      },
    });
  },

  async getSchedule(roomId: string, date: string) {
    return db.query.booking.findMany({
      where: and(
        eq(booking.roomId, roomId),
        eq(booking.date, date),
        eq(booking.status, "confirmed")
      ),
      with: { user: true },
      orderBy: [asc(booking.startTime)],
    });
  },

  async getAvailability(roomId: string, date: string) {
    const bookings = await this.getSchedule(roomId, date);
    return {
      roomId,
      date,
      bookings: bookings.map((b) => ({
        id: b.id,
        title: b.isPrivate ? "Private Meeting" : b.title,
        startTime: b.startTime,
        endTime: b.endTime,
        organizer: b.user?.name || "Unknown",
      })),
    };
  },

  async create(data: {
    name: string;
    slug: string;
    description?: string;
    floor: string;
    location?: string;
    capacity: number;
    status?: string;
    type?: string;
    hourlyRate?: string;
    rules?: string[];
    amenityIds?: string[];
  }) {
    const [newRoom] = await db.insert(room).values({
      name: data.name,
      slug: data.slug,
      description: data.description,
      floor: data.floor,
      location: data.location,
      capacity: data.capacity,
      status: data.status || "available",
      type: data.type || "standard",
      hourlyRate: data.hourlyRate,
      rules: data.rules,
    }).returning();

    // Link amenities
    if (data.amenityIds && data.amenityIds.length > 0) {
      await db.insert(roomAmenity).values(
        data.amenityIds.map((amenityId) => ({
          roomId: newRoom.id,
          amenityId,
        }))
      );
    }

    return this.getById(newRoom.id);
  },

  async update(
    id: string,
    data: Partial<{
      name: string;
      slug: string;
      description: string;
      floor: string;
      location: string;
      capacity: number;
      status: string;
      type: string;
      hourlyRate: string;
      rules: string[];
      amenityIds: string[];
    }>
  ) {
    const { amenityIds, ...roomData } = data;

    await db
      .update(room)
      .set({ ...roomData, updatedAt: new Date() })
      .where(eq(room.id, id));

    // Re-link amenities if provided
    if (amenityIds) {
      await db.delete(roomAmenity).where(eq(roomAmenity.roomId, id));
      if (amenityIds.length > 0) {
        await db.insert(roomAmenity).values(
          amenityIds.map((amenityId) => ({
            roomId: id,
            amenityId,
          }))
        );
      }
    }

    return this.getById(id);
  },

  async remove(id: string) {
    return db.delete(room).where(eq(room.id, id));
  },

  // Image management
  async addImage(roomId: string, filePath: string, originalName: string, order: number = 0) {
    const [image] = await db.insert(roomImage).values({
      roomId,
      filePath,
      originalName,
      order,
    }).returning();
    return image;
  },

  async removeImage(imageId: string) {
    const [deleted] = await db.delete(roomImage).where(eq(roomImage.id, imageId)).returning();
    return deleted;
  },

  async getAmenities() {
    return db.query.amenity.findMany({
      orderBy: [asc(amenity.name)],
    });
  },

  async getPopular(limit = 4) {
    return db.query.room.findMany({
      with: {
        images: { orderBy: [asc(roomImage.order)], limit: 1 },
        roomAmenities: { with: { amenity: true } },
      },
      orderBy: [desc(room.rating)],
      limit,
    });
  },
};
