import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the item."],
      maxlength: [60, "Title cannot be more than 60 characters"],
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing", "ID/Docs", "Books", "Others"],
    },
    type: {
      type: String,
      required: true,
      enum: ["LOST", "FOUND"], // Crucial for distinguishing posts
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Resolved"],
    },
    contact_info: {
      type: String, // For now, just a phone number or email string
      required: true,
    },
    userEmail: { type: String, required: true },
    // We will add image URL later once we set up cloud storage
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

// Check if the model already exists to prevent recompilation errors in Next.js
export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
