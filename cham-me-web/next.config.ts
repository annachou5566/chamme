// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ufmlcpugjrbxxscetwoc.supabase.co', 
      },
      {
        protocol: 'https',
        hostname: 'https://pub-d641df2617f14733a84528eb2171cf3c.r2.dev', 
      },
    ],
  },
};

export default nextConfig;