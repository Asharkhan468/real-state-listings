import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn-icons-png.flaticon.com"
    ],

  },
  experimental: {
    middlewarePrefetch: "flexible",
  },

};

export default nextConfig;

