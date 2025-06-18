import { connectionStr } from "../../../lib/db";
import { Restaurant } from "../../../lib/restaurantModel"; // Import the model
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {

      await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
    let data = await Restaurant.find();
    data = data.map((item)=>(item.city.charAt(0).toUpperCase() + item.city.slice(1)))
    data = [...new Set(data.map((item)=>(item)))]

    return NextResponse.json({ result:data });
  }