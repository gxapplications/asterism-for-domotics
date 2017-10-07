'use strict'

require('babel-core/register')
const server = require('asterism').server

server.use(require('asterism/dist/plugins/ip-cam'))

server.start(80, ['127.0.0.1', '0.0.0.0', '::1', '192.168.0/24', '192.168.1/24'], function () {
    console.log('Asterism for domotics running on localhost, port 80, available from local network!')
})
