import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn-icons-png.flaticon.com"
    ],

  },
  experimental: {
    proxyPrefetch: "flexible",
  },

};

export default nextConfig;

