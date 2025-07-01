import { connectionStr } from "../../lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { UserModel } from "../../lib/UserModel";

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

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: payload.email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
    }

    // Create new user
    const newUser = new UserModel(payload);
    await newUser.save();

    // Return the created user (omit password in response for security)
    const { password, ...userWithoutPassword } = newUser.toObject();
    return NextResponse.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}