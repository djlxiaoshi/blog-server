const timelineController = require('../controller/timeline/index');

module.exports = function (router) {

  // 获取时光轴
  router.get('/timelines', timelineController.getTimelines);

};
