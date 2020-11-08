exports.getUser = require('./getUser').getUser;
exports.getUserById = require('./getUser').getUserById;
exports.getAllUsers = require('./getUser').getAllUsers;
exports.getUserBy = require('./getUserBy').getUserBy;
exports.createUser = require('./createUser').createUser;
exports.createUserByAdmin = require('./createUser').createUserByAdmin;
exports.userLogin = require('./login').userLogin;
exports.userLogout = require('./logout').userLogout;
exports.userCheckLogin = require('./checkLogin').userCheckLogin;

// 更新相关
exports.uploadUserAvatar = require('./uploadUserAvatar').uploadUserAvatar;
exports.updateUser = require('./updateUser').updateUser;
exports.uploadUserAvatarTest = require('./uploadUserAvatarTest').uploadUserAvatarTest;
exports.changePortalUser = require('./updateUser').changePortalUser;
exports.updateUserByAdmin = require('./updateUser').updateUserByAdmin;


