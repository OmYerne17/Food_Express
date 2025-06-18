module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'example.com', // Replace with your image domain
          port: '',
          pathname: '/path/to/images/**',
        },
      ],
    },
    async headers() {
      return [
        {
          // Apply these headers to all routes
          source: '/api/(.*)',
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
            { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          ],
        },
      ];
    },
  };
  