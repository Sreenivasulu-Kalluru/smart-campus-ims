'use client';

import Link from 'next/link';
import Image from 'next/image';
// We don't need useSession here anymore for the navbar!

export default function Home() {
  return (
    <div className="grow relative flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/campus-hero.jpeg"
        alt="Campus Background"
        fill
        className="object-cover z-0"
        priority
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
          Smart Campus Item Management System
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl drop-shadow-md">
          The easiest way to report lost items and find what belongs to you.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <Link href="/report">
            <button className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition shadow-2xl w-full md:w-auto transform hover:scale-105 active:scale-95">
              Report an Item
            </button>
          </Link>

          <Link href="/items">
            <button className="bg-white/10 backdrop-blur-md text-white border-2 border-white/50 px-10 py-4 rounded-xl text-lg font-bold hover:bg-white/20 transition shadow-2xl w-full md:w-auto transform hover:scale-105 active:scale-95">
              Browse Items
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
