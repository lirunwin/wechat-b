module.exports = [
  {
    path: '/pages/user/signin',
    name: 'SignIn',
    config: {
      navigationBarTitleText: '请登录'
    }
  },
  {
    path: '/pages/user/signup',
    name: 'SignUp',
    config: {
      navigationBarTitleText: '注册'
    }
  },
  {
    path: '/pages/user/resetpwd',
    name: 'ResetPwd',
    config: {
      navigationBarTitleText: '修改密码'
    }
  },
  {
    path: '/pages/user/findpwd',
    name: 'FindPwd',
    config: {
      navigationBarTitleText: '找回密码'
      // enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/user/center',
    name: 'Center',
    config: {
      navigationBarTitleText: '账户信息'
    }
  }
];
