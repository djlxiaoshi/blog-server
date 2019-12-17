const ArticleModel = require('../../model/articleModel')
const axios = require('axios')
const cheerio = require('cheerio')
const h2m = require('h2m')
// 爬取文章
module.exports = async (ctx, next) => {
  const queryParams = ctx.query,
    user = ctx.session.user

  const response = await axios.get(queryParams.articleUrl)
  const html_string = response.data.toString()

  const $ = cheerio.load(html_string, {
    decodeEntities: false
  })

  const data = await ArticleModel.create({
    title: getTitle($),
    content: getMarkdownContent(getHtmlContent($)),
    status: 0, // 保存为草稿
    createUser: user._id,
    createTime: Date.now()
  })

  ctx.body = {
    code: 0,
    message: '文章爬取成功',
    data: data
  }
}

function getTitle($) {
  return $('.article-title').text()
}

function getHtmlContent($) {
  return $('.article-content').html()
}
function getMarkdownContent(html) {
  return h2m(html, {
    converter: 'MarkdownExtra',
    overides: {
      h1: function(node) {
        if (node.md) {
          return `\n# ${node.md}\n`
        }
      },
      h2: function(node) {
        if (node.md) {
          return `\n## ${node.md}\n`
        }
      },
      h3: function(node) {
        if (node.md) {
          return `\n### ${node.md}\n`
        }
      },
      h4: function(node) {
        if (node.md) {
          return `\n#### ${node.md}\n`
        }
      },
      h5: function(node) {
        if (node.md) {
          return `\n##### ${node.md}\n`
        }
      },
      h6: function(node) {
        if (node.md) {
          return `\n###### ${node.md}\n`
        }
      }
    }
  })
}
