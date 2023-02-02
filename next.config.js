/** @type {import('next').NextConfig} */
const nextConfig = [{
  reactStrictMode: true,
},{
  async redirects() {
    return [
      {
        source: "/movies",
        destination: "/movies/popular",
        permanent: true,
      },
    ];
  },
};]

module.exports = nextConfig
