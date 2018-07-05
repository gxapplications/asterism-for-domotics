'use strict'

/* global process */
require('babel-core/register')
require('colors')

const release = require('./package.json').version
console.log(('Asterism for domotics release '+release).cyan)
const asterism = require('asterism')
const server = asterism.server
const browser = asterism.browser

// Plugins
// TODO !0: mutualize with index.js, into package.json subobject!
server.use(require('asterism/dist/plugins/scenarii'))
server.use(require('asterism/dist/plugins/navigation-tools'))
server.use(require('asterism-plugin-ipcam'))
server.use(require('asterism-plugin-zwave'))

browser.pack(server, true, () => {
  console.log(('Build OK: Webpack files generated').cyan)
})
