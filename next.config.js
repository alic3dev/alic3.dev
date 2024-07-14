/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
  },

  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/Alice_Grace_Resume.pdf',
        permanent: false,
      },
      {
        source: '/enivid/elbib',
        destination: '/enivid/elbib/1',
        permanent: false,
      },
      {
        source: '/enivid/naruq',
        destination: '/enivid/naruq/1',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
