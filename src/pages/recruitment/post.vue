<template lang="html">
  <div class="container post">
    <div class="row mx-0 px-1">
      <div class="col-12 mb-1">
        <h5>标题</h5>
        <input-box placeholder="请输入标题" v-model="post.title" value="1"></input-box>
      </div>
      <div class="col-12 mb-1">
        <h5>职位类型</h5>
        <position-selector></position-selector>
        <!-- <input-box placeholder="请输入标题名称" v-model="post.positionid"></input-box> -->
      </div>
      <div class="col-12 mb-1">
        <h5>工作性质</h5>
        <radio-boxes :items="jobNatures" v-model="jobNature"></radio-boxes>
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
            <date-picker placeholder="请输入开始日期" v-model="jobDate.start"></date-picker>
          </div>
          <div class="col-auto">-</div>
          <div class="col">
            <date-picker placeholder="请输入结束日期" v-model="jobDate.end"></date-picker>
          </div>
        </div>
      </div>
      <div class="col-12 mb-1">
        <h5>性别</h5>
        <radio-boxes :items="gender" v-model="post.jobsex"></radio-boxes>
      </div>
      <div class="col-12 mb-1">
        <h5>最低学历要求</h5>
        <selector v-model="post.education" :items="eduList" placeholder="请选择最低学历要求"></selector>
      </div>
      <div class="col-12 mb-1">
        <h5>工作地址</h5>
        <city-selector></city-selector>
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
        <selector v-model="post.wageclearing" :items="wageClearing" placeholder="请选择工资结算"></selector>
      </div>
      <div class="col-12 mb-1">
        <h5>工资模式</h5>
        <selector v-model="post.wagemode" :items="wageMode" placeholder="请选择工资模式"></selector>
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
        <div class="btn btn-primary btn-block active shadow-sm">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import InputBox from "@/components/InputBox";
import RadioBoxes from "@/components/RadioBoxes";
import PositionSelector from "@/components/PositionSelector"
import DatePicker from "@/components/DatePicker";
import Selector from "@/components/Selector";
import CitySelector from "@/components/CitySelector";
import constant from "@/constants";
export default {
  components: {
    InputBox,
    RadioBoxes,
    PositionSelector,
    DatePicker,
    Selector,
    CitySelector
  },
  data: () => ({
    gender: constant.gender,
    jobNatures: constant.jobNatures,
    eduList: constant.eduList,
    wageClearing: constant.wageClearing,
    wageMode: constant.wageMode,
    jobNature: '',
    jobDate: {
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
