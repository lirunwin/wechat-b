<template lang="html">
  <div class="container post">
    <div class="row mx-0 px-1">
      <div class="col-12 mb-1">
        <h5>标题</h5>
        <input-box placeholder="请输入标题" v-model="post.title" value="1"></input-box>
      </div>
      <div class="col-12 mb-1">
        <h5>职位类型</h5>
        <input-box placeholder="请输入标题名称" v-model="post.positionid"></input-box>
      </div>
      <div class="col-12 mb-1">
        <h5>工作性质</h5>
        <input-box placeholder="请输入工作性质" v-model="post.jobnature"></input-box>
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
            <input-box placeholder="请输入开始日期" v-model="post.jobCycle"></input-box>
          </div>
          <div class="col-auto">-</div>
          <div class="col">
            <input-box placeholder="请输入结束日期" v-model="post.jobCycle"></input-box>
          </div>
        </div>
      </div>
      <div class="col-12 mb-1">
        <h5>性别</h5>
        <radio-boxes :items="gender" v-model="selectGender"></radio-boxes>
      </div>
      <div class="col-12 mb-1">
        <h5>最低学历要求</h5>
        <input-box placeholder="请选择最低学历要求" v-model="post.education"></input-box>
      </div>
      <div class="col-12 mb-1">
        <h5>工作地址</h5>
        <input-box placeholder="请输入工作地址" v-model="post.address"></input-box>
      </div>
      <div class="col-12 mb-1">
        <h5>工作描述</h5>
        <input-box placeholder="请对工作进行描述" v-model="post.workdescription"></input-box>
      </div>
      <div class="col-12 mb-1">
        <h5>任职要求</h5>
        <input-box placeholder="请输入任职要求" v-model="post.jobrequirements"></input-box>
      </div>
      <div class="col-12 mb-1">
        <h5>工资结算</h5>
        <input-box placeholder="请输入工资结算" v-model="post.wageclearing"></input-box>
      </div>
      <div class="col-12 mb-1">
        <h5>工资模式</h5>
        <input-box placeholder="请输入工资模式" v-model="post.wagemode"></input-box>
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
        <input-box placeholder="请输入结束时间" v-model="post.endtime"></input-box>
      </div>
    </div>
    <div class="row mx-0 px-1 pt-1 pb-2">
      <div class="col pl-0">
        <div type="button" class="btn btn-primary btn-block">重置</div>
      </div>
      <div class="col pr-0">
        <div type="button" class="btn btn-primary btn-block active">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import InputBox from "@/components/InputBox";
import RadioBoxes from "@/components/RadioBoxes";
export default {
  components: {
    InputBox,
    RadioBoxes
  },
  data: () => ({
    gender: [
      { name: '无', value: 'NONE', checked: 'true' },
      { name: '男', value: 'MALE' },
      { name: '女', value: 'FAMALE' }
    ],
    selectGender: '',
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
  })
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
