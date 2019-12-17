const HtmlToMarkdown = require('../utils/html-to-markdown')
const htmlParser = new HtmlToMarkdown()

const markdownStr = htmlParser.htmltomarkdown(
  '<div>这是一个<p>测试</p>，<a href="http://www.baidu.com">百度一下</a></div>'
)
console.log(markdownStr)
