const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  css: {
    sourceMap: true,
  },
  assetsDir: 'assets',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: false,
      },
    },
  },
})
