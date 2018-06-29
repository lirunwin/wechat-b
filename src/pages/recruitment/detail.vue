<template lang="html">
  <div class="recruitment-detail container">
    <div class="recruitment-tab">
      <div class="row py-1 shadow-xs">
        <h5 class="col tab-item mb-0"
          :class="{ active: tab === 'plan' }"
          @click="tab = 'plan'">拟招募
        </h5>
        <h5 class="col tab-item mb-0"
          :class="{ active: tab === 'in' }"
          @click="tab = 'in'">已招募
        </h5>
        <h5 class="col tab-item mb-0"
          :class="{ active: tab === 'standBy' }"
          @click="tab = 'standBy'">待处理
        </h5>
      </div>
    </div>
    <div class="recruitment-plan pt-1" v-if="tab === 'plan'">
      <div class="row align-items-start size-3 font-weight-bold">
        <div class="col mb-0">{{recruitmentsDetail.title}}</div>
        <div class="col-auto mb-0">{{recruitmentsDetail.jobstatus}}</div>
      </div>
      <div class="row border-bottom py-1">
        <div class="col-12 text-danger size-2"><span class="size-4">{{recruitmentsDetail.wagebase}}</span>/天</div>
        <div class="col-12 text-muted size-1">发布时间: {{recruitmentsDetail.createtime}}</div>
      </div>
      <div class="row size-1 py-1">
        <div class="col-6 pr-0 text-truncate">工作性质:<span class="font-weight-bold">{{ recruitmentsDetail.jobnature }}</span></div>
        <div class="col-6 pr-0 text-truncate">招聘人数:<span class="font-weight-bold">{{ recruitmentsDetail.peoplenumber }}</span></div>
        <div class="col-6 pr-0 text-truncate">行业职位:<span class="font-weight-bold">{{ recruitmentsDetail.positionParentName }} > {{ recruitmentsDetail.positionName }}</span></div>
        <div class="col-6 pr-0 text-truncate">学历要求:<span class="font-weight-bold">{{ recruitmentsDetail.mineducation || '无'}}</span></div>
        <div class="col-6 pr-0 text-truncate">性别要求:<span class="font-weight-bold">{{ recruitmentsDetail.jobsex || '无' }}</span></div>
        <div class="col-6 pr-0 text-truncate">工资结算:<span class="font-weight-bold">{{ recruitmentsDetail.wageclearing }}</span></div>
        <div class="col-6 pr-0 text-truncate">工资模式:<span class="font-weight-bold">{{ recruitmentsDetail.wagemode }}</span></div>
        <div class="col-6 pr-0 text-truncate">工资范围:<span class="font-weight-bold">{{ recruitmentsDetail.wagebegin }} - {{ recruitmentsDetail.wageend }} 元/天</span></div>
        <div class="col-6 pr-0 text-truncate">提成工资:<span class="font-weight-bold">{{ recruitmentsDetail.wagecommission }} / 天</span></div>
        <div class="col-6 pr-0 text-truncate">结束时间:<span class="font-weight-bold">{{ recruitmentsDetail.endtime || '长期' }}</span></div>
        <div class="col-6 pr-0 text-truncate">工作时段:<span class="font-weight-bold">{{ recruitmentsDetail.jobPeriod }}</span></div>
        <div class="col-6 pr-0 text-truncate">工作地区:<span class="font-weight-bold">{{ recruitmentsDetail.provinceName + recruitmentsDetail.cityName}}</span></div>
        <div class="col-12">工作周期:<span class="font-weight-bold">{{ recruitmentsDetail.jobCycle }}</span></div>
        <div class="col-12">工作地址:<span class="font-weight-bold">{{ recruitmentsDetail.address }}</span></div>
      </div>
      <div class="row">
        <div class="col-12 detail-divider"></div>
        <div class="col-12 py-1 border-bottom font-weight-bold size-3">工作描述</div>
        <div class="col-12 py-1 size-2 detail-description">
          <div v-html="recruitmentsDetail.workdescription"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 detail-divider"></div>
        <div class="col-12 py-1 border-bottom font-weight-bold size-3">任职要求</div>
        <div class="col-12 py-1 size-2 detail-description">
          <div v-html="recruitmentsDetail.jobrequirements"></div>
        </div>
      </div>
      <div class="pt-4 mt-2"></div>
      <div class="detail-action container border-top">
        <div class="px-1 bg-white">
          <div class="row py-2">
            <div class="col">
              <div class="btn btn-primary btn-block">取消招募</div>
            </div>
            <div class="col">
              <div class="btn btn-primary btn-block active">修改招募</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="recruitment-in" v-if="tab === 'in'">
      <recruit :list="recruitList"></recruit>
    </div>
    <div class="recruitment-standby" v-if="tab === 'standBy'">
      <recruit :list="recruitList"></recruit>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Recruit from '@/components/Recruit';
