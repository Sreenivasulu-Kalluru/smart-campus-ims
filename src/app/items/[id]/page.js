import connectDB from "@/lib/db";
import Item from "@/models/Item";
import Image from "next/image";
import Link from "next/link";

// 1. DYNAMIC METADATA GENERATION
export async function generateMetadata({ params }) {
  const { id } = await params;
  await connectDB();
  const item = await Item.findById(id);

  if (!item) {
    return { title: "Item Not Found" };
  }

  return {
    title: `${item.type}: ${item.title}`, // e.g., "LOST: Blue Wallet"
    description: item.description,
    openGraph: {
      images: [item.imageUrl || "/default-image.jpg"], // The WhatsApp preview will show the ACTUAL lost item photo!
    },
  };
}

// 2. THE PAGE UI
export default async function ItemDetailsPage({ params }) {
  const { id } = await params;
  await connectDB();
  const item = await Item.findById(id);

  if (!item) return <div className="p-10 text-center">Item not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl w-full">
        <div className="relative h-64 w-full bg-gray-200">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-4xl">
              📷
            </div>
          )}
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white font-bold text-sm uppercase ${
              item.type === "LOST" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {item.type}
          </div>
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {item.title}
          </h1>
          <p className="text-gray-500 mb-6">
            {new Date(item.createdAt).toDateString()} • {item.category}
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">Description</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Location</h3>
              <p className="text-gray-600">{item.location}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
              <h3 className="font-bold text-blue-900 mb-1">Contact Info</h3>
              <p className="text-blue-700">{item.contact_info}</p>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/items">
              <button className="text-gray-500 font-medium hover:text-gray-800">
                ← Back to Browse
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
