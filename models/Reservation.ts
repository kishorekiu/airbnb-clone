import mongoose, { Schema, models } from "mongoose";

const ReservationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // The guest
  listingId: { type: Schema.Types.ObjectId, ref: "Listing", required: true }, // The property
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);
