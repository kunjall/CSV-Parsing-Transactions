const mongoose = require('mongoose')
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const url = process.env.URL

mongoose.connect(url)
    .then(res => console.log("connected to db"))
    .catch(err => console.log(err));