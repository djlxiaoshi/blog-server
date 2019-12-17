const htmlparser2 = require('htmlparser2')

class HTMLParser {
  constructor(options) {
    this.options = options
  }
  htmltomarkdown(htmlString) {
    let markdownStr = ''
    const parser = new htmlparser2.Parser(
      {
        onopentag(name, attribs) {
          switch (name) {
            case 'p': {
              break
            }
            case 'a': {
              markdownStr += `[${attribs.alt || ''}](${attribs.href || ''})`
            }
            case 'img': {
              markdownStr += `![${attribs.alt || ''}](${attribs.src || ''})`
            }
            default: {
            }
          }
        },
        ontext(text) {
          markdownStr += text
        },
        onclosetag(name) {
          switch (name) {
            case 'p': {
              markdownStr += '\r\n'
              break
            }
            default: {
              markdownStr += ' '
            }
          }
        }
      },
      { decodeEntities: true }
    )
    parser.write(htmlString)
    parser.end()
    return markdownStr
  }

  html(htmlString) {
    let markdownStr = ''
    const parser = new htmlparser2.Parser(
      {
        onopentag(name, attribs) {
          markdownStr += `<${name}>`
        },
        onattribute(attribute, value) {},
        ontext(text) {
          markdownStr += text
        },
        onclosetag(name) {
          markdownStr += `</${name}>`
        }
      },
      { decodeEntities: true }
    )
    parser.write(htmlString)
    parser.end()
    return markdownStr
  }
}

module.exports = HTMLParser
