'use strict'

/* global process */
require('colors')
const execSh = require('exec-sh')
const fs = require('fs')
const prompt = require('prompt-sync')({ sigint: true })
const webPush = require('web-push')

const setup = require('./setup.json')
let mode = setup.mode || 1
let authorizedIps = setup.authorizedIps || ['127.0.0.1', '0.0.0.0', '::1', '192.168.0.0/24', '192.168.1.0/24']
let email = setup.email || null
let domains = setup.domains || []
let webPushPublicKey = setup.webPushPublicKey || null
let webPushPrivateKey = setup.webPushPrivateKey || null
let timezone = setup.timezone || 'Europe/Paris'

const writeSetupAndQuit = (withWebPush = false) => {
  setup.mode = mode
  setup.authorizedIps = authorizedIps
  setup.email = email
  setup.domains = domains
  if (withWebPush && webPushPublicKey === null && webPushPrivateKey === null) {
    const keys = webPush.generateVAPIDKeys()
    setup.webPushPublicKey = keys.publicKey
    setup.webPushPrivateKey = keys.privateKey
    console.log('Wrote new webPush VAPID keys on your setup conf.'.green)
  }
  fs.writeFile('./setup.json', JSON.stringify(setup, null, 2), 'utf8', () => {
    process.exit(0)
  })
}

// TIMEZONE
do {
  timezone = prompt(`Please enter your timezone [default ${setup.timezone || 'Europe/Paris'}]: `, setup.timezone)
} while(!(timezone.length > 0))

// MODE
console.log('Now, you must choose a way to execute asterism.'.yellow)
console.log('1 - HTTP only, usable for local network only (by default, but not secured at all).'.yellow)
console.log('2 - HTTPS with self signed certificate, sufficient for local network only. You will need to install the certificates on your devices (browsers) by yourself.'.yellow)
console.log('3 - HTTPS with your own domain name, usable for public access server. You need to own a domain name and make it point to this present server.'.yellow)
do {
  mode = parseInt(prompt(`Please choose one of the above modes [default ${mode}]: `, mode), 10)
} while(![1, 2, 3].includes(mode))

// AUTHORIZED IPs
do {
  authorizedIps = JSON.parse(
      prompt(`Please enter authorized IPs/masks as an array of strings in a valid JSON format [default ${JSON.stringify(setup.authorizedIps)}]: `,
  JSON.stringify(setup.authorizedIps))
)
} while(!(authorizedIps.length > 0))

// MODE
switch (mode) {
  case 2: // SELF SIGNED CERTIFICATE
    do {
      email = prompt(`Please enter certificate email [default ${setup.email || 'not set'}]: `, setup.email)
    } while(!(email.length > 0))

    let host = ''
    do {
      host = prompt(`Please enter certificate host/IP: `, '')
    } while(!(host.length > 0))

    execSh(`HOST=${host} EMAIL=${email} ./setup-self-signed-certificates.sh`, { cwd: './' }, (err) => {
      if (err) {
        console.error('ERROR:', err)
        process.exit(1)
      }

      // WRITE SETUP
      writeSetupAndQuit(true)
    })
    break

  case 3: // HTTPS WITH GREENLOCK
    do {
      email = prompt(`Please enter domains owner's email [default ${setup.email || 'not set'}]: `, setup.email)
    } while(!(email.length > 0))

    do {
      domains = JSON.parse(
        prompt(`Please enter domains as an array of strings in a valid JSON format [default ${JSON.stringify(setup.domains)}]: `,
          JSON.stringify(setup.domains))
      )
    } while(!(domains.length > 0))

    execSh(`npx greenlock defaults --subscriber-email '${email}' --agree-to-terms`, { cwd: './' }, (err2) => {
      if (err2) {
        console.error('ERROR:', err2)
        process.exit(1)
      }

      execSh(`npx greenlock add --subject ${domains[0]} --altnames ${domains.join(',')}`, { cwd: './' }, (err3) => {
        if (err3) {
          console.error('ERROR:', err3)
          process.exit(1)
        }

        // WRITE SETUP
        writeSetupAndQuit(true)
      })
    })
    break

  default: // HTTP ONLY
    // nothing for now...

    // WRITE SETUP
    writeSetupAndQuit(false)
}
