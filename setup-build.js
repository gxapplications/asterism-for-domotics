'use strict'

/* global process */
require('@babel/register')
require('colors')

const packageData = require('./package.json')
const release = packageData.version
console.log(('Asterism for domotics release '+release+' will now build!').cyan)

const setupData = require('./setup.json')
if (setupData.mode > 1) { // Only HTTPS, WebPush notifications
  process.argv.push(`--webPushPublicKey=${setupData.webPushPublicKey}`)
  process.argv.push(`--webPushPrivateKey=${setupData.webPushPrivateKey}`)
  process.argv.push(`--webPushEmail=mailto:${setupData.email}`)
  process.argv.push(`--webPushServerUrl=${setupData.domains[0]}`)
}
process.argv.push(`--build-only=true`)
const { server, browser } = require('asterism')

// Plugins
const plugins = packageData['asterism-plugins']
for (let plugin of plugins) {
  server.use(require(plugin))
}

browser.pack(server, () => {
  console.log(('Build OK: Webpack files generated').cyan)
  process.exit(0)
})
