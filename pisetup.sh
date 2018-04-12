#/bin/bash
sudo apt-get update
sudo apt-get install screen
wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb
mkdir fish
cd fish
npm install --save nodemon
npm install --save socket.io
npm install --save express
sudo apt-get install pigpio
npm install pigpio
