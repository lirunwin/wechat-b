<template lang="html">
  <div class="signup container" v-if="step !== 0">
    <div class="step">
      <ul>
        <li :class="{active: step === 1}">
          <span>1</span>
          <div>手机验证</div>
        </li>
        <li :class="{active: step === 2}">
          <span>2</span>
          <div>企业基本信息</div>
        </li>
        <li :class="{active: step === 3}">
          <span>3</span>
          <div>后台验证</div>
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="col-12 step1" v-if="step === 1">
       <div class="card bg-white shadow-none px-2 pt-2 mb-1">
         <div class="card-body">
           <div class="row">
             <div class="col-12 mb-1">
               <input-box v-model.lazy="user.tel" placeholder="手机号码" maxlength="11"></input-box>
             </div>
             <div class="col-12 mb-1">
               <sms-box v-model="user.veryCode"
                 placeholder="验证码"
                 :sms="true"
                 smsType="SIGNUP"
                 :tel="user.tel"
                 type="number"
                 maxlength="6"></sms-box>
             </div>
             <div class="col-12 mb-1">
               <input-box v-model.lazy="user.password" placeholder="密码" type="password" maxlength="30"></input-box>
             </div>
             <div class="col-12 mb-1">
               <input-box v-model.lazy="user.rePassword" placeholder="确认密码" type="password" maxlength="30"></input-box>
             </div>
           </div>
         </div>
         <div class="card-actions px-0">
           <button type="submit" class="btn btn-primary btn-block mr-0" href="#"
             @click="onSignUp">立即注册</button>
         </div>
         <div class="divider"></div>
         <h5 class="text-primary text-center mb-3" @click="$router.back()">已有账号?立即登录</h5>
       </div>
     </div>
      <div class="col-12 step2" v-if="step === 2">
        <div class="card bg-white shadow-none px-2 pt-2 mb-2">
          <div class="card-body">
            <div class="row">
              <div class="col-12 mb-1">
                <h5>企业名称</h5>
                <input-box v-model.lazy="company.comname" placeholder="企业名称"></input-box>
              </div>
              <div class="col-12 mb-1">
                <h5>联系人</h5>
                <input-box v-model.lazy="company.contactsname" placeholder="请输入联系人姓名" maxlength="6"></input-box>
              </div>
              <div class="col-12 mb-1">
                <h5>联系电话</h5>
                <input-box v-model.lazy="company.contactstel" placeholder="请输入联系人电话" type="number" maxlength="30"></input-box>
              </div>
              <div class="col-12 mb-1">
                <h5>E-mail</h5>
                <input-box v-model.lazy="company.comemial" placeholder="请输入E-mail"></input-box>
              </div>
              <div class="col-12 mb-1">
                <h5>公司电话</h5>
                <input-box v-model.lazy="company.officephone" placeholder="请输入公司电话" type="number" maxlength="12"></input-box>
              </div>
              <div class="col-12 mb-1">
                <h5>公司地址</h5>
                <city-selector v-model="location"></city-selector>
                <div class="pt-1">
                  <input-box v-model.lazy="company.address" placeholder="请输入详细地址"></input-box>
                </div>
              </div>
              <div class="col-12 mb-1">
                <h5>营业执照(必须上传)</h5>
                <image-uploader v-model="company.businesslicensefile"></image-uploader>
              </div>
              <div class="col-12 mb-1">
                <h5>公司简介</h5>
                <div class="row">
                  <div class="col px-0">
                    <textarea placeholder="公司简介" v-model="company.introduce"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-actions px-0 mb-3">
            <button type="submit" class="btn btn-primary btn-block mr-0" href="#"
              @click="onSaveCompany">立即提交</button>
          </div>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
