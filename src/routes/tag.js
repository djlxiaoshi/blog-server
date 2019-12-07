const tagController = require('../controller/tag/index');
const  { checkLogin }  = require('../middleware/check');

module.exports = function (router) {

  // 获取所有标签列表
  router.get('/tags', tagController.getAllTags);

  // 获取标签详情
  router.get('/tag/:id', tagController.getTagById);

  // 新增标签
  router.post('/tag', checkLogin, tagController.createTag);

  // 更新标签
  router.put('/tag/:id', checkLogin, tagController.updateTag);

  // 删除标签
  router.delete('/tag/:id', checkLogin, tagController.deleteTag);

};
