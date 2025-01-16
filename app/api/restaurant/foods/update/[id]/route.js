import { connectionStr } from "@/app/lib/db";
import { foodModel } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updatedFood) {
      return NextResponse.json(
        { success: false, message: "Food item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, result: updatedFood },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating food item:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}   
