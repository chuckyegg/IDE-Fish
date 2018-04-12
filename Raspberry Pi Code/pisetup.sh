#/bin/bash
sudo apt-get update
sudo apt-get install screen
wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb
mkdir fish
cd fish
sudo npm install -g nodemon
sudo npm install --save socket.io
sudo npm install --save express
sudo apt-get install pigpio
sudo npm install pigpio
