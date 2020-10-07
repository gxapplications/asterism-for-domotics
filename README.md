![asterism-logo](https://raw.githubusercontent.com/gxapplications/asterism/master/docs/asterism-text.png)

### _asterism-for-domotics_ is a Domotics oriented standalone software, based on _asterism_ framework.

_NOT cloud based (local & private service). Made in NodeJS & Material interface._

---

[![release date](https://img.shields.io/github/release-date/gxapplications/asterism-for-domotics.svg)](https://github.com/gxapplications/asterism-for-domotics/releases)
![node version](https://img.shields.io/badge/node-%3E%3D%2012.12.0-pink.svg)
[![github downloads](https://img.shields.io/github/downloads/gxapplications/asterism-for-domotics/total.svg?logo=github&label=github%20downloads)](https://github.com/gxapplications/asterism-for-domotics/releases)
[![asterism dep version](https://img.shields.io/badge/asterism-1.9-green.svg)](https://www.npmjs.com/package/asterism)
[![lib dep version](https://img.shields.io/badge/asterism%20plugin%20library-2.4-green.svg)](https://www.npmjs.com/package/asterism-plugin-library)

Available plugins:

[![asterism-plugin-zwave dep version](https://img.shields.io/badge/asterism%20plugin%20zwave-1.2-green.svg)](https://www.npmjs.com/package/asterism-plugin-zwave)

[![asterism-plugin-ipcam dep version](https://img.shields.io/badge/asterism%20plugin%20ipcam-1.6-green.svg)](https://www.npmjs.com/package/asterism-plugin-ipcam)

[![asterism-plugin-teleinfo dep version](https://img.shields.io/badge/asterism%20plugin%20teleinfo-0.3-orange.svg)](https://www.npmjs.com/package/asterism-plugin-teleinfo)

[![asterism-plugin-ftt dep version](https://img.shields.io/badge/asterism%20plugin%20ftt-0.1-orange.svg)](https://www.npmjs.com/package/asterism-plugin-ftt)


_[Development progression / Roadmap available here (asterism and plugins)](https://github.com/users/gxapplications/projects/1)_

---


# Prerequisites

- A private server remaining ON to run the background application (Linux like), reachable in a protected network area only (public version with authentication will come later),
- One or more clients to display and control the dashboard via a Chrome browser (tablet, computer, mobile phone...).
- Server part is not compatible with Microsoft Windows OS. Web part is compatible with Google Chrome & Chromium only, >= 71.

## Example to install on Raspberry Pi

- Download and flash Raspbian Debian Buster **minimal** image on a >=8Go SD card.
- Setup: OS, password, locales, network, IP, activate ssh, and expand rootfs partition to have sufficient space. `sudo raspi-config`
- Setup your timezone (very important, and please note it down). `tzselect`
- Install GIT. `sudo apt-get update && sudo apt-get install git`
- Download nodeJS v12. `wget https://nodejs.org/dist/v12.14.1/node-v12.14.1-linux-armv7l.tar.xz`
- Install nodeJS. `sudo mkdir -p /usr/local/lib/nodejs` && `sudo tar -xJvf node-v12.14.1-linux-armv7l.tar.xz -C /usr/local/lib/nodejs`
- Add this line to ~/.profile: `export PATH=/usr/local/lib/nodejs/node-v12.14.1-linux-armv7l/bin:$PATH`

## Plugins prerequisites

As this package uses plugins that need specific settings before installation (third part softs prerequisites), you need to complete these steps first of all:
- [Zwave open-zwave library prerequisites](https://github.com/gxapplications/asterism-plugin-zwave/blob/master/README.md#asterism-plugin-zwave)
- The new 433MHz (ftt) library prerequisites: `sudo apt-get install wiringpi`
- When using HTTPS mode, you need to let nodeJS access :80 and :443 ports: `sudo setcap 'cap_net_bind_service=+ep' $(which node)`


# Quick install guide

```
git clone https://www.github.com/gxapplications/asterism-for-domotics.git
```
This will clone the project. You can modify your settings (used plugins) in the index.js if you want different plugins. Do it before setup step!

```
npm run setup
```
This will install without development/test dependencies (will use less disk space). This will install a lot of dependencies in about 5 to 15 minutes.
A build is done just after (using webpack) to compile asterism and selected plugins (can take several minutes).
And then a choice can be made: either to use local HTTP / local self signed HTTPS / full public HTTPS with your own domain name.

In the two first choices case, just launch the server to test it:
```
npm start
```

In the last choice case, we use Greenlock to generate SSL certificates, and then we need some extra configuration before to start:
```
npm start -- --staging
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

- To auto-start PM2 at OS boot:
```
pm2 startup
```
And follow the instructions, then after launching asterism service, save its startup configuration using:
```
pm2 save
```

- To start & stop _asterism_:
```
pm2 start asterism
pm2 stop asterism
```

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


:copyright: 2017-2020 GXApplications. [ [Roadmap/Milestones](https://github.com/gxapplications/asterism/milestones?direction=asc&sort=due_date&state=open) | [License](https://github.com/gxapplications/asterism-for-domotics/blob/master/LICENSE.md) ]
