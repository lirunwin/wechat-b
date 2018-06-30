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
    <div class="recruitment-plan pt-1" v-if="tab === 'plan' && recruitmentDetail">
      <div class="row align-items-start size-3 font-weight-bold">
        <div class="col mb-0">{{recruitmentDetail.title}}</div>
        <div class="col-auto mb-0">{{recruitmentDetail.jobstatus}}</div>
      </div>
      <div class="row border-bottom py-1">
        <div class="col-12 text-danger size-2"><span class="size-4">{{recruitmentDetail.wagebase}}</span>/天</div>
        <div class="col-12 text-muted size-1">发布时间: {{recruitmentDetail.createtime}}</div>
      </div>
      <div class="row size-1 py-1">
        <div class="col-6 pr-0 text-truncate">工作性质:<span class="font-weight-bold">{{ recruitmentDetail.jobnature }}</span></div>
        <div class="col-6 pr-0 text-truncate">招聘人数:<span class="font-weight-bold">{{ recruitmentDetail.peoplenumber }}</span></div>
        <div class="col-6 pr-0 text-truncate">行业职位:<span class="font-weight-bold">{{ recruitmentDetail.positionParentName }} > {{ recruitmentDetail.positionName }}</span></div>
        <div class="col-6 pr-0 text-truncate">学历要求:<span class="font-weight-bold">{{ recruitmentDetail.mineducation || '无'}}</span></div>
        <div class="col-6 pr-0 text-truncate">性别要求:<span class="font-weight-bold">{{ recruitmentDetail.sexName || '无' }}</span></div>
        <div class="col-6 pr-0 text-truncate">工资结算:<span class="font-weight-bold">{{ recruitmentDetail.wageclearing }}</span></div>
        <div class="col-6 pr-0 text-truncate">工资模式:<span class="font-weight-bold">{{ recruitmentDetail.wagemode }}</span></div>
        <div class="col-6 pr-0 text-truncate">工资范围:<span class="font-weight-bold">{{ recruitmentDetail.wagebegin }} - {{ recruitmentDetail.wageend }} 元/天</span></div>
        <div class="col-6 pr-0 text-truncate">提成工资:<span class="font-weight-bold">{{ recruitmentDetail.wagecommission }} / 天</span></div>
        <div class="col-6 pr-0 text-truncate">结束时间:<span class="font-weight-bold">{{ recruitmentDetail.endtime || '长期' }}</span></div>
        <div class="col-6 pr-0 text-truncate">工作时段:<span class="font-weight-bold">{{ recruitmentDetail.jobPeriod }}</span></div>
        <div class="col-6 pr-0 text-truncate">工作地区:<span class="font-weight-bold">{{ recruitmentDetail.provinceName + recruitmentDetail.cityName}}</span></div>
        <div class="col-12">工作周期:<span class="font-weight-bold">{{ recruitmentDetail.jobCycle }}</span></div>
        <div class="col-12">工作地址:<span class="font-weight-bold">{{ recruitmentDetail.address }}</span></div>
      </div>
      <div class="row">
        <div class="col-12 detail-divider"></div>
        <div class="col-12 py-1 border-bottom font-weight-bold size-3">工作描述</div>
        <div class="col-12 py-1 size-2 detail-description">
          <div v-html="recruitmentDetail.workdescription"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 detail-divider"></div>
        <div class="col-12 py-1 border-bottom font-weight-bold size-3">任职要求</div>
        <div class="col-12 py-1 size-2 detail-description">
          <div v-html="recruitmentDetail.jobrequirements"></div>
        </div>
      </div>
      <div class="pt-4 mt-2"></div>
      <div class="detail-action container border-top">
        <div class="px-1 bg-white">
          <div class="row py-2">
            <div class="col">
              <div class="btn btn-primary btn-block" @click="onCancelRecruitment">取消招募</div>
            </div>
            <div class="col">
              <div class="btn btn-primary btn-block active">修改招募</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="recruitment-in" v-if="tab === 'in'">
      <recruit :recruits="confirmed" @refresh="refresh"></recruit>
    </div>
    <div class="recruitment-standby" v-if="tab === 'standBy'">
      <recruit :recruits="standBy" action @refresh="refresh"></recruit>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Recruit from '@/components/Recruit';
import wx from '@/utils/wx';
export default {
  components: {
    Recruit
  },
  data: () => ({
    tab: 'plan',
    id: '没有'
  }),
  computed: {
    ...mapGetters(['recruitmentsDetails', 'standByRecruits', 'confirmedRecruits']),
    recruitmentDetail() {
      return this.recruitmentsDetails.find(detail => detail.pid === this.id)
    },
    standBy() {
      let recruits = this.standByRecruits.find(recruit => recruit.recruitmentId === this.id);
      return recruits ? recruits.list : []
    },
    confirmed() {
      let recruits = this.confirmedRecruits.find(recruit => recruit.recruitmentId === this.id);
      return recruits ? recruits.list : []
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getDetail();
    this.getStandBy();
    this.getConfirmed();
  },
  methods: {
    ...mapActions(['fetchRecruitmentDetail', 'fetchStandByRecruits', 'fetchConfirmedRecruits', 'cancelRecruitment']),
    ...mapMutations(['resetRecruitmentState']),
    getDetail() {
      this.fetchRecruitmentDetail({ id: this.id });
    },
    getStandBy() {
      this.fetchStandByRecruits({
        "deliveryStatus": "WAIT_CONFIRM", //deliveryStatus：WAIT_CONFIRM（待处理）、AGREE（已招募）
        "recruitmentId": this.id, //招聘信息ID
        "pageIndex": "1",
        "pageSize": "999"
      });
    },
    getConfirmed() {
      this.fetchConfirmedRecruits({
        "deliveryStatus": "AGREE", //deliveryStatus：WAIT_CONFIRM（待处理）、AGREE（已招募）
        "recruitmentId": this.id, //招聘信息ID
        "pageIndex": "1",
        "pageSize": "999"
      });
    },
    onCancelRecruitment() {
      this.cancelRecruitment(this.id)
        .then(() => {
          setTimeout(() => {
            this.$router.go()
          }, 2000);
        });
    },
    refresh() {
      Promise.all([
        this.resetRecruitmentState(),
        this.getDetail(),
        this.getStandBy(),
        this.getConfirmed()
      ])
        .then(() => wx.stopPullDownRefresh())
    }
  },
  onPullDownRefresh() {
    this.refresh();
  },
  onReachBottom() {
    // this.loadMore();
  }
}
</script>

<style lang="scss">
@import "~@/styles/scss/common";

.recruitment-detail {
    background-color: $white;
    min-height: 100vh;
    .tab-item {
        text-align: center;
        font-weight: 400;
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
