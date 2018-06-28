export default {
  gender: [
    { name: '不限', value: 'NONE', checked: 'true' },
    { name: '男', value: 'MALE' },
    { name: '女', value: 'FAMALE' }
  ],
  jobNatures: [
    { name: '兼职', value: 'PARTTIME', checked: true },
    { name: '实习', value: 'PRACTICE', disable: true }
  ],
  eduList: [
    { name: '不限学历', value: 'LEVEL_0' },
    { name: '博士及以上', value: 'LEVEL_7' },
    { name: '硕士研究生', value: 'LEVEL_6' },
    { name: '大学本科', value: 'LEVEL_5' },
    { name: '大学专科', value: 'LEVEL_4' },
    { name: '高中/高职', value: 'LEVEL_3' },
    { name: '初中/中专', value: 'LEVEL_2' },
    { name: '小学及小学以下', value: 'LEVEL_1' }
  ],
  wageClearing: [
    { name: '日结', value: 'DAY' },
    { name: '周结', value: 'WEEK' },
    { name: '月结', value: 'MONTH' }
  ],
  wageMode: [
    { name: '底薪+提成', value: 'BASEWAGE_COMMISSION' },
    { name: '底薪', value: 'BASEWAGE' },
    { name: '提成', value: 'COMMISSION' }
  ]
}
