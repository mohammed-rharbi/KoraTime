import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
    images: {
        domains: [`${process.env.NEXT_PUBLIC_IP}`],
      },
};

export default nextConfig;
