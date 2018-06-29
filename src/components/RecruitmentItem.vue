<template lang="html">
  <div class="row recruitment-list">
    <div class="col-12 py-1 border-top" v-for="item in list" :key="item.id" @click="navigageTo(item.id)">
      <div class="row align-items-start section-top">
        <div class="col">{{item.title}}</div>
        <div class="col-auto text-secondary">{{item.jobstatus}}</div>
      </div>
      <div class="row align-items-end section-middle">
        <div class="col text-muted">{{item.jobnature}} ︱ {{item.wageclearing}} ︱ {{item.wagebase}}元/天 </div>
        <div class="col-auto" v-if="item.waitCount">待处理
          <span class="font-weight-bold pl-1 size-3 text-secondary">{{item.waitCount}}</span>
        </div>
      </div>
      <div class="row align-items-end section-bottom">
        <div class="col text-muted">发布时间：{{item.createtime}}</div>
        <div class="col-auto font-weight-bold text-secondary">拟招募({{item.peoplenumber}}) ︱ 已招募({{item.recruitedCount ? item.recruitedCount : 0}})</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data: () => ({
    data: {
      "id": "1528359083448520",
      "comid": "1525551681067221",
      "createuserid": "1525405461092662",
      "createtime": "2018-06-07", //发布时间
      "lastupdatetime": "2018-06-12", //招聘结束时间
      "title": "淘宝天猫优惠劵代理 在家就赚钱", //标题
      "positionid": "1525450580822630",
      "jobnature": "PARTTIME",
      "jobperiodbegin": 900,
      "jobperiodend": 1800,
      "jobsex": null,
      "recruitednumber": null,
      "mineducation": 5,
      "jobbegintime": 1527782400000,
      "jobendtime": 1532966400000,
      "provinceid": "21",
      "cityid": "2102",
      "countyid": "210204",
      "address": "按照要求完成任务反馈客服可算后可领",
      "longitude": null,
      "latitude": null,
      "endtime": 1529625600000,
      "wageclearing": "DAY", //工资结算：DAY（日结),WEEK(周结),MONTH(月结）
      "wagebegin": 80,
      "wageend": 120,
      "wagemode": "BASEWAGE", //工资模式：BASEWAGE(固定工资),COMMISSION(业绩提成),BASEWAGE_COMMISSION(底薪加提成);
      "wagegrant": "SELF",
      "commissionunit": "单",
      "wagebase": 200, //基本工资
      "wagecommission": 0,
      "jobstatus": "CHECK_SUCCESSS", //状态
      "checkid": "1528377063075260",
      "positionName": "文员",
      "peoplenumber": 40, //拟招募人数
      "waitCount": null, //待处理简历数
      "recruitedCount": 3, //已招募人数
      "totalCount": 3, //总报名人数
      "jobStatusStr": null,
      "comName": "成都灵腾信息技术有限公司"
    }
  }),
  methods: {
    navigageTo(id) {
      // console.log(id);
      this.$router.push({ path: '/pages/recruitment/detail', query: { id } })
    }
  }

}
</script>

<style lang="scss">
@import "~@/styles/scss/common";

.recruitment-list {
    line-height: 1.375em;

    .section-top {
        font-size: $size-3;
    }
    .section-middle {
        font-size: $size-2;
    }
    .section-bottom {
        font-size: $size-1;
    }
}
</style>
