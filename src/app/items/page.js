import connectDB from '@/lib/db';
import Item from '@/models/Item';
import Link from 'next/link';
import ItemsList from '@/components/ItemsList';

export const dynamic = 'force-dynamic';

async function getItems() {
  try {
    await connectDB();
    // Sort by createdAt descending (newest first)
    // We convert the documents to plain objects so they can be passed to the Client Component
    const items = await Item.find({}).sort({ createdAt: -1 }).lean();

    // Convert _id and createdAt/updatedAt to strings for serialization
    return items.map((item) => ({
      ...item,
      _id: item._id.toString(),
      createdAt: item.createdAt?.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
    }));
  } catch (error) {
    console.error('Error loading items:', error);
    return [];
  }
}

export const metadata = {
  title: 'Browse All Items',
  description: 'Search through the latest lost and found items on campus.',
};

export default async function ItemsPage() {
  const items = await getItems();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Smart Campus Item Management System
          </h1>
          <p className="text-gray-500 mt-1">Browse all reported items</p>
        </div>

        <Link href="/report">
          <button className="bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
            + Report Item
          </button>
        </Link>
      </div>

      {/* We pass the data to the Client Component here */}
      <div className="max-w-6xl mx-auto">
        <ItemsList initialItems={items} />
      </div>
    </div>
  );
}
