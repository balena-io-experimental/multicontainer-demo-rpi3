# Getting Started with Multicontainer on Resin.io

This example will get you up and running quickly with a multicontainer setup on resin.io. The application plots our devices' CPU temperature on the device URL and LCD screen which is piped over using websockets. The system is composed of a simple static site server, a websocket server and a proxy and GUI service. These 4 components are defined in our [docker-compose.yml](docker-compose.yml) as services and are only given as much privilege as is needed.

To get this project up and running, you will first need to signup for a resin.io account [here](https://dashboard.resin.io/signup), create an application, and add a device. Have a look at our [Getting Started guide](https://docs.resin.io/learn/getting-started/) if you need help. 

Once you are set up with resin.io, you will need to clone this repo locally:
```
$ git clone https://github.com/resin-io-projects/multicontainer-demo-rpi3
```
Then add your resin.io application's remote repository to your local repository:
```
$ git remote add resin username@git.resin.io:username/myapp.git
```
and push the code to the newly added remote:
```
$ git push resin master
```
It should take a few minutes for the code to push. While you wait, let's [enable device URLs](https://docs.resin.io/learn/manage/actions/#enable-public-device-url) so we can see the server outside of our local network. This option can be found in the Actions drop down in your device dashboard. 

### Setup:

Give the GPU some more memory to run the GUI.
```
RESIN_HOST_CONFIG_gpu_mem=192
```

Device Configuration for PiTFT screens:

If you are using one of the piTFT screens, you will need to apply the following config.
```
RESIN_HOST_CONFIG_dtoverlay=pitft28-resistive,rotate=90,speed=62000000,fps=60
RESIN_HOST_CONFIG_hdmi_force_hotplug	1
RESIN_HOST_CONFIG_hdmi_group	2
RESIN_HOST_CONFIG_hdmi_mode	87
RESIN_HOST_CONFIG_hdmi_cvt	320 240 60 1 0 0 0
```

### Demo:

In order to demonstrate some visible changes after an update, you can follow these steps:

- In https://github.com/resin-io-projects/multicontainer-demo-rpi3/blob/master/data/index.js
  - Uncomment `// data.color = '#FF0000'` . This will change the graph from the default blue to a more visible red color.
  - Comment out `getRandomTemp(socket);` and uncomment `// getCpuTemp(socket);`. After pushing this change, the graph should be less random, with values around the current CPU temperature. If you provision a local device, you can show off a cool effect by touching the CPU with your finger; the temperature will instantly drop and that will be visible in the graph.
