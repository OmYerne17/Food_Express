import { NextResponse } from "next/server";
import { connectionStr } from "../../lib/db";
import { Restaurant } from "../../lib/restaurantModel";
import mongoose from "mongoose";

export async function GET() {
  try {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    const data = await Restaurant.find();
    return NextResponse.json({ success: true, result: data });
  } catch (error) {
    console.error("Error in GET /api/restaurant:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    let result;
    let success = false;

    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    if (payload.login) {
      result = await Restaurant.findOne({
        email: payload.email,
        password: payload.password
      });
      success = !!result;
    } else {
      result = await new Restaurant(payload).save();
      success = !!result;
    }

    return NextResponse.json({ success, result });
  } catch (error) {
    console.error("Error in POST /api/restaurant:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
