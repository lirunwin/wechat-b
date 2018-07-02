const baseURL = 'https://local.sapi.s-cout.com/zcb-api/';
export default {
  baseURL,
  fileUploadUrl: `${baseURL}common/upload`,
  gender: [
    {name: '不限', value: 'NONE', checked: true},
    {name: '男', value: 'MALE'},
    {name: '女', value: 'FAMALE'}
  ],
  jobNatures: [
    {name: '兼职', value: 'PARTTIME'},
    {name: '实习', value: 'PRACTICE', disable: true}
  ],
  eduList: [
    {name: '不限学历', value: 'LEVEL_0'},
    {name: '博士及以上', value: 'LEVEL_7'},
    {name: '硕士研究生', value: 'LEVEL_6'},
    {name: '大学本科', value: 'LEVEL_5'},
    {name: '大学专科', value: 'LEVEL_4'},
    {name: '高中/高职', value: 'LEVEL_3'},
    {name: '初中/中专', value: 'LEVEL_2'},
    {name: '小学及小学以下', value: 'LEVEL_1'}
  ],
  wageClearing: [
    {name: '日结', value: 'DAY'},
    {name: '周结', value: 'WEEK'},
    {name: '月结', value: 'MONTH'}
  ],
  wageMode: [
    {name: '底薪+提成', value: 'BASEWAGE_COMMISSION'},
    {name: '底薪', value: 'BASEWAGE'},
    {name: '提成', value: 'COMMISSION'}
  ],
  jobStatus: [
    {name: '等待审核', value: 'NEW_RELEASE'},
    {name: '正在招募', value: 'CHECK_SUCCESSS'},
    {name: '审核不通过', value: 'CHECK_FAIL'},
    {name: '招募完成', value: 'COMPLETED'},
    {name: '已取消', value: 'CANCEL'}
  ],
  identityType: [
    {name: '学生', value: 'STUDENT'},
    { name: '非学生', value: 'OTHRE' },
  ],
  recruitmentStatus: [
    { name: '取消', value: 'CANCEL', label: 'CANCEL' },
    { name: '完成', value: 'COMPLETED', label: 'COMPLETED' },
  ],
  recruitmentApplyStatus: [
    { name: '拒绝', value: 'REFUSE', label: 'REJECT' },
    { name: '同意', value: 'AGREE', label: 'AGREE' },
  ],
  smsType: [
    { name: '注册', value: 'USER_REGISTER', label: 'SIGNUP' },
    { name: '登录', value: 'USER_LOGIN', label: 'SIGNIN' },
    { name: '重置密码', value: 'USER_REST_PWD', label: 'RESET' },
    { name: '修改手机号', value: 'USER_SETTEL', label: 'EDIT' }
  ],
  NoPosition: '请选择职位类型',
  NoJobNature: '请选择工作性质',
  NoTitle: '请填写标题',
  NoRecruitNum: '招聘人数需大于0',
  NoEduDegree: '请选择最低学历要求',
  WrongAddress: '地址有误',
  NoDescription: '描述不能为空',
  NoSalarySettlement: '请选择工资结算方式',
  NoSalaryPayWay: '请选择工资结算模式',
  WrongRange: '范围错误',
  WrongDeadline: '截止日期错误',
  regExp: {
    phone: /^1\d{10}$/
  },
  smsCountDown: 90,
  userKeyName: 'userKeyName',
};
