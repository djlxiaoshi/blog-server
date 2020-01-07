const axios = require('axios')
const cheerio = require('cheerio')
const TurndownService = require('turndown')
const { uploadFromUrl } = require('../utils/upload.js');

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
})


const htmlstring = `
<div>
  <img src="https://camo.githubusercontent.com/c66b9e326e2d8c518bd4d8e2c82b4b72029e3911/687474703a2f2f7374617469632e67616c696c656f2e7869616f6a756b656a692e636f6d2f7374617469632f746d732f736869656c642f7675652d726f757465722545352538392541462545362539432541432e706e67" alt="无法获取的图片"/>
  <img src="http://devtools.qiniu.com/qiniu.png" alt="七牛云默认图片"/>
  <img src="https://user-gold-cdn.xitu.io/2018/4/24/162f71d7977c8a3f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"/>
</div>`

const $ = cheerio.load(htmlstring, {
  decodeEntities: false
})

const promiseList = [];
const srcMap = {};
function downloadImg($) {
  $('img').each(function() {
    const src = $(this).attr('src');
    const desc = $(this).attr('alt') || $(this).attr('title') || '';

    const promise = uploadFromUrl(src, desc).then(({ respBody, respInfo }) => {
      if (respInfo.statusCode == 200) {
        srcMap[src] = respBody.key
      } else {
        console.log('respBody', respBody)
        srcMap[src] = '错误图片'
      }
    }, error => {
      srcMap[src] = '错误图片'
    })

    promiseList.push(promise);
  });
}

downloadImg($);
Promise.all(promiseList).then(data => {
  console.log('srcMap', srcMap)
})