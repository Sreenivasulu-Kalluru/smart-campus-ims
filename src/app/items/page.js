import Link from 'next/link';
import ItemsList from '@/components/ItemsList'; // Import your new component

export const dynamic = 'force-dynamic';

async function getItems() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/items`,
      {
        cache: 'no-store',
      },
    );

    if (!res.ok) {
      throw new Error('Failed to fetch items');
    }

    const json = await res.json();
    return json.data; // Return just the array of data
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
