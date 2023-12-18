/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    API_KEY_SECRET: process.env.API_KEY_SECRET,
    PROJECT_ID: process.env.PROJECT_ID,
    API_SIGNATURE_URL: process.env.API_SIGNATURE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nft-preview-media.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
