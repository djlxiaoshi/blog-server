const ArticleModel = require('../../model/articleModel')
const axios = require('axios')
const cheerio = require('cheerio')
const TurndownService = require('turndown')

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
})

// 爬取文章
module.exports = async (ctx, next) => {
  const queryParams = ctx.query,
    user = ctx.session.user

  const response = await axios.get(queryParams.articleUrl)
  const html_string = response.data.toString()

  const $ = cheerio.load(html_string, {
    decodeEntities: false
  })

  const title = getTitle($, queryParams.template).trim()
  let mrkdownContent = getMarkdownContent(
    getContentHtml($, queryParams.template)
  )
  mrkdownContent = addReprintMarker(
    title,
    queryParams.articleUrl,
    mrkdownContent
  )

  try {
    const data = await ArticleModel.create({
      title: title,
      content: mrkdownContent,
      status: 0, // 保存为草稿
      createUser: user._id,
      createTime: Date.now()
    })

    ctx.body = {
      code: 0,
      message: '文章爬取成功',
      data: data
    }
  } catch (error) {
    ctx.body = {
      code: -1005,
      message: '文章解析失败',
      error: error
    }
  }
}

function getTitle($, type) {
  type = type.toString()
  switch (type) {
    case '1': {
      // 掘金
      return $('.article-title').text()
    }
    case '2': {
      // Github
      return $('.gh-header-title .js-issue-title').text()
    }
    case '3': {
      // 简书
      return $('h1')
        .eq(0)
        .text()
    }
  }
}

function getContentHtml($, type) {
  type = type.toString()
  switch (type) {
    case '1': {
      // 掘金
      return $('.article-content').html()
    }
    case '2': {
      // Github
      return $('task-lists table .markdown-body').html()
    }
    case '3': {
      // 简书
      return $('article').html()
    }
  }
}

function addReprintMarker(title, url, markdownContent) {
  const reprintMarker = `\n> ##### 转载自[${title}](${url})\n\r`
  return reprintMarker + markdownContent
}

function getMarkdownContent(html) {
  return turndownService.turndown(html)
}
