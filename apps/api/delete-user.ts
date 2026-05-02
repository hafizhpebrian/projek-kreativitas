import "dotenv/config";
import { db } from "./src/db/index.js";
import { user, account } from "./src/db/schema.js";
import { eq } from "drizzle-orm";

async function main() {
  await db.delete(account).where(eq(account.accountId, "manager@perusahaan.com"));
  await db.delete(user).where(eq(user.email, "manager@perusahaan.com"));
  console.log("Deleted");
  process.exit(0);
}
main();
