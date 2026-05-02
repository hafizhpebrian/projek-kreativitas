import "dotenv/config";
import { db } from "./index.js";
import { room, amenity, roomAmenity, roomImage, user, account } from "./schema.js";
import { sql } from "drizzle-orm";
import crypto from "crypto";

async function seed() {
  console.log("🌱 Seeding database...\n");

  // --- Amenities ---
  console.log("  Creating amenities...");
  const amenities = await db.insert(amenity).values([
    { name: "WiFi", icon: "wifi", description: "High-speed wireless internet" },
    { name: "Projector", icon: "videocam", description: "HD projector with HDMI input" },
    { name: "Whiteboard", icon: "edit_note", description: "Large wall-mounted whiteboard" },
    { name: "AC", icon: "ac_unit", description: "Climate control system" },
    { name: "Video Conference", icon: "video_call", description: "Video conferencing system with camera and mic" },
    { name: "Sound System", icon: "speaker", description: "Integrated audio speaker system" },
    { name: "TV Display", icon: "tv", description: "Large screen TV display" },
    { name: "Phone", icon: "call", description: "Conference phone line" },
    { name: "Coffee Machine", icon: "coffee", description: "In-room coffee machine" },
    { name: "Natural Light", icon: "light_mode", description: "Floor-to-ceiling windows" },
  ]).returning();
  console.log(`  ✓ Created ${amenities.length} amenities`);

  // --- Rooms ---
  console.log("  Creating rooms...");
  const rooms = await db.insert(room).values([
    { name: "The Boardroom", slug: "the-boardroom", description: "Executive-level boardroom with panoramic city views.", floor: "52nd Floor", location: "East Wing", capacity: 20, status: "active", type: "premium", rating: "4.9", hourlyRate: "1500000", rules: ["No food or drinks", "Formal attire recommended", "Book 24h in advance"] },
    { name: "Idea Studio 01", slug: "idea-studio-01", description: "Creative brainstorming space with writable walls.", floor: "12th Floor", location: "West Wing", capacity: 8, status: "active", type: "standard", rating: "4.7", hourlyRate: "500000", rules: ["Clean whiteboard after use"] },
    { name: "Glass Pod A", slug: "glass-pod-a", description: "Transparent meeting pod for quick huddles and standups.", floor: "8th Floor", location: "Central Atrium", capacity: 4, status: "active", type: "standard", rating: "4.5", hourlyRate: "350000", rules: ["Max 30 min during peak hours"] },
    { name: "The Library", slug: "the-library", description: "Quiet space with warm wood tones, ideal for focused discussions.", floor: "15th Floor", location: "North Wing", capacity: 6, status: "active", type: "private", rating: "4.8", hourlyRate: "600000", rules: ["Keep noise to minimum", "No phone calls"] },
    { name: "Zen Corner", slug: "zen-corner", description: "Minimalist room with natural light and greenery.", floor: "3rd Floor", location: "Garden Level", capacity: 4, status: "active", type: "standard", rating: "4.6", hourlyRate: "400000" },
    { name: "War Room 04", slug: "war-room-04", description: "High-security room for confidential strategy sessions.", floor: "30th Floor", location: "Secure Wing", capacity: 12, status: "active", type: "private", rating: "4.4", hourlyRate: "1000000", rules: ["No personal devices", "NDA required"] },
    { name: "Focus Pod 1", slug: "focus-pod-1", description: "Single-person focus pod for deep work sessions.", floor: "5th Floor", location: "Quiet Zone", capacity: 1, status: "active", type: "standard", rating: "4.3", hourlyRate: "200000" },
    { name: "Studio 404", slug: "studio-404", description: "Mid-size studio for team syncs and workshops.", floor: "10th Floor", location: "Central", capacity: 10, status: "active", type: "standard", rating: "4.5", hourlyRate: "600000" },
    { name: "Conference C", slug: "conference-c", description: "Large conference room with tiered seating.", floor: "20th Floor", location: "South Wing", capacity: 30, status: "active", type: "premium", rating: "4.7", hourlyRate: "1200000" },
    { name: "Skyline Lounge", slug: "skyline-lounge", description: "Casual meeting space with rooftop views.", floor: "50th Floor", location: "Rooftop", capacity: 15, status: "active", type: "premium", rating: "4.9", hourlyRate: "2000000", rules: ["No smoking", "Catering available on request"] },
  ]).returning();
  console.log(`  ✓ Created ${rooms.length} rooms`);

  // --- Room-Amenity links ---
  console.log("  Linking amenities to rooms...");
  const amenityMap = Object.fromEntries(amenities.map(a => [a.name, a.id]));
  const links = [
    { room: "The Boardroom", amenities: ["WiFi", "Projector", "AC", "Video Conference", "Sound System", "TV Display", "Phone", "Coffee Machine", "Natural Light"] },
    { room: "Idea Studio 01", amenities: ["WiFi", "Whiteboard", "AC", "TV Display"] },
    { room: "Glass Pod A", amenities: ["WiFi", "AC"] },
    { room: "The Library", amenities: ["WiFi", "AC", "Natural Light", "Whiteboard"] },
    { room: "Zen Corner", amenities: ["WiFi", "AC", "Natural Light"] },
    { room: "War Room 04", amenities: ["WiFi", "Projector", "AC", "Video Conference", "Sound System", "Whiteboard"] },
    { room: "Focus Pod 1", amenities: ["WiFi", "AC"] },
    { room: "Studio 404", amenities: ["WiFi", "Whiteboard", "AC", "Projector", "TV Display"] },
    { room: "Conference C", amenities: ["WiFi", "Projector", "AC", "Video Conference", "Sound System", "TV Display", "Phone", "Natural Light"] },
    { room: "Skyline Lounge", amenities: ["WiFi", "AC", "Sound System", "Coffee Machine", "Natural Light"] },
  ];

  const roomMap = Object.fromEntries(rooms.map(r => [r.name, r.id]));
  const linkValues = links.flatMap(l => l.amenities.map(a => ({ roomId: roomMap[l.room], amenityId: amenityMap[a] })));
  await db.insert(roomAmenity).values(linkValues);
  console.log(`  ✓ Created ${linkValues.length} room-amenity links`);

  // --- Room Images ---
  console.log("  Adding room images...");
  const imageData = [
    { room: "The Boardroom", file: "seed-boardroom.png" },
    { room: "Idea Studio 01", file: "seed-idea-studio.png" },
    { room: "Glass Pod A", file: "seed-glass-pod.png" },
    { room: "The Library", file: "seed-library.png" },
    { room: "Zen Corner", file: "seed-zen-corner.png" },
    { room: "War Room 04", file: "seed-war-room.png" },
    { room: "Focus Pod 1", file: "seed-focus-pod.png" },
    { room: "Studio 404", file: "seed-studio-404.png" },
    { room: "Conference C", file: "seed-conference-c.png" },
    { room: "Skyline Lounge", file: "seed-skyline-lounge.png" },
  ];
  const imageValues = imageData.map((img, i) => ({
    roomId: roomMap[img.room],
    filePath: `uploads/${img.file}`,
    originalName: img.file,
    order: 0,
  }));
  await db.insert(roomImage).values(imageValues);
  console.log(`  ✓ Added ${imageValues.length} room images`);

  // --- Admin user ---
  console.log("  Creating admin user...");
  const adminId = crypto.randomUUID();
  await db.insert(user).values({
    id: adminId,
    name: "Admin SI-BOOK",
    email: "admin@sibook.dev",
    emailVerified: true,
    role: "admin",
    jobTitle: "System Administrator",
    department: "Engineering",
  });
  // Create credential account with hashed password (better-auth uses bcrypt internally, for seed we store a placeholder)
  // NOTE: Use the /api/auth/sign-up/email endpoint to create real accounts with proper password hashing
  console.log(`  ✓ Admin user created (email: admin@sibook.dev)`);
  console.log(`    ⚠  Use POST /api/auth/sign-up/email to register with a password\n`);

  console.log("✅ Seed complete!\n");
  process.exit(0);
}

seed().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
