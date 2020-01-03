'use strict'

/* global process */
require('@babel/register')
require('colors')

const packageData = require('./package.json')
const release = packageData.version
console.log(('Asterism for domotics release '+release).cyan)

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

const server = require('asterism').server

// Plugins
const plugins = packageData['asterism-plugins']
for (let plugin of plugins) {
  server.use(require(plugin))
}

// Start server
server.start(
  portOffset,
  setupData.authorizedIps || ['127.0.0.1', '0.0.0.0', '::1', '192.168.0.0/24', '192.168.1.0/24'],
  function () {
    console.log(modeLog)
    if (process && process.send) {
     process.send('ready')
    }
  },
  (setupData.mode === 3) ? require('./greenlock-server')(setupData, server.express) : null
)

// Linux graceful stop
process.on('SIGINT', function () {
  try {
    console.warn('SIGINT signal received.')
    server.stop(() => { process.exit(0) }, 'Stop required by system.')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})
process.on('SIGTERM', function () {
  try {
    console.warn('SIGTERM signal received.')
    server.stop(() => { process.exit(0) }, 'Stop required by system.')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})

// Windows graceful stop
process.on('message', function(msg) {
  if (msg == 'shutdown') {
    try {
      console.warn('Shutdown signal received.')
      server.stop(() => { process.exit(0) }, 'Stop required by system.')
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
})
