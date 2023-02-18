/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com','fastly.4sqi.net'],
  },
  env: {
    API_URL: 'http://localhost:3000/api',
    NEXT_PUBLIC_FOURSQUARE_API_KEY: 'fsq3SSS5regOog223ST57/ea+PdPGZ+ZrE7R8IEz2EvU/vc=',
    MY_SECRET_TOKEN:'12345678'
  },
}

module.exports = nextConfig