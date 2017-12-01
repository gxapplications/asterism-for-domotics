'use strict'

/* global process */
require('babel-core/register')
require('colors')

const release = require('./package.json').version
console.log(('Asterism for domotics release '+release).cyan)
const server = require('asterism').server

// Plugins
server.use(require('asterism-plugin-ipcam'))
server.use(require('asterism-plugin-zwave'))

// Start server
server.start(9000, ['127.0.0.1', '0.0.0.0', '::1', '192.168.0.0/24', '192.168.1.0/24'], function () {
  console.log('Asterism for domotics running on localhost, ports 9080/9443, available from local network!'.green)
  if (process && process.send) {
    process.send('ready')
  }
})

// Linux graceful stop
process.on('SIGINT', function () {
  try {
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
      server.stop(() => { process.exit(0) }, 'Stop required by system.')
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
})
