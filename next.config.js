/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "cdn.dribble.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
      protocol: "https",
      hostname: "ewooral31.blob.core.windows.net"
      }
    ],
  },
};

module.exports = nextConfig;
