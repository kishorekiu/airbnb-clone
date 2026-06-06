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

    for (let i = 0; i < 500; i++) {
      // Randomly assign this listing to one of our newly created users
      const randomUser =
        insertedUsers[Math.floor(Math.random() * insertedUsers.length)];

      listings.push({
        title: faker.lorem.words({ min: 3, max: 6 }),
        description: faker.lorem.paragraph(),
        // Using unspalsh source for realistic house images
        imageSrc: `https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80`,
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
