const TagModel = require('../../model/tagModel');

exports.getTagById = async (ctx, next) => {
  const pathParams = ctx.params; // 获取路径参数

  let data = await TagModel.findById(pathParams.id);

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};

exports.getAll = async (ctx, next) => {
  const params = ctx.query,
    pageSize = parseInt(params.pageSize),
    currentPage = parseInt(params.currentPage),
    skipCount = (currentPage - 1) * pageSize;

  if (pageSize && currentPage) {
    const result = await Promise.all([
      TagModel.countDocuments({}),
      TagModel.find({}).skip(skipCount).limit(pageSize).populate('createUser')
    ]);

    ctx.body = {
      code: 0,
      message: 'success',
      data: {
        total: result[0],
        list: result[1]
      }
    };
  } else {
    const data = await TagModel.find({});


    ctx.body = {
      code: 0,
      message: 'success',
      data: data
    };
  }
};

exports.getAllTagsByUser = async (ctx, next) => {
  const user = ctx.session.user;
  const params = ctx.query,
    pageSize = parseInt(params.pageSize),
    currentPage = parseInt(params.currentPage),
    skipCount = (currentPage - 1) * pageSize;

  if (pageSize && currentPage) {
    const result = await Promise.all([
      TagModel.countDocuments({
        createUser: user._id
      }),
      TagModel.find({
        createUser: user._id
      }).skip(skipCount).limit(pageSize).populate('createUser')
    ]);

    ctx.body = {
      code: 0,
      message: 'success',
      data: {
        total: result[0],
        list: result[1]
      }
    };
  } else {
    const data = await TagModel.find({
      createUser: user._id
    });


    ctx.body = {
      code: 0,
      message: 'success',
      data: data
    };
  }
};

