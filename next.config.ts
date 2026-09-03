import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/igraonica/magicna-masina",
        destination: "/igraonica/magicna-pisaca-masina",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
