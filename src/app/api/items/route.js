import connectDB from "@/lib/db";
import Item from "@/models/Item";
import { NextResponse } from "next/server";

// GET: Fetch all items
export async function GET() {
  await connectDB();
  try {
    // Sort by createdAt descending (newest first)
    const items = await Item.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST: Create a new item
export async function POST(request) {
  await connectDB();
  try {
    // Parse the JSON body from the request
    const body = await request.json();

    // Create the item in the database
    const item = await Item.create(body);

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
