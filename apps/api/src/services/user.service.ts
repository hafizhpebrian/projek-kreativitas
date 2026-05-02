import { db } from "../db/index.js";
import { user } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const userService = {
  async getProfile(userId: string) {
    return db.query.user.findFirst({ where: eq(user.id, userId) });
  },

  async updateProfile(userId: string, data: Partial<{ name: string; phone: string; jobTitle: string; department: string; language: string; image: string }>) {
    await db.update(user).set({ ...data, updatedAt: new Date() }).where(eq(user.id, userId));
    return this.getProfile(userId);
  },

  async updatePreferences(userId: string, data: Partial<{ notifyEmail: boolean; notifyPush: boolean; notifySms: boolean }>) {
    await db.update(user).set({ ...data, updatedAt: new Date() }).where(eq(user.id, userId));
    return this.getProfile(userId);
  },
};
