import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  Address: { type: String, required: true },
  city: { type: String, required: true },
  mobile: { type: String, required: true },
});

// Create and export the model
export const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
