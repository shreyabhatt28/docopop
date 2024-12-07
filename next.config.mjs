/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
        if (!isServer) {
          config.ignoreWarnings = [
            {
              module: /node_modules\/.*\/.*punycode/,
            },
          ];
        }
        return config;
      },    
    
};

export default nextConfig;
