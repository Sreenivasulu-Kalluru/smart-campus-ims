"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns"; // Smart dates

export default function ItemCard({ item }) {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col">
      {/* Status Badge */}
      <div
        className={`p-1 text-center text-xs font-bold text-white tracking-wider uppercase ${
          item.type === "LOST" ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {item.type}
      </div>

      {/* Image Section */}
      <div className="relative h-48 w-full bg-gray-200">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span className="text-4xl">📷</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
            {item.category}
          </span>
          {/* NEW: Smart Time (e.g., "2 hours ago") */}
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {item.title}
        </h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {item.description}
        </p>

        <div className="border-t border-gray-100 pt-4 mt-auto space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">📍</span>
            {item.location}
          </div>

          {/* NEW: Privacy Shield for Contact Info */}
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">📞</span>
              {showContact ? (
                <span className="font-bold text-gray-800">
                  {item.contact_info}
                </span>
              ) : (
                <span className="text-gray-400 blur-[2px] select-none">
                  0000000000
                </span>
              )}
            </div>

            <button
              onClick={() => setShowContact(!showContact)}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              {showContact ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
