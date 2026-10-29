/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The Vite build of the 3D office is written to public/app; serve it at "/".
  async rewrites() {
    return [{ source: '/', destination: '/app/index.html' }];
  },
};

export default nextConfig;
