/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // For user uploads
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // For the dummy seed data
      },
    ],
  },
};

export default nextConfig;
