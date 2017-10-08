![asterism-logo](https://raw.githubusercontent.com/gxapplications/asterism/master/doc/asterism-text.png)

_Extensible dashboard platform for domotics. Made in NodeJS, React and Materialize CSS._

### _asterism-for-domotics_ is an application to let you build your dashboard to control/monitor everything you want as long as there is a module for that.

# Quick install guide

```
git clone https://www.github.com/gxapplications/asterism-for-domotics.git
```
This will clone the project. You can modify your settings (used plugins) in the index.js if you want different plugins. Do it before npm install!

```
npm install --production
```
This will install without development/test dependencies (will use less disk space). This will install more than 1090 dependencies in about 5 to 15 minutes.

```
npm start
```
You can start it for test. You should use PM2 for production (for auto-restart, log management, ...)


# Update guide

```
npm update --production
npm start
```


# Install on PM2

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
