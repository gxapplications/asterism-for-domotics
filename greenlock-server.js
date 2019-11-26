'use strict'

const pkg = require("./package.json")

module.exports = (setupData, app, debug = true) => {
    return (httpPort, httpsPort, callback) => {
        require("greenlock-express")
        .init(() => {
            return {
                greenlock: require("@root/greenlock").create({
                    packageAgent: pkg.name + "/" + pkg.version, // name & version for ACME client user agent
                    maintainerEmail: pkg.author, // contact for security and critical bug notices
                    packageRoot: __dirname // where to find .greenlockrc and set default paths
                }),

                //TODO !0: ports ? force staging mode with debug ?

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
