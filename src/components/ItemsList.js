"use client";

import { useState } from "react";
import ItemCard from "./ItemCard"; // Import the new component

export default function ItemsList({ initialItems }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  const filteredItems = initialItems.filter((item) => {
    // Only show Active items in the main feed (Optional: remove this if you want to show resolved too)
    if (item.status === "Resolved") return false;

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === "ALL" || item.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div>
      {/* Search Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <input
          type="text"
          placeholder="Search items (e.g. 'Blue Wallet', 'Library')..."
          className="flex-1 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2">
          {["ALL", "LOST", "FOUND"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition uppercase text-sm ${
                filterType === type
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              No items found matching your search.
            </p>
          </div>
        )}

        {/* Use the new Component! */}
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
