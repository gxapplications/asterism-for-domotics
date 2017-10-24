module.exports = {
  apps : [
    {
      name               : "asterism",
      script             : "./index.js",
      env: {
        NODE_ENV         : "production"
      },
      instances          : 1,         // Do never use multiple instances while this means clustering
      exec_mode          : "fork",    // and load balancing on a statefull app! Keep 1 instance and fork mode
      kill_timeout       : 10000,
      wait_ready         : true,
      listen_timeout     : 360000, // wait for webpack to compile. Can take a while!
      cron_restart       : '42 2 * * 1', // every monday, 2:42AM
      min_uptime         : 10000, // if crashes before 10sec of uptime, then will retry <max_restarts> times max.
      max_restarts       : 42,
      max_memory_restart : "800M", // if uses more than 800MB, consider it's a bug. Crash the instance and retry.
      restart_delay      : 5000, // Wait 5 sec before to restart after a crash
      autorestart        : true,
      post_update        : ["npm install"]
    }
  ]
}
