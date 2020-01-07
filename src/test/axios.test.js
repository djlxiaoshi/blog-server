const axios = require('axios');

// const url = 'http://devtools.qiniu.com/qiniu.png'
const url = 'https://camo.githubusercontent.com/c66b9e326e2d8c518bd4d8e2c82b4b72029e3911/687474703a2f2f7374617469632e67616c696c656f2e7869616f6a756b656a692e636f6d2f7374617469632f746d732f736869656c642f7675652d726f757465722545352538392541462545362539432541432e706e67'
axios.get(url).then(response => {
  console.log(response.data)
}, error => {
  console.log('error', error)
})