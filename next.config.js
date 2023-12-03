/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow images from external sources
  images: {
    remotePatterns: [
      {
        hostname: "img.clerk.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
