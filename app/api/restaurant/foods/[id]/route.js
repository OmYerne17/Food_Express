import { connectionStr } from "@/app/lib/db";
import { foodModel } from "@/app/lib/foodModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(resquest,content){ 
    const {id} = await content.params
    console.log(id)
    let success= false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true,useUnifiedTopology: true})
    let result = await foodModel.find({resto_id:id});
    if(result){
        success = true;
    }
    return NextResponse.json({result,success})
}

export async function DELETE(request,content){
    const id =  content.params.id
    let success = false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true ,useUnifiedTopology:true});
    let response = await foodModel.deleteOne({_id:id});
    if(response.deletedCount>0){
        success = true;

    }
    return NextResponse.json({response,success});
}
