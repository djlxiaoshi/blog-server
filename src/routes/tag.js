const tagController = require('../controller/tag/index');

module.exports = function (router) {

  // 获取所有标签列表
  router.get('/tags', tagController.getTagsList);

  // 新增标签
  router.post('/tag', tagController.createTag);

  // 更新标签
  router.put('/tag/:id', tagController.updateTag);

  // 删除标签
  router.delete('/tag/:id', tagController.deleteTag);

};
