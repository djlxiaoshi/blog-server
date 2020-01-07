const ArticleModel = require('../../model/articleModel')
const axios = require('axios')
const cheerio = require('cheerio')
const TurndownService = require('turndown')
const { uploadFromUrl } = require('../../utils/upload')
const appConfig = require('../../config/config');
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
  const $content = getContent($, queryParams.template)
  const urlMap = await generateUrlMap($, $content);

  turndownService.addRule('my-img', {
    filter: 'img',
    replacement: function (content, node, options) {
      let src = node.getAttribute('src') || node.getAttribute('data-src')
      if (urlMap[src]) {
        src = `${appConfig.qiniu.previewHost}/${urlMap[src]}`
      }
      const desc = node.getAttribute('title') || node.getAttribute('alt') || ''
      if (src) {
        return`![${desc.trim()}](${src})`
      }
    }
  })

  let mrkdownContent = getMarkdownContent(
    $content.html()
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
      return $('article h1').eq(0).text() || '';
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

function getContent($, type) {
  type = type.toString()
  switch (type) {
    case '1': {
      // 掘金
      return $('.article-content')
    }
    case '2': {
      // Github
      return $('task-lists table .markdown-body')
    }
    case '3': {
      // 简书
      return $('article')
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

async function generateUrlMap($, $content) {
  const promiseList = [];
  const srcMap = {};
  $content.find('img').each(function() {
    const src = $(this).attr('src') || $(this).attr('data-src');
    const desc = $(this).attr('alt') || $(this).attr('title') || '';

    const promise = uploadFromUrl(src, desc).then(({ respBody, respInfo }) => {
      if (respInfo.statusCode == 200) {
        srcMap[src] = respBody.key
      } else {
        srcMap[src] = '错误图片'
      }
    }, error => {
      srcMap[src] = '错误图片'
    })

    promiseList.push(promise);
  });

  await Promise.all(promiseList);
  return srcMap;
}
