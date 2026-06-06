import mongoose, { models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  hashedPassword: { type: String },
  createdAt: { type: Date, default: Date.now() },
  favouriteIds: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
});

export default models.User || mongoose.model("User", UserSchema);
