import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/', // Redireciona para a página principal
        permanent: true,  // O redirecionamento será permanente
      },
    ]
  },
};

export default nextConfig;
