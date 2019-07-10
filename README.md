![asterism-logo](https://raw.githubusercontent.com/gxapplications/asterism/master/doc/asterism-text.png)

### _asterism-for-domotics_ is a Domotics oriented standalone software, based on _asterism_ framework.

_NOT cloud based (local & private service). Made in NodeJS & Material interface._

---

[![release date](https://img.shields.io/github/release-date/gxapplications/asterism-for-domotics.svg)](https://github.com/gxapplications/asterism-for-domotics/releases)
![node version](https://img.shields.io/badge/node-%3E%3D%208.9.4-pink.svg)
[![npm package version](https://badge.fury.io/js/asterism-for-domotics.svg?logo=npm)](https://www.npmjs.com/package/asterism-for-domotics)
[![npm downloads](https://img.shields.io/npm/dt/asterism-for-domotics.svg?logo=npm&label=npm%20downloads)](https://www.npmjs.com/package/asterism-for-domotics)
[![github downloads](https://img.shields.io/github/downloads/gxapplications/asterism-for-domotics/total.svg?logo=github&label=github%20downloads)](https://github.com/gxapplications/asterism-for-domotics/releases)

Plugins versions:
[![asterism dep version](https://img.shields.io/npm/dependency-version/asterism-for-domotics/asterism.svg)](https://www.npmjs.com/package/asterism)
[![lib dep version](https://img.shields.io/npm/dependency-version/asterism-for-domotics/asterism-plugin-library.svg)](https://www.npmjs.com/package/asterism-plugin-library)
[![asterism-plugin-zwave dep version](https://img.shields.io/npm/dependency-version/asterism-for-domotics/asterism-plugin-zwave.svg)](https://www.npmjs.com/package/asterism-plugin-zwave)
[![asterism-plugin-ipcam dep version](https://img.shields.io/npm/dependency-version/asterism-for-domotics/asterism-plugin-ipcam.svg)](https://www.npmjs.com/package/asterism-plugin-ipcam)

_[Development progression / Roadmap available here (asterism and plugins)](https://github.com/users/gxapplications/projects/1)_

---

# Prerequisites

- A private server remaining ON to run the background application (Linux like), reachable in a protected network area only (public version with authentication will come later),
- One or more clients to display and control the dashboard via a Chrome browser (tablet, computer, mobile phone...).
- Server part is not compatible with Microsoft Windows OS. Web part is compatible with Google Chrome & Chromium only, >= 71.


As this package uses plugins that need specific settings before installation (third part softs prerequisites), you need to complete these steps first of all:

- [Zwave open-zwave library](https://github.com/gxapplications/asterism-plugin-zwave/blob/master/README.md#asterism-plugin-zwave) (skip if you don't need it)


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

---


# Troubleshooting

Allow a Raspberry Pi to use port 80 (without sudo at startup)
```
sudo setcap 'cap_net_bind_service=+ep' $(which node)
```

# Project under beta testing development
_asterism_ is for now in public testing stage, for 2019. You are welcome to use it and test it.
Stable release is scheduled for 2020.

:copyright: 2017-2019 GXApplications. [ [Roadmap/Milestones](https://github.com/gxapplications/asterism/milestones?direction=asc&sort=due_date&state=open) | [License](https://github.com/gxapplications/asterism-for-domotics/blob/master/LICENSE.md) ]
