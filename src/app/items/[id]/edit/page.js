"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function EditPage({ params }) {
  // In Next.js 15, params is a Promise, so we unwrap it with use()
  const { id } = use(params);

  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Electronics",
    type: "LOST",
    location: "",
    contact_info: "",
    imageUrl: "", // Store existing image URL
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch the existing item data
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/items`);
        const data = await res.json();
        // Find the specific item (Simple client-side find for minor project)
        const item = data.data.find((i) => i._id === id);

        if (item) {
          setFormData({
            title: item.title,
            description: item.description,
            category: item.category,
            type: item.type,
            location: item.location,
            contact_info: item.contact_info,
            imageUrl: item.imageUrl || "",
          });
        }
      } catch (error) {
        console.error("Failed to load item");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Send PUT request to update
      const res = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update");

      router.push("/profile"); // Go back to profile
    } catch (error) {
      alert("Error updating item");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full p-2 border border-gray-300 rounded mt-1 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none";

  if (loading)
    return <div className="p-10 text-center">Loading item details...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Edit Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Show Existing Image (Read Only) */}
          {formData.imageUrl && (
            <div className="mb-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Current Image:</p>
              <div className="relative h-32 w-full rounded-lg overflow-hidden border">
                <Image
                  src={formData.imageUrl}
                  alt="Current"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Item Name
            </label>
            <input
              name="title"
              value={formData.title}
              required
              className={inputClass}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
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
              value={formData.description}
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
              value={formData.location}
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
              value={formData.contact_info}
              required
              className={inputClass}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-200 text-gray-700 p-3 rounded font-bold hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
