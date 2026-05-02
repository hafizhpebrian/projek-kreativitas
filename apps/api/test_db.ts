import "dotenv/config";
import { db } from "./src/db/index.js";

async function main() {
  const amenities = await db.query.amenity.findMany();
  console.log(JSON.stringify(amenities, null, 2));
  process.exit(0);
}

main();
