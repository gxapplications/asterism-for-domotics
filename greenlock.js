'use strict'

const path = require('path')

module.exports = (setupData, app, debug = true) => {

    // My User / Domain Database
    const checkDb = (opts, cb) => {
        const passCheck = opts.domains.every(function (domain) {
            return -1 !== setupData.domains.indexOf(domain)
        })

        if (!passCheck) {
            cb(new Error('Domain not allowed!'))
        } else {
            cb(null, true, setupData.email)
        }
    }

    // My Secure Database Check
    const approveDomains = (opts, certs, cb) => {
        // The domains being approved for the first time are listed in opts.domains
        // Certs being renewed are listed in certs.altnames
        if (certs) {
            opts.domains = certs.altnames
            cb(null, { options: opts, certs: certs })
            return
        }

        // Only one domain is listed with *automatic* registration via SNI
        // (it's an array because managed registration allows for multiple domains,
        // which was the case in the simple example)
        if (debug) {
            console.log(opts.domains)
        }

        checkDb(opts, function (err, agree, email) {
            if (err) {
                cb(err)
                return
            }

            // You MUST NOT build clients that accept the ToS without asking the user
            opts.agreeTos = agree
            opts.email = email

            if (!opts.challenges) {
                opts.challenges = {}
            }
            opts.challenges["http-01"] = require("le-challenge-fs").create({
                webrootPath: path.join(__dirname, 'var', 'acme-challenge'),
                debug
            });
            opts.challengeTypes = ['http-01'];

            cb(null, { options: opts, certs: certs })
        });
    }

    return require('greenlock-express').create({
        // If at first you don't succeed, stop and switch to staging / debug mode
        server: debug ? 'https://acme-staging-v02.api.letsencrypt.org/directory' : 'https://acme-v02.api.letsencrypt.org/directory',
        version: 'draft-11',

        // You MUST have write access to save certs
        configDir: '~/acme-challenge/',

        // email: 'none@see.note.above',
        // agreeTos: false,
        approveDomains: approveDomains,

        app,
        store: require('greenlock-store-fs'),
        communityMember: false,
        debug
    })
}
