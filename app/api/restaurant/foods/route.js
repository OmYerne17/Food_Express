import { connectionStr } from "@/app/lib/db";
import { foodModel } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function GET() {

    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
  const data = await foodModel.find();
  console.log(data);
  return NextResponse.json({ result: data });
}
export async function POST(request){
    const payload = await request.json();
    let success = false;
    mongoose.connect(connectionStr,{useNewUrlParser:true ,useUnifiedTopology:true});
    const response = await new foodModel(payload).save()
    return NextResponse.json({response,success:true});
}
