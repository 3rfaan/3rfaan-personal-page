/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  async redirects() {
    return [
      {
        source: "/tag",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
