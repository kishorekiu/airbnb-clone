import mongoose, { Schema, models } from "mongoose";

const ListingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageSrc: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  category: { type: String, required: true },
  roomCount: { type: Number, required: true },
  bathroomCount: { type: Number, required: true },
  guestCount: { type: Number, required: true }, // The "Who" modal will query this!
  locationValue: { type: String, required: true }, // The "Where" modal will query this!
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  price: { type: Number, required: true },
});

export default models.Listing || mongoose.model("Listing", ListingSchema);
