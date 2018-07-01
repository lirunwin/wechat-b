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
      <div class="col-12 mb-1">
        <h5>工作性质</h5>
        <radio-boxes :items="jobNatures" v-model="post.jobnature"></radio-boxes>
      </div>
      <div class="col-12 mb-1">
        <h5>拟招聘人数</h5>
        <input-box placeholder="请输入拟招聘人数" v-model="post.peoplenumber" unit="/人" type="number"></input-box>
        <!-- 固定传一个兼职 -->
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
            <time-picker placeholder="请选择开始时间" v-model="jobTime.start"></time-picker>
          </div>
          <div class="col-auto">-</div>
          <div class="col">
            <time-picker placeholder="请选择结束时间" v-model="jobTime.end"></time-picker>
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
        <city-selector v-model="location"></city-selector>
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
        <selector v-model="post.wageclearing" returnValue :items="wageClearing" placeholder="请选择工资结算"></selector>
      </div>
      <div class="col-12 mb-1">
        <h5>工资模式</h5>
        <selector v-model="post.wagemode" returnValue :items="wageMode" placeholder="请选择工资模式"></selector>
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
      <div class="col pl-0">
        <div class="btn btn-primary btn-block shadow-sm">重置</div>
      </div>
      <div class="col pr-0">
        <div class="btn btn-primary btn-block active shadow-sm" @click="onSubmit">提交</div>
      </div>
    </div>
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
import constant from "@/constants";
import util from '@/utils/util';
import wx from '@/utils/wx';
import {
  mapActions,
  mapGetters
} from 'vuex';
export default {
  components: {
    InputBox,
    RadioBoxes,
    PositionSelector,
    DatePicker,
    TimePicker,
    Selector,
    CitySelector
  },
  data: () => ({
    gender: constant.gender,
    jobNatures: constant.jobNatures,
    eduList: constant.eduList,
    wageClearing: constant.wageClearing,
    wageMode: constant.wageMode,
    location: {},
    position: {},
    // jobNature: '',
    jobDate: {
      start: '',
      end: ''
    },
    jobTime: {
      start: '',
      end: ''
    },
    post: {
      title: "",
      positionParentId: "", //行业Id
      positionid: "", //职位Id
      jobnature: "", //信息类型，固定传：PRACTICE
      peoplenumber: "", //招聘人数
      jobCycle: "", //兼职周期，开始和结束，格式必须一样
      jobPeriod: "", //工作时段
      education: "", //学历信息，如果学历不限，保存时需删除该字段
      jobsex: "", //性别，如果性别不限，保存时需删除该字段
      wagegrant: "", //工资单位，固定传：SELF
      wageclearing: "", //工资结算
      wagemode: "", //工资模式
      wagebegin: "", //薪资范围 开始
      wageend: "", //薪资范围 结束
      wagebase: "", //基本工资
      wagecommission: "", //工资提成
      commissionunit: "", //提成单位（单/个）
      provinceid: "", //省id
      cityid: "", //城市id
      countyid: "", //区县
      address: "", //工作详细地址
      workdescription: "",
      jobrequirements: "",
      endtime: "" //招聘结束时间
    }
  }),
  computed: {
    jobCycle() {
      return `${this.jobDate.start} - ${this.jobDate.end}`
    },
    jobPeriod() {
      return `${this.jobTime.start} - ${this.jobTime.end}`
    },
    ...mapGetters(['recruitmentsDetails'])
  },
  methods: {
    ...mapActions(['saveRecruitment']),
    validate() {
      if (!this.post.title) {
        util.showToast('标题：' + constant.NoTitle);
        return false;
      }
      if (!this.position.positionid) {
        util.showToast('职位类型：' + constant.NoPosition);
        return false;
      }
      if (!this.post.jobnature) {
        util.showToast('工作性质：' + constant.NoJobNature);
        return false;
      }
      if (!this.post.peoplenumber) {
        util.showToast('招聘人数：' + constant.NoRecruitNum);
        return false;
      }
      if (this.jobDate.start.replace(/\D/g, '') >= this.jobDate.end.replace(/\D/g, '')) {
        util.showToast('工作周期：' + constant.WrongRange);
        return false;
      }
      if (this.jobTime.start.replace(/\D/g, '') >= this.jobTime.end.replace(/\D/g, '')) {
        util.showToast('工作时段：' + constant.WrongRange);
        return false;
      }
      if (!this.post.education) {
        util.showToast('招聘人数：' + constant.NoEduDegree);
        return false;
      }
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
      // if (!this.validate()) return;
      this.post.positionParentId = this.position.positionParentId;
      this.post.positionid = this.position.positionid;
      this.post.jobCycle = this.jobCycle;
      this.post.jobPeriod = this.jobPeriod;
      this.post.provinceid = this.location.province;
      this.post.cityid = this.location.city;
      this.post.countyid = this.location.county;

      this.post.wagegrant = 'SELF';
      this.post.commissionunit = '单';
      if (this.post.jobsex === 'NONE') {
        delete this.post.jobsex
      }
      if (this.post.education === 'LEVEL_0' || this.post.education === '') {
        delete this.post.education
      }
      console.log(JSON.stringify(this.post, null, 2));
      this.saveRecruitment(this.post);
    }
  },
  mounted() {
    let mode = this.$route.query.mode;
    if (mode !== 'edit') {
      wx.setNavigationBarTitle({
        title: '修改招聘信息'
      })
      // this.fetchRecruitmentDetail({ id: this.$route.query.id });
      // let detail = this.recruitmentsDetails.find(detail => detail.id = this.$route.query.id);
      let detail = {
        "id": "1525552632891189",
        "comid": "1525551681067221",
        "createuserid": "1525405461092662",
        "createtime": "2018-05-06",
        "lastupdatetime": 1525552633000,
        "title": "微商招代理宝妈白领创业投资首选",
        "positionid": "1525450582725634",
        "jobnature": "兼职",
        "jobperiodbegin": 540,
        "jobperiodend": 960,
        "jobsex": null,
        "peoplenumber": 20,
        "recruitednumber": null,
        "mineducation": "初中/中专",
        "jobbegintime": "2018-05-06",
        "jobendtime": "3918-08-01",
        "provinceid": "51",
        "cityid": "5101",
        "countyid": "510102",
        "address": "AAAAA成都市武侯祠博物馆1212222",
        "longitude": 104.055837,
        "latitude": 30.652549,
        "endtime": null,
        "wageclearing": "日结",
        "wagebegin": 80,
        "wageend": 150,
        "wagemode": "底薪+提成",
        "wagegrant": null,
        "commissionunit": null,
        "wagebase": 100,
        "wagecommission": 0,
        "jobstatus": "等待审核",
        "checkid": null,
        "workdescription": "工作地址：双流综合保税区\n报名编辑:编辑短信姓名+年龄+小时工到王老师手机上\n全程面试无任何中介费，欢迎求职者了解咨询！",
        "jobrequirements": "工作地址：双流综合保税区\n报名编辑:编辑短信姓名+年龄+小时工到王老师手机上\n全程面试无任何中介费，欢迎求职者了解咨询！",
        "positionName": "校园代理",
        "positionParentId": "1525450582631320",
        "positionParentName": "特色职位",
        "provinceName": "四川省",
        "cityName": "成都市",
        "countyName": null,
        "checkRemark": null,
        "jobPeriod": "05:40 - 09:60",
        "jobCycle": "2018.5.6 - 3918.8.1",
        "collectionId": null,
        "deliveryStatus": null,
        "introduce": null,
        "companyInfo": null,
        "commission": "",
        "sexName": "",
        "endTimeFmat": "",
        "createTimeFmat": "2018-05-06",
        "pid": "1525552632891189"
      }
      // console.log(JSON.stringify(detail, null, 2));
      this.position = {
        positionParentId: detail.positionParentId,
        positionid: detail.positionid
      }
      this.location = {
        province: detail.provinceid,
        city: detail.cityid,
        county: detail.countyid
      }
      console.log(12, this.location);
      let jobCycle = detail.jobCycle.split('-');
      this.jobDate = {
        start: jobCycle[0],
        end: jobCycle[1]
      }
      let jobPeriod = detail.jobPeriod.split('-');
      this.jobTime = {
        start: jobPeriod[0],
        end: jobPeriod[1]
      }
      this.post = detail;
      // console.log(JSON.stringify(this.position, null, 2));
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