import InputBox from '@/components/InputBox';
import SmsBox from '@/components/SmsBox';
import CitySelector from '@/components/CitySelector';
import ImageUploader from '@/components/ImageUploader';
import constant from '@/constants';
import util from '@/utils/util';
import { mapActions } from 'vuex';
export default {
  components: {
    InputBox,
    SmsBox,
    CitySelector,
    ImageUploader
  },
  data: () => ({
    step: 0,
    user: {
      tel: '',
      veryCode: '',
      password: '',
      rePassword: '',
      identityType: '',
      recommendUserId: ''
    },
    company: {},
    location: {}
  }),
  methods: {
    ...mapActions(['signUp', 'updateUserInfo', 'getUserInfo']),
    onSignUp() {
      if (this.user.tel === '') {
        util.showToast('电话号码不能为空');
        return;
      }
      if (!constant.regExp.phone.test(this.user.tel)) {
        util.showToast('电话号码有误');
        return;
      }
      if (this.user.veryCode == '') {
        util.showToast('验证码不能为空');
        return;
      }
      if (this.user.password !== this.user.rePassword) {
        util.showToast('密码输入不相同');
        return;
      }
      if (this.checkSignUpForm) {
        if (this.company.tel === '') {
          util.showToast('电话号码不能为空');
          return;
        }
        this.signUp({
            tel: this.user.tel, //手机号
            password: this.user.password, //密码
            veryCode: this.user.veryCode, //手机验证码
          })
          .then(res => {
            this.$store.commit('logedIn');
            wx.setStorageSync(constant.userKeyName, res.data || res);
            this.$router.replace({ path: '/pages/user/signup', query: { step: 2 } });
          });
      }
    },
    onSaveCompany() {
      if (this.checkCompany()) {
        setTimeout(() => {
          this.company.provinceid = this.location.province;
          this.company.cityid = this.location.city;
          this.company.countyid = this.location.county;
          this.updateUserInfo(this.company)
            .then(res => {
              util.showToast('操作成功');
              setTimeout(() => {
                this.$router.replace({ path: '/pages/recruitment/index' })
              }, 2000)
            });
        }, 1000)
      }
    },
    checkCompany() {
      if (!this.company.comname) {
        util.showToast('公司名不能为空');
        return false;
      }
      // if (!this.company.comemial) {
      //   util.showToast('公司E-mail不能为空');
      //   return false;
      // }
      if (!this.company.contactsname) {
        util.showToast('公司联系人不能为空');
        return false;
      }
      if (!this.company.contactstel) {
        util.showToast('公司联系人电话不能为空');
        return false;
      }
      if (!this.location.county || !this.company.address) {
        util.showToast('详细地址有误');
        return false;
      }
      // if (!this.company.officephone) {
      //   util.showToast('公司电话不能为空');
      //   return false;
      // }
      if (!this.company.businesslicensefile) {
        util.showToast('请上传公司营业执照');
        return false;
      }
      if (!this.company.introduce) {
        util.showToast('公司介绍不能为空');
        return false;
      }
      return true;
    }
  },
  computed: {
    checkSignUpForm() {
      return !(this.user.tel === '' ||
        !constant.regExp.phone.test(this.user.tel) ||
        this.user.veryCode == '' ||
        this.user.password == '' ||
        this.user.password !== this.user.rePassword);
    },
    imgUrl() {
      return constant.baseURL + this.company.businesslicensefile;
    }
  },
  mounted() {
    // console.log(this.$route);
    let step = +this.$route.query.step || 1;
    let mode = +this.$route.query.mode;
    if (step === 2 && mode === 'edit') {
      this.getUserInfo()
        .then(res => {
          delete res.lastupdatetime;
          delete res.createtime;
          this.location = {
            province: res.provinceid,
            city: res.cityid,
            county: res.countyid
          }
          console.log(this.location);
          this.company = res
        })
    }
    this.step = step;
  },  
  onShareAppMessage () {}
}
</script>

<style lang="scss" scoped>
@import '~@/styles/scss/variables';
.step2 {
    h5 {
        margin-left: -15px;
        margin-bottom: 5px;
    }
}
.card {
    width: 100%;
    .divider {
        width: 80%;
        height: 2em;
        margin: 10px auto;
        background: url("~@/assets/img/or@3x.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }
}
</style>
