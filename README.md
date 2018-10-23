![asterism-logo](https://raw.githubusercontent.com/gxapplications/asterism/master/doc/asterism-text.png)

_Extensible dashboard platform for domotics. Made in NodeJS, React and Materialize CSS._

### _asterism-for-domotics_ is an application to let you build your dashboard to control/monitor everything you want as long as there is a module for that.


# Prerequisites

As this package uses plugins that need specific settings before installation (third part softs prerequisites), you need to complete these steps first of all:
- [Zwave open-zwave library](https://github.com/gxapplications/asterism-plugin-zwave/blob/master/README.md#asterism-plugin-zwave)


# Quick install guide

```
git clone https://www.github.com/gxapplications/asterism-for-domotics.git
```
This will clone the project. You can modify your settings (used plugins) in the index.js if you want different plugins. Do it before setup step!

```
npm run setup
```
This will install without development/test dependencies (will use less disk space). This will install more than 1100 dependencies in about 5 to 15 minutes.
A build is done just after (using webpack) to compile asterism and selected plugins (can take several minutes).
And then a choice can be made: either to use local HTTP / local self signed HTTPS / full public HTTPS with your own domain name.

```
npm start
```
You can start it for test. You should use PM2 for production (for auto-restart, log management, ...)
Server will start after setup automatically. But you can restart it directly with this.


# Update guide

```
npm run update
```


# Install on PM2

After playing setup process (npm run setup), you can use PM2 to have a serious production exploitation.

- Install PM2 globally, from npm. Root privileges may be required:
```
npm install -g pm2
```

- Optionally install PM2 log-rotate plugin:
```
pm2 install pm2-logrotate
```

- Install and save PM2 ecosystem for _asterism-for-domotics_:
```
pm2 start pm2.config.js
```
This will automatically start asterism process.

- Check installation:
```
pm2 ls
```

- To start & stop _asterism_:
```
pm2 start asterism
pm2 stop asterism
```

- To auto-start PM2 at OS boot:
```
pm2 startup
```
And follow the instructions.


For more details about PM2, see [http://pm2.keymetrics.io/docs](http://pm2.keymetrics.io/docs/usage/quick-start/)

**Warning: _asterism_ server is statefull: do NOT use multiple instances/cluster (no load balancing available)**


# Update it from PM2

```
pm2 pull asterism
```
This stops the service, updates it from Github, updates dependencies, build webpack files, and then restart the process. This can take several minutes!
TODO : test if this line is done:  post_update: ["npm run update"]
