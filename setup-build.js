'use strict'

/* global process */
require('babel-core/register')
require('colors')

const packageData = require('./package.json')
const release = packageData.version
console.log(('Asterism for domotics release '+release+' will now build!').cyan)

const asterism = require('asterism')
const server = asterism.server
const browser = asterism.browser

// Plugins
const plugins = packageData['asterism-plugins']
for (let plugin of plugins) {
  server.use(require(plugin))
}

browser.pack(server, true, () => {
  console.log(('Build OK: Webpack files generated').cyan)
  process.exit(0)
})
