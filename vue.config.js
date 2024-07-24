const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  pages: {
    index: {
      entry: 'src/main.js',
      title: "What's the Dew Point?",
      description: "This tool can tell you how comfortable or uncomfortable is it outside right now."
    },
  },
  transpileDependencies: true
})
