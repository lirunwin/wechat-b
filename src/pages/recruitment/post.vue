<template lang="html">
  <div class="container post">
    <div class="row mx-0 px-1">
      <div class="col-12 mb-1">
        <h5>标题</h5>
        <input-box placeholder="请输入标题" v-model="post.title" value="1"></input-box>
      </div>
      <div class="col-12 mb-1">
        <h5>职位类型</h5>
        <position-selector v-model="position"></position-selector>
      </div>
      <div class="col-12 mb-1 sr-only">
        <h5>工作性质</h5>
        <radio-boxes :items="jobNatures" v-model="post.jobnature" returnValue></radio-boxes>
      </div>
      <div class="col-12 mb-1">
        <h5>拟招聘人数</h5>
        <input-box placeholder="请输入拟招聘人数" v-model="post.peoplenumber" unit="/人" type="number" maxlength="3"></input-box>
      </div>
      <div class="col-12 mb-1">
        <h5>工作周期</h5>
        <div class="row align-items-center">
          <div class="col">
            <date-picker placeholder="请选择开始日期" v-model="jobDate.start" :appendZero="false" format="yyyy.MM.dd"></date-picker>
          </div>
          <div class="col-auto">-</div>
          <div class="col">
            <date-picker placeholder="请选择结束日期" v-model="jobDate.end" :appendZero="false" format="yyyy.MM.dd"></date-picker>
          </div>
        </div>
      </div>
      <div class="col-12 mb-1">
        <h5>工作时段</h5>
        <div class="row align-items-center">
          <div class="col">
            <time-picker placeholder="请选择开始时间" v-model="jobTime.start" :defaultValue="defaultTime.start"></time-picker>
          </div>
          <div class="col-auto">-</div>
          <div class="col">
            <time-picker placeholder="请选择结束时间" v-model="jobTime.end" :defaultValue="defaultTime.end"></time-picker>
          </div>
        </div>
      </div>
      <div class="col-12 mb-1">
        <h5>性别</h5>
        <radio-boxes :items="gender" v-model="post.jobsex"></radio-boxes>
      </div>
      <div class="col-12 mb-1">
        <h5>最低学历要求</h5>
        <selector v-model="post.education" returnValue :items="eduList" placeholder="请选择最低学历要求"></selector>
      </div>
      <div class="col-12 mb-1">
        <h5>工作地址</h5>
        <city-selector v-model="location" :defaultLocation="defaultLocation"></city-selector>
        <div class="pb-1"></div>
        <input-box placeholder="请输入工作地址" v-model="post.address"></input-box>
      </div>
      <div class="col-12 mb-1">
        <h5>工作描述</h5>
        <div class="row">
          <div class="col-12 px-0">
            <textarea placeholder="请对工作进行描述" v-model="post.workdescription"></textarea>
          </div>
        </div>
      </div>
      <div class="col-12 mb-1">
        <h5>任职要求</h5>
        <div class="row">
          <div class="col-12 px-0">
            <textarea placeholder="请输入任职要求" v-model="post.jobrequirements"></textarea>
          </div>
        </div>
      </div>
      <div class="col-12 mb-1">
        <h5>工资结算</h5>
        <selector v-model="post.wageclearing" returnValue :items="wageClearing" returnValue placeholder="请选择工资结算"></selector>
      </div>
      <div class="col-12 mb-1">
        <h5>工资模式</h5>
        <selector v-model="post.wagemode" returnValue :items="wageMode" returnValue placeholder="请选择工资模式"></selector>
      </div>
      <div class="col-12 mb-1">
        <h5>工资范围</h5>
        <div class="row align-items-center">
          <div class="col">
          <input-box placeholder="请输入" v-model="post.wagebegin" unit="元/天" type="number"></input-box>
          </div>
          <div class="col-auto">-</div>
          <div class="col">
          <input-box placeholder="请输入" v-model="post.wageend" unit="元/天" type="number"></input-box>
          </div>
        </div>
      </div>
      <div class="col-12 mb-1">
        <h5>基本工资</h5>
        <input-box placeholder="请输入基本工资" v-model="post.wagebase" unit="元/天" type="number"></input-box>
      </div>
      <div class="col-12 mb-1">
        <h5>工资提成</h5>
        <input-box placeholder="请输入工资提成" v-model="post.wagecommission"  unit="元/单" type="number"></input-box>
      </div>
      <div class="col-12 mb-1">
        <h5>结束时间</h5>
        <date-picker placeholder="请输入结束日期" v-model="post.endtime"></date-picker>
      </div>
    </div>
    <div class="row mx-0 px-1 pt-1 pb-2">
      <!-- <div class="col pl-0" v-if="mode !== 'edit'">
        <div class="btn btn-primary btn-block">重置</div>
      </div>
      <div class="col" :class="{ 'px-0': mode === 'edit', 'pr-0': mode !== 'edit' }">
        <div class="btn btn-primary btn-block active" @click="onSubmit">提交</div>
      </div> -->
      <div class="col px-0">
        <div class="btn btn-primary btn-block active" @click="onSubmit">提交</div>
      </div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import InputBox from "@/components/InputBox";