export default {
  components: {
    Recruit
  },
  methods: {
    ...mapActions(['fetchRecruitmentDetail', 'fetchRecruitList'])
  },
  data: () => ({
    tab: 'in',
    recruitmentsDetail: {
      "id": "1525552634766998",
      "comid": "1525551681067221",
      "createuserid": "1525405461092662",
      "createtime": "2018-05-06",
      "lastupdatetime": 1528789834000,
      "title": "微商招代理宝妈白领创业投资首选",
      "positionid": "1525450579517701",
      "jobnature": "PARTTIME",
      "jobperiodbegin": 540,
      "jobperiodend": 960,
      "jobsex": null,
      "peoplenumber": 50,
      "recruitednumber": null,
      "mineducation": "初中/中专",
      "jobbegintime": "2018-05-06",
      "jobendtime": "3918-08-01",
      "provinceid": "51",
      "cityid": "5101",
      "countyid": "",
      "address": "AAAAA成都市武侯祠博物馆1212222",
      "longitude": 104.055837,
      "latitude": 30.652549,
      "endtime": null,
      "wageclearing": "MONTH",
      "wagebegin": 80,
      "wageend": 150,
      "wagemode": "BASEWAGE_COMMISSION",
      "wagegrant": "SELF",
      "commissionunit": "",
      "wagebase": 100,
      "wagecommission": 0,
      "jobstatus": "COMPLETED",
      "checkid": null,
      "workdescription": "工作地址：双流综合保税区\n报名编辑:编辑短信姓名+年龄+小时工到王老师手机上\n全程面试无任何中介费，欢迎求职者了解咨询！",
      "jobrequirements": "工作地址：双流综合保税区\n报名编辑:编辑短信姓名+年龄+小时工到王老师手机上\n全程面试无任何中介费，欢迎求职者了解咨询！",
      "positionName": "传单派发",
      "positionParentId": "1525450559750282",
      "positionParentName": "简单易做",
      "provinceName": "四川省",
      "cityName": "成都市",
      "countyName": null,
      "checkRemark": null,
      "jobPeriod": "05:40 - 09:60", //工作时段显示
      "jobCycle": "2018.5.6 - 3918.8.1", //兼职周期显示
      "collectionId": null,
      "deliveryStatus": null,
      "introduce": null,
      "companyInfo": null,
      "createTimeFmat": "2018-05-06",
      "commission": "",
      "sexName": "",
      "endTimeFmat": ""
    },
    recruitList: []
  }),
  mounted() {
    console.log(this.$route.query.id)
    this.fetchRecruitmentDetail({ id: '1525552633819762' });
    this.fetchRecruitList({
      "deliveryStatus": "WAIT_CONFIRM", //deliveryStatus：WAIT_CONFIRM（待处理）、AGREE（已招募）
      "recruitmentId": "1525552633587822", //招聘信息ID
      "pageIndex": "1",
      "pageSize": "10"
    });
  },
}
</script>

<style lang="scss">
@import "~@/styles/scss/common";

.recruitment-detail {
    background-color: $white;
    min-height: 100vh;
    .tab-item {
        text-align: center;
        font-weight: bold;
        &.active {
            color: map-get($secondary, color);
            position: relative;
            &::after {
                content: '';
                display: block;
                position: absolute;
                top: 80%;
                left: 0;
                width: 100%;
                padding-top: 10px;
                border-bottom: 3px solid map-get($secondary, color);
                transform-origin: center;
                transform: scaleX(0.2);
            }
        }
    }
    .detail-divider {
        padding-top: 10px;
        background-color: $color-gray;
    }
    .detail-description {
        color: $material-color-grey-700;
        font-weight: 350;
    }
    .detail-action {
        position: fixed;
        left: 0;
        bottom: 0;
    }
}
</style>
