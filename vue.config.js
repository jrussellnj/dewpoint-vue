const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  pages: {
    index: {
      entry: 'src/main.js',
      title: "What's the dew point?",
    },
  },
  transpileDependencies: true
})
