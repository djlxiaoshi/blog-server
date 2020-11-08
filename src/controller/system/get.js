const SystemModel = require('../../model/systemModel')

exports.getAdminSystemConfig = async function (ctx, next) {
  const user = ctx.session.user

  try {
    const data = await SystemModel.findOne({})
    ctx.body = {
        code: 0,
        data: data,
        message: 'Success'
    } 
  } catch (error) {
    ctx.body = {
        code: -500,
        data: {},
        message: 'Server Error'
    }
  }
}

exports.getPortalSystemConfig = async (ctx, next) => {
    try {
      const portalConfig = await SystemModel.findOne({}).populate('portalUser');
      ctx.body = {
        code: 0,
        data: portalConfig,
        message: 'Success'
      };
    } catch (error) {
      ctx.body = {
        code: 0,
        data: {},
        message: 'Server Error'
      }
    }
  };
