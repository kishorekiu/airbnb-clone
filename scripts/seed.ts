import dotenv from "dotenv";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

// Load the local environment variables
dotenv.config({ path: ".env.local" });

// Use relative paths to avoid Next.js alias resolution issues in the terminal
import User from "../models/User";
import Listing from "../models/Listing";
import Reservation from "../models/Reservation";

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in .env.local");
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected!");

    // 1. Wipe the existing database to prevent duplicates on multiple runs
    console.log("Wiping existing data...");
    await User.deleteMany({});
    await Listing.deleteMany({});
    await Reservation.deleteMany({});

    // 2. Generate 50 Users
    console.log("Generating Users...");
    const users = [];
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    for (let i = 0; i < 50; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
        hashedPassword,
        createdAt: faker.date.past(),
      });
    }
    const insertedUsers = await User.insertMany(users);
    console.log(`Successfully created ${insertedUsers.length} users.`);

    // 3. Generate 500 Listings
    console.log("Generating Listings...");
    const listings = [];
    const categories = [
      "Beach",
      "Windmills",
      "Modern",
      "Countryside",
      "Pools",
      "Islands",
      "Lake",
      "Skiing",
      "Castles",
      "Caves",
    ];

    // Curated high-quality architectural Unsplash IDs
    const masterImages = [
      // Modern & Luxury Homes
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      // Cabins & Nature
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510006851064-e6056cd0e3a8?auto=format&fit=crop&w=800&q=80",
      // Beach & Coastal
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      // Interiors & Bedrooms
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80",
      // Pools & Patios
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      // Unique/A-Frames/Domes
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=80",
      // Urban & Apartments
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80",
      // Kitchens & Living Spaces
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    ];

    for (let i = 0; i < 500; i++) {
      const randomUser =
        insertedUsers[Math.floor(Math.random() * insertedUsers.length)];

      // Grab 3 to 5 random images from the master array
      const shuffledImages = [...masterImages].sort(() => 0.5 - Math.random());
      const selectedImages = shuffledImages.slice(
        0,
        faker.number.int({ min: 3, max: 5 }),
      );

      listings.push({
        title: faker.lorem.words({ min: 3, max: 6 }),
        description: faker.lorem.paragraph(),
        imageSrc: selectedImages,
        createdAt: faker.date.past(),
        category: categories[Math.floor(Math.random() * categories.length)],
        roomCount: faker.number.int({ min: 1, max: 5 }),
        bathroomCount: faker.number.int({ min: 1, max: 4 }),
        guestCount: faker.number.int({ min: 1, max: 10 }),
        locationValue: faker.location.country(),
        userId: randomUser._id,
        price: faker.number.int({ min: 50, max: 1500 }),
      });
    }
    const insertedListings = await Listing.insertMany(listings);
    console.log(`Successfully created ${insertedListings.length} listings.`);

    console.log("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

main();
