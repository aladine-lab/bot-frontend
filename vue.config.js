const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    host: '0.0.0.0', // Allow connections from any IP
    port: 8080, // Make sure this matches your local dev server port
    allowedHosts: 'all', // Allows any host to connect, bypassing host check
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws', // Automatically use the current host/port for websockets
    },
  },
};