"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ReportPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Electronics",
    type: "LOST",
    location: "",
    contact_info: "",
  });

  const [file, setFile] = useState(null); // State for the image file
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert("Please login to report an item");
      return;
    }

    setStatus({ loading: true, error: "", success: false });

    try {
      let imageUrl = "";

      // 1. Upload Image to Cloudinary (if a file is selected)
      if (file) {
        const imageFormData = new FormData();
        imageFormData.append("file", file);
        imageFormData.append("upload_preset", "abneoerx"); // <--- PASTE YOUR PRESET NAME HERE
        imageFormData.append("cloud_name", "dtng4j6fz"); // <--- PASTE YOUR CLOUD NAME HERE

        const imageRes = await fetch(
          `https://api.cloudinary.com/v1_1/dtng4j6fz/image/upload`,
          {
            method: "POST",
            body: imageFormData,
          }
        );

        const imageData = await imageRes.json();
        imageUrl = imageData.secure_url;
      }

      // 2. Send Data to MongoDB
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          imageUrl, // Add the URL to the data
          userEmail: session.user.email,
        }),
      });

      if (!res.ok) throw new Error("Failed to save item");

      setStatus({ loading: false, error: "", success: true });
      setTimeout(() => router.push("/items"), 2000);
    } catch (error) {
      console.error(error);
      setStatus({
        loading: false,
        error: "Something went wrong. Try again.",
        success: false,
      });
    }
  };

  // Input style class
  const inputClass =
    "w-full p-2 border border-gray-300 rounded mt-1 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Report an Item
        </h1>

        {status.success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
            Success! Redirecting...
          </div>
        )}
        {status.error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {status.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... (Keep Radio Buttons for LOST/FOUND same as before) ... */}
          <div className="flex gap-4 mb-4">
            <label className="flex-1 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value="LOST"
                checked={formData.type === "LOST"}
                onChange={handleChange}
                className="hidden peer"
              />
              <div className="p-3 text-center border rounded-md peer-checked:bg-red-500 peer-checked:text-white transition-colors text-gray-700 font-medium">
                I Lost Something
              </div>
            </label>
            <label className="flex-1 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value="FOUND"
                checked={formData.type === "FOUND"}
                onChange={handleChange}
                className="hidden peer"
              />
              <div className="p-3 text-center border rounded-md peer-checked:bg-green-500 peer-checked:text-white transition-colors text-gray-700 font-medium">
                I Found Something
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Item Name
            </label>
            <input
              name="title"
              required
              className={inputClass}
              onChange={handleChange}
            />
          </div>

          {/* NEW: Image Upload Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleFileChange}
            />
          </div>

          {/* ... (Keep Description, Category, Location, Contact Info inputs same as before) ... */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              className={inputClass}
              onChange={handleChange}
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="ID/Docs">ID Cards / Docs</option>
              <option value="Books">Books</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              required
              className={inputClass}
              rows="3"
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Location
            </label>
            <input
              name="location"
              required
              className={inputClass}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Contact Info
            </label>
            <input
              name="contact_info"
              required
              className={inputClass}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 transition disabled:bg-gray-400 mt-4"
          >
            {status.loading ? "Uploading..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
}
