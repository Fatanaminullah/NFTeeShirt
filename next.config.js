/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    API_KEY_SECRET: process.env.API_KEY_SECRET,
    PROJECT_ID: process.env.PROJECT_ID,
  },
};

module.exports = nextConfig;
