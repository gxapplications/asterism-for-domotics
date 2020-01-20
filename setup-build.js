'use strict'

/* global process */
require('babel-core/register')
require('colors')

const packageData = require('./package.json')
const release = packageData.version
console.log(('Asterism for domotics release '+release+' will now build!').cyan)

// Get setup params
const setupData = require('./setup.json')
const portOffset = setupData.mode === 3 ? 0 : 9000
const modeLog = (setupData.mode === 3) ?
    'Asterism for domotics running on Internet, ports 80/443, available to the entire world!'.yellow :
    'Asterism for domotics running on localhost, ports 9080/9443, available from local network!'.green

if (setupData.mode > 1) { // Only HTTPS, WebPush notifications
  process.argv.push(`--webPushPublicKey=${setupData.webPushPublicKey}`)
  process.argv.push(`--webPushPrivateKey=${setupData.webPushPrivateKey}`)
  process.argv.push(`--webPushEmail=mailto:${setupData.email}`)
  process.argv.push(`--webPushServerUrl=${setupData.domains[0]}`)
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
