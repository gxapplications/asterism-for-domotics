'use strict'

const pkg = require("./package.json")

module.exports = (setupData, app, debug = true) => {
    return (httpPort, httpsPort, callback) => {
        require("greenlock-express")
        .init(() => {
            return {
                maintainerEmail: setupData.email, // contact for security and critical bug notices
                packageRoot: __dirname, // where to find .greenlockrc and set default paths
                configDir: "./var/greenlock.d",
                cluster: false // whether or not to run at cloudscale
            }
        })
        .serve((glx) => {
            const server = glx.httpsServer()
            glx.serveApp(app)
            callback(server)
        })
    }
}
