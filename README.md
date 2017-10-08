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

TODO: all for PM2 settings. Warning, statefull, do NOT use multiple instances/cluster (load balancing)