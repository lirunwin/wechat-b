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
    path: '/pages/user/changepwd',
    name: 'ChangePwd',
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
  },
  {
    path: '/pages/recruitment/post',
    name: 'PostRecuitmentInfo',
    config: {
      navigationBarTitleText: '发布招聘信息'
    }
  },
  {
    path: '/pages/recruitment/index',
    name: 'RecuitmentList',
    config: {
      navigationBarTitleText: '招聘信息',
      enablePullDownRefresh: true,
    }
  },
  {
    path: '/pages/recruitment/detail',
    name: 'PostRecuitmentDetail',
    config: {
      navigationBarTitleText: '招聘详情',
      enablePullDownRefresh: true,
    }
  },
  {
    path: '/pages/recruitment/test',
    name: 'PostRecuitmentDetail',
    config: {
      navigationBarTitleText: 'test',
      enablePullDownRefresh: true,
    }
  }
];
