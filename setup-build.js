'use strict'

/* global process */
require('babel-core/register')
require('colors')

const packageData = require('./package.json')
const release = packageData.version
console.log(('Asterism for domotics release '+release+' will now build!').cyan)

// Get setup params
const setupData = require('./setup.json')
if (setupData.mode > 1) { // Only HTTPS, WebPush notifications
  // notif deactivated with 'build' flag
  process.argv.push(`--webPushServerUrl=build`)
}

const { server, browser } = require('asterism')

// Plugins
const plugins = packageData['asterism-plugins']
for (let plugin of plugins) {
  server.use(require(plugin))
}

browser.pack(server, true, () => {
  console.log(('Build OK: Webpack files generated').cyan)
  process.exit(0)
})
