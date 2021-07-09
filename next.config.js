module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Important: return the modified config
      
      config.externals.push("bufferutil", "utf-8-validate", "mqtt"); 
      return config
    },
  }