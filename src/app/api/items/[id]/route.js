import connectDB from "@/lib/db";
import Item from "@/models/Item";
import { NextResponse } from "next/server";

// UPDATE an item (for Status change or Editing details)
export async function PUT(request, { params }) {
  const { id } = await params; // Next.js 15 requires awaiting params
  const body = await request.json();
  await connectDB();

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, body, {
      new: true, // Return the updated document
      runValidators: true,
    });

    if (!updatedItem) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE an item
export async function DELETE(request, { params }) {
  const { id } = await params;
  await connectDB();

  try {
    await Item.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Item deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
