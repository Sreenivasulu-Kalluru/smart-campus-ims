"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [myItems, setMyItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
    if (session?.user?.email) fetchMyItems();
  }, [status, session]);

  const fetchMyItems = async () => {
    try {
      const res = await fetch("/api/items");
      const data = await res.json();
      // Filter for current user
      const userItems = data.data.filter(
        (item) => item.userEmail === session.user.email
      );
      setMyItems(userItems);
    } catch (error) {
      console.error("Failed to fetch items");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure? This cannot be undone.")) return;
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    setMyItems(myItems.filter((item) => item._id !== id));
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Resolved" : "Active";

    // Optimistic UI update (update screen immediately before waiting for server)
    setMyItems(
      myItems.map((item) =>
        item._id === id ? { ...item, status: newStatus } : item
      )
    );

    await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  if (status === "loading" || isLoading)
    return <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        {/* The Spinner */}
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        
        {/* Optional Loading Text */}
        <p className="text-gray-500 font-medium animate-pulse">
          Loading profile...
        </p>
      </div>
    </div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white p-8 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row justify-between items-center border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Hello, {session?.user?.name} 👋
            </h1>
            <p className="text-gray-500 mt-1">{session?.user?.email}</p>
          </div>
          <div className="mt-4 md:mt-0 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm uppercase tracking-wide">
            {session?.user?.role} Account
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <span className="block text-4xl font-bold text-blue-600 mb-1">
              {myItems.length}
            </span>
            <span className="text-gray-500 text-sm">Total Reports</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <span className="block text-4xl font-bold text-green-600 mb-1">
              {myItems.filter((i) => i.status === "Resolved").length}
            </span>
            <span className="text-gray-500 text-sm">Resolved Items</span>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <span>My Activity History</span>
        </h2>

        <div className="space-y-4">
          {myItems.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">
                You haven't reported any items yet.
              </p>
              <button
                onClick={() => router.push("/report")}
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Report your first item
              </button>
            </div>
          )}

          {myItems.map((item) => (
            <div
              key={item._id}
              className={`bg-white p-5 rounded-lg shadow-sm border transition-all flex flex-col md:flex-row gap-6 items-start md:items-center
                ${
                  item.status === "Resolved"
                    ? "border-l-4 border-l-green-500 opacity-75 grayscale-[50]"
                    : "border-l-4 border-l-blue-500"
                }
              `}
            >
              {/* Image Thumbnail */}
              <div className="h-20 w-20 relative bg-gray-100 rounded-lg overflow-hidden shrink-0">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-lg">
                    📷
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className={`font-bold text-lg ${
                      item.status === "Resolved"
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                      item.type === "LOST"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.type}
                  </span>
                  {item.status === "Resolved" && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded font-bold uppercase">
                      Resolved
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Posted on {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                {/* Toggle Status Button */}
                <button
                  onClick={() => handleStatusToggle(item._id, item.status)}
                  className={`flex-1 px-4 py-2 rounded text-sm font-medium transition whitespace-nowrap
                    ${
                      item.status === "Active"
                        ? "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
                        : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-200"
                    }
                  `}
                >
                  {item.status === "Active" ? "Mark Resolved" : "Mark Active"}
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => router.push(`/items/${item._id}/edit`)}
                  className="px-4 py-2 rounded text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-4 py-2 rounded text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
