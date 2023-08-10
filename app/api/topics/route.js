import connectMongoDB from "@/libs/mongoose";
import Topic from "@/models/topics";
import { NextResponse } from "next/server";

export async function POST(request){
    const {title, description} = await request.json();
    await connectMongoDB();
    await Topic.create({title,description})
    return NextResponse.json({message:"Topic Created"},{status:201});
}

export async function GET(){
    await connectMongoDB();
    const response = await Topic.find();
    return NextResponse.json(response);
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findIdAndDelete(id);
    return NextResponse.json({message:"Topic Deleted"},{status:200});
}