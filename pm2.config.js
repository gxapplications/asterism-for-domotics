const setup = require('./setup.json')

module.exports = {
  apps : [
    {
      name               : "asterism",
      script             : "./index.js",
      env: {
        NODE_ENV         : "production",
        TZ               : setup.timezone || "Europe/Paris"
      },
      instances          : 1,         // Do never use multiple instances while this means clustering
      exec_mode          : "fork",    // and load balancing on a statefull app! Keep 1 instance and fork mode
      kill_timeout       : 10000,
      wait_ready         : true,
      listen_timeout     : 60000,
      cron_restart       : '42 2 1 * *', // every first day of themonth, 2:42AM
      min_uptime         : 45000, // if crashes before 45sec of uptime, then will retry <max_restarts> times max.
      max_restarts       : 20,
      max_memory_restart : "1300M", // if uses more than 1300MB, consider it's a bug. Crash the instance and retry.
      restart_delay      : 3000, // Wait 3 sec before to restart after a crash
      autorestart        : true,
      post_update        : ["npm run update"]
    }
  ]
}
