module.exports = {
  apps : [
    {
      name           : "asterism",
      script         : "./index.js",
      env: {
        NODE_ENV     : "production"
      },
      instances      : 1,         // Do never use multiple instances while this means clustering
      exec_mode      : "fork",    // and load balancing on a statefull app! Keep 1 instance and fork mode
      kill_timeout   : 10000,
      wait_ready     : true,
      listen_timeout : 360000 // wait for webpack to compile. Can take a while!
    }
  ]
}
