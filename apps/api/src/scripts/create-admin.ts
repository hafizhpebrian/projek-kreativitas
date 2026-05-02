import "dotenv/config";
import { db } from "../db/index.js";
import { user, account } from "../db/schema.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { eq } from "drizzle-orm";

async function createAdmin() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error("Usage: npm run create-admin <email> <password> [name]");
    process.exit(1);
  }

  const email = args[0];
  const password = args[1];
  const name = args[2] || "Admin User";

  try {
    // Check if user already exists
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email)
    });

    if (existingUser) {
      console.error(`❌ User with email ${email} already exists!`);
      // Upgrade to admin if it exists
      await db.update(user).set({ role: "admin" }).where(eq(user.email, email));
      console.log(`✅ User ${email} role has been upgraded to admin.`);
      process.exit(0);
    }

    const { auth } = await import("../auth/index.js");

    console.log(`Creating admin account for ${email}...`);

    // Use better-auth native API to ensure correct password hashing and linking
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      }
    });

    if (!result?.user) {
      throw new Error("Failed to create user via better-auth");
    }

    // Upgrade the newly created user to admin
    await db.update(user).set({ role: "admin" }).where(eq(user.id, result.user.id));

    console.log(`✅ Admin account created successfully!`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔐 Password: [hidden]`);
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create admin:", err);
    process.exit(1);
  }
}

createAdmin();
