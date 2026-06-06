"use server";

import dbConnect from "@/lib/dbConnect";
import Listing from "@/models/Listing";

export async function getListings(page = 1, limit = 12) {
  try {
    await dbConnect();

    const skip = (page - 1) * limit;

    // .lean() strips the heavy Mongoose methods, leaving pure JSON
    const listings = await Listing.find({})
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit)
      .lean();

    // Deep serialize the ObjectIds to standard strings
    return JSON.parse(JSON.stringify(listings));
  } catch (error: any) {
    console.error("Failed to fetch listings:", error);
    return [];
  }
}
