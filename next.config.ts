/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Disable image optimization ONLY in development mode
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