import RadioBoxes from "@/components/RadioBoxes";
import PositionSelector from "@/components/PositionSelector"
import DatePicker from "@/components/DatePicker";
import TimePicker from "@/components/TimePicker";
import Selector from "@/components/Selector";
import CitySelector from "@/components/CitySelector";
import TabBar from '@/components/TabBar';
import constant from "@/constants";
import util from '@/utils/util';
import wx from '@/utils/wx';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    InputBox,
    RadioBoxes,
    PositionSelector,
    DatePicker,
    TimePicker,
    Selector,
    CitySelector,
    TabBar
  },
  data: () => ({
    gender: constant.gender,
    jobNatures: constant.jobNatures,
    eduList: constant.eduList,
    wageClearing: constant.wageClearing,
    wageMode: constant.wageMode,
    location: {},
    defaultLocation: {},
    position: {},
    jobDate: {
      start: '',
      end: ''
    },
    jobTime: {},
    defaultTime: {
      start: '09:00',
      end: '18:00'
    },
    post: {}
  }),
  computed: {
    ...mapGetters(['recruitmentsDetails'])
  },
  methods: {
    ...mapActions(['saveRecruitment', 'fetchRecruitmentDetail']),
    validate() {
      if (!this.post.title) {
        util.showToast('标题：' + constant.NoTitle);
        return false;
      }
      if (!this.position.positionid) {
        util.showToast('职位类型：' + constant.NoPosition);
        return false;
      }
      // if (!this.post.jobnature) {
      //   util.showToast('工作性质：' + constant.NoJobNature);
      //   return false;
      // }
      if (!this.post.peoplenumber) {
        util.showToast('招聘人数：' + constant.NoRecruitNum);
        return false;
      }
      // if (this.jobDate.start.replace(/\D/g, '') >= this.jobDate.end.replace(/\D/g, '')) {
      //   util.showToast('工作周期：' + constant.WrongRange);
      //   return false;
      // }
      // if (this.jobTime.start.replace(/\D/g, '') >= this.jobTime.end.replace(/\D/g, '')) {
      //   util.showToast('工作时段：' + constant.WrongRange);
      //   return false;
      // }
      // if (!this.post.education) {
      //   util.showToast('学历要求：' + constant.NoEduDegree);
      //   return false;
      // }
      if (!this.location.county || !this.post.address) {
        util.showToast('工作地址：' + constant.WrongAddress);
        return false;
      }
      if (!this.post.workdescription) {
        util.showToast('工作描述：' + constant.NoDescription);
        return false;
      }
      if (!this.post.jobrequirements) {
        util.showToast('任职要求：' + constant.NoDescription);
        return false;
      }
      if (!this.post.wageclearing) {
        util.showToast('工资结算：' + constant.NoSalarySettlement);
        return false;
      }
      if (!this.post.wagemode) {
        util.showToast('工资模式：' + constant.NoSalaryPayWay);
        return false;
      }
      if (!this.post.wagebegin || !this.post.wageend) {
        util.showToast('工资范围：' + constant.WrongRange);
        return false;
      }
      if (this.post.wagebegin === '' || this.post.wageend === '' || this.post.wagebegin > this.post.wageend) {
        util.showToast('工资：' + constant.WrongRange);
        return false;
      }
      if (!this.post.endtime || this.post.endtime === util.formatTime(new Date())) {
        util.showToast('招聘结束时间：' + constant.WrongDeadline);
        return false;
      }
      return true;
    },
    onSubmit() {
      console.log(this.post);
      if (!this.validate()) return;
      this.post.positionParentId = this.position.positionParentId;
      this.post.positionid = this.position.positionid;
      this.post.jobPeriod = `${this.jobTime.start} - ${this.jobTime.end}`;
      this.post.jobCycle = `${this.jobDate.start} - ${this.jobDate.end}`;
      this.post.provinceid = this.location.province;
      this.post.cityid = this.location.city;
      this.post.countyid = this.location.county;

      this.post.wagegrant = 'SELF';
      this.post.commissionunit = '单';
      this.post.jobnature = "PARTTIME";

      if (this.post.jobsex === 'NONE') {
        delete this.post.jobsex
      }
      if (this.post.education === 'LEVEL_0' || this.post.education === '') {
        delete this.post.education
      }
      this.saveRecruitment(this.post)
        .then(res => {
          this.resetData();
          util.showToast(res.msg || '操作成功');
          setTimeout(() => {
            this.$router.replace({ path: '/pages/recruitment/index' })
          }, 1000)
        });
    },
    resetData() {
      this.gender = constant.gender,
        this.jobNatures = constant.jobNatures,
        this.eduList = constant.eduList,
        this.wageClearin = constant.wageClearing,
        this.wageMode = constant.wageMode,
        this.location = {
          province: -1,
          city: -1,
          county: 1
        },
        this.defaultLocation = {
          province: -1,
          city: -1,
          county: -1
        },
        this.position = {},
        this.jobDate = {
          start: '',
          end: ''
        },
        this.jobTime = {
          start: '',
          end: ''
        },
        this.defaultTime = {
          start: '09:00',
          end: '18:00'
        },
        this.post = {}
    },
    getDefaultDate() {
      if (this.$route.query.mode === 'edit') {
        let id = this.$route.query.id;
        if (!id) return;
        wx.setNavigationBarTitle({
          title: '修改招聘信息'
        })
        this.resetData();
        this.fetchRecruitmentDetail({ id })
          .then(detail => {
            this.jobNatures = this.jobNatures.map(nature => {
              if (nature.value === detail.jobnature || nature.name === detail.jobnature) {
                nature.checked = true
              } else {
                delete nature.checked
              }
              return nature;
            });
            this.genter ? '' : this.gender = this.gender.map(gender => {
              if (gender.value === detail.jobsex || gender.name === detail.jobsex || !detail.jobsex) {
                gender.checked = true
              } else {
                delete gender.checked
              }
              return gender;
            });
            this.position = {
              positionParentId: detail.positionParentId,
              positionid: detail.positionid
            }
            this.defaultLocation = {
              province: detail.provinceid,
              city: detail.cityid,
              county: detail.countyid
            }
            let jobCycle = detail.jobCycle.split('-');
            this.jobDate = {
              start: jobCycle[0].trim(),
              end: jobCycle[1].trim()
            }
            let jobPeriod = detail.jobPeriod.split('-');
            this.jobTime = {
              start: jobPeriod[0].trim(),
              end: jobPeriod[1].trim()
            }
            this.post = detail;
            // console.log(JSON.stringify(detail, null, 2));
          });
      }
    }
  },
  onShow() {
    this.getDefaultDate();
  },
  computed: {
    mode() {
      return this.$route.query.mode;
    }
  }
};
</script>

<style lang="scss">
Page {
    background-color: #ffffff;
}
.post {
    h5 {
        margin-left: -15px;
        margin-bottom: 5px;
    }
}
radio {}
</style>
