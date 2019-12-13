const nodemailer = require('nodemailer')
const config = require('../config/config')

const emailConfig = config.email

class EmailUtils {
  constructor(options = {}) {
    this.transporter = nodemailer.createTransport({
      ...emailConfig,
      ...options
    })
  }

  async sendEmail(options) {
    return await this.transporter.sendMail({
      from: options.from || '1281233206@qq.com', // sender address
      to: options.to.join(','), // list of receivers
      subject: options.subject || '这是来自DJL箫氏的博客的一封邮件', // Subject line
      text: options.content || '内容暂无', // plain text body
      html: options.content || '内容暂无' // html body
    })
  }
}

// async..await is not allowed in global scope, must use a wrapper
module.exports = EmailUtils
