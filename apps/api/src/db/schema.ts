import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  uuid,
  decimal,
  date,
  time,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================================
// better-auth required tables
// ============================================================

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),

  // Custom fields
  role: text("role").notNull().default("user"), // "admin" | "user"
  phone: text("phone"),
  jobTitle: text("job_title"),
  department: text("department"),
  language: text("language").notNull().default("en"),

  // Notification preferences
  notifyEmail: boolean("notify_email").notNull().default(true),
  notifyPush: boolean("notify_push").notNull().default(false),
  notifySms: boolean("notify_sms").notNull().default(false),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(), // "credential" | "google"
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// ============================================================
// Application tables
// ============================================================

export const room = pgTable("room", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  floor: text("floor").notNull(),
  location: text("location"), // e.g. "East Wing, Suite 502"
  capacity: integer("capacity").notNull().default(1),
  status: text("status").notNull().default("available"), // "available" | "occupied" | "maintenance"
  type: text("type").notNull().default("standard"), // "premium" | "standard" | "private" | "public"
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  rules: jsonb("rules").$type<string[]>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const roomImage = pgTable("room_image", {
  id: uuid("id").primaryKey().defaultRandom(),
  roomId: uuid("room_id")
    .notNull()
    .references(() => room.id, { onDelete: "cascade" }),
  filePath: text("file_path").notNull(),
  originalName: text("original_name").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const amenity = pgTable("amenity", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  icon: text("icon").notNull(), // Material Symbols icon name
  description: text("description"),
});

export const roomAmenity = pgTable(
  "room_amenity",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    roomId: uuid("room_id")
      .notNull()
      .references(() => room.id, { onDelete: "cascade" }),
    amenityId: uuid("amenity_id")
      .notNull()
      .references(() => amenity.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("room_amenity_unique").on(table.roomId, table.amenityId),
  ]
);

export const booking = pgTable("booking", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  roomId: uuid("room_id")
    .notNull()
    .references(() => room.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  date: date("date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  attendees: integer("attendees").notNull().default(1),
  notes: text("notes"),
  status: text("status").notNull().default("confirmed"), // "pending" | "reserved" | "confirmed" | "awaiting_verification" | "waiting_checkout" | "overdue" | "completed" | "cancelled"
  paymentMethod: text("payment_method").notNull().default("online"), // "online" | "cod"
  paymentExpiresAt: timestamp("payment_expires_at"),
  checkInTime: timestamp("check_in_time"),
  checkOutTime: timestamp("check_out_time"),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }),
  penaltyAmount: decimal("penalty_amount", { precision: 10, scale: 2 }).default("0.00"),
  isPrivate: boolean("is_private").notNull().default(false),
  onBehalfOf: text("on_behalf_of"),
  cancellationReason: text("cancellation_reason"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ============================================================
// Relations
// ============================================================

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  bookings: many(booking),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const roomRelations = relations(room, ({ many }) => ({
  bookings: many(booking),
  images: many(roomImage),
  roomAmenities: many(roomAmenity),
}));

export const roomImageRelations = relations(roomImage, ({ one }) => ({
  room: one(room, { fields: [roomImage.roomId], references: [room.id] }),
}));

export const amenityRelations = relations(amenity, ({ many }) => ({
  roomAmenities: many(roomAmenity),
}));

export const roomAmenityRelations = relations(roomAmenity, ({ one }) => ({
  room: one(room, { fields: [roomAmenity.roomId], references: [room.id] }),
  amenity: one(amenity, {
    fields: [roomAmenity.amenityId],
    references: [amenity.id],
  }),
}));

export const bookingRelations = relations(booking, ({ one }) => ({
  user: one(user, { fields: [booking.userId], references: [user.id] }),
  room: one(room, { fields: [booking.roomId], references: [room.id] }),
}));
