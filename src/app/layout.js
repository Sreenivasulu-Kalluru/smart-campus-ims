import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Provider from '@/components/Provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: {
    default: 'Smart Campus Item Management System',
    template: '%s | Smart Campus IMS', // %s will be replaced by specific page titles
  },
  description:
    'The official portal to report and find lost items at SV University MCA Department - Tirupati.',
  keywords: [
    'lost and found',
    'college',
    'campus',
    'lost items',
    'found items',
  ],
  openGraph: {
    title: 'Smart Campus Item Management System',
    description: 'Report lost items and find what belongs to you.',
    url: 'https://your-domain.vercel.app', // You will update this after deploying
    siteName: 'Smart Campus IMS',
    images: [
      {
        url: 'https://your-domain.vercel.app/og-image.jpg', // A generic banner image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}
      >
        <Provider>
          {/* Navbar sits here, above all page content */}
          <Navbar />
          <main className="grow w-full flex flex-col">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
