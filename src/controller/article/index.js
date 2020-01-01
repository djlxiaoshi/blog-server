exports.getArticles = require('./getAll')
exports.getArticlesByUser = require('./getAllByUser')
exports.createArticle = require('./create')
exports.crawlArticle = require('./crawl')
exports.getOne = require('./getOne').getById;
exports.getOneByUser = require('./getOne').getOneByUser;
exports.updateArticle = require('./update')
exports.deleteArticle = require('./delete')
