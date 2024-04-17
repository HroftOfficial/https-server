const express = require('express');

const https = require('https');
const fs = require('fs');
const path = require('path');
const PORT = '8443';

const doLog = console.log;

var key = fs.readFileSync(__dirname + '/certs/device.key');
var cert = fs.readFileSync(__dirname + '/certs/192.168.1.106.crt');
// var key = fs.readFileSync(__dirname + '/certs/atsnet.key');
// var cert = fs.readFileSync(__dirname + '/certs/atsnet.crt');

// doLog(key, cert);

const options = {
    key,
    cert
};


const app = express();




app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const server = https.createServer(options, app);
server.listen(PORT, () => {
    doLog("server starting on port : " + PORT)
  });
