import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { UserModel } from "@/app/lib/UserModel";

export async function GET() {
  try {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connecting to database with connection string:", connectionStr);

    const data = await UserModel.find();
    console.log(data);

    // Check if data is empty
    if (data.length === 0) {
      console.warn("No users found in the database.");
    }

    return NextResponse.json({ result: data });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Verify user credentials
    const existingUser = await UserModel.findOne({ email: payload.email, password: payload.password });
    if (!existingUser) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 400 });
    }

    // If user exists, return success
    return NextResponse.json({ success: true, result: existingUser });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}