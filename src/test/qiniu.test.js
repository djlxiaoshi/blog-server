const { uploadFromUrl } = require('../utils/upload.js');
const dayjs = require('dayjs');

// uploadFromUrl('https://user-gold-cdn.xitu.io/2018/4/24/162f71d7977c8a3f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1', 'qiniu-test').then(({ respBody, respInfo }) => {
//   if (respInfo.statusCode == 200) {
//     console.log(respBody.key);
//     console.log(respBody.hash);
//     console.log(respBody.fsize);
//     console.log(respBody.mimeType);
//   } else {
//     console.log(respInfo.statusCode);
//     console.log(respBody);
//   }
// }, error => {
//   console.log(error)
// })

console.log()