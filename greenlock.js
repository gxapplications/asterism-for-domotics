'use strict'

module.exports = (setupData, app) => {

    // My User / Domain Database
    const fooCheckDb = (opts, cb) => {
        var domains = setupData.domains
        var userEmail = setupData.email
        var userAgrees = true
        var passCheck = opts.domains.every(function (domain) {
            return -1 !== domains.indexOf(domain)
        })

        if (!passCheck) {
            cb(new Error('domain not allowed'))
        } else {
            cb(null, userAgrees, userEmail)
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
        console.log(opts.domains)

        fooCheckDb(opts, function (err, agree, email) {
            if (err) {
                cb(err)
                return
            }

            // You MUST NOT build clients that accept the ToS without asking the user
            opts.agreeTos = agree
            opts.email = email

            // NOTE: you can also change other options such as `challengeType` and `challenge`
            // (this would be helpful if you decided you wanted wildcard support as a domain altname)
            // opts.challengeType = 'http-01';
            // opts.challenge = require('le-challenge-fs').create({});

            cb(null, { options: opts, certs: certs })
        });
    }


    return require('greenlock-express').create({
        // Note: If at first you don't succeed, stop and switch to staging
        // https://acme-staging-v02.api.letsencrypt.org/directory
        server: 'https://acme-v02.api.letsencrypt.org/directory',
        version: 'draft-11',

        // You MUST have write access to save certs
        configDir: './var',

        // The previous 'simple' example set these values statically,
        // but this example uses approveDomains() to set them dynamically
        // email: 'none@see.note.above',
        // agreeTos: false,

        // approveDomains is the right place to check a database for
        // email addresses with domains and agreements and such
        approveDomains: approveDomains,

        app,
        communityMember: false,
        debug: false
    })
}
