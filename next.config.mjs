/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Existing rule for SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack" }],
    });

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },

      // Linode server
      {
        protocol: "https",
        hostname: "api.massiveonlinemarketing.nl",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "payload.massiveonlinemarketing.nl",
        port: "4000",
      },
    ],
  },

  env: {
    G_TAG: process.env.G_TAG,
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
