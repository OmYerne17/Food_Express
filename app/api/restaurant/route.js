import { connectionStr } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantModel"; // Import the model
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {

      await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
    const data = await Restaurant.find();
    console.log(data);
    return NextResponse.json({ result: data });
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
  if(payload.login){
      result = await Restaurant.findOne({email:payload.email , password:payload.password});
    if(result){
      success = true;
    }
  }
  else{
  result = await new Restaurant(payload).save();
  if(result){
    success = true;
  }
  // const result = await restaurant.save();
  
}
return NextResponse.json({ result, success });

} catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
  
}
