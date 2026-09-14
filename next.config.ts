import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/resume',
        // Replace this URL with your Google Drive, Notion, or PDF link
        // Because permanent is false, you can update this link anytime and it takes effect instantly
        destination: 'https://drive.google.com/file/d/14-Dgb6QaErkV-yZPfOcycR_MEhAng8D4/view?usp=sharing',
        permanent: false, 
      },
    ]
  },
};

export default nextConfig;
