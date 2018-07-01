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
               <input-box v-model.lazy="user.veryCode"
                 placeholder="验证码"
                 :sms="true"
                 @getCode="getAuthCode"
                 :tel="user.tel"
                 type="number"
                 maxlength="6"></input-box>
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
                <input-box v-model.lazy="user.tel" placeholder="12" maxlength="11"></input-box>
              </div>
              <div class="col-12 mb-1">
                <h5>联系人</h5>
                <input-box v-model.lazy="user.veryCode" placeholder="验证码" type="number" maxlength="6"></input-box>
              </div>
              <div class="col-12 mb-1">
                <h5>联系电话</h5>
                <input-box v-model.lazy="user.password" placeholder="密码" type="password" maxlength="30"></input-box>
              </div>
              <div class="col-12 mb-1">
                <h5>公司电话</h5>
                <input-box v-model.lazy="user.rePassword" placeholder="确认密码" type="password" maxlength="30"></input-box>
              </div>
              <div class="col-12 mb-1">
                <h5>公司地址</h5>
                <selector></selector>
              </div>
              <div class="col-12 mb-1">
                <h5>营业执照(必须上传)</h5>
                <image-uploader></image-uploader>
              </div>
              <div class="col-12 mb-1">
                <h5>公司简介</h5>
                <input-box v-model.lazy="user.rePassword" placeholder="确认密码" tyep="password" maxlength="30"></input-box>
              </div>
            </div>
          </div>
          <div class="card-actions px-0 mb-3">
            <button type="submit" class="btn btn-primary btn-block mr-0" href="#"
              :disabled="checkSignUpForm"
              @click="onSubmit">立即提交</button>
          </div>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
import InputBox from '@/components/InputBox';
import Selector from '@/components/Selector';
import ImageUploader from '@/components/ImageUploader';
import constant from '@/constants';
import util from '@/utils/util';
import { mapActions } from 'vuex';
export default {
  components: {
    InputBox,
    Selector,
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
    }
  }),
  methods: {
    ...mapActions(['getSmsCode', 'signUp']),
    getAuthCode() {
      if (constant.regExp.phone.test(this.user.tel)) {
        this.getSmsCode({
          tel: this.user.tel,
          type: 'SIGNUP'
        })
      }
    },
    onSignUp() {
      console.log(this.user.tel === '');
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
        this.signUp({
          tel: this.user.tel, //手机号
          password: this.user.password, //密码
          veryCode: this.user.veryCode, //手机验证码
        });
      }
    }
  },
  computed: {
    checkSignUpForm() {
      return !(this.user.tel === '' ||
        !constant.regExp.phone.test(this.user.tel) ||
        this.user.veryCode == '' ||
        this.user.password == '' ||
        this.user.password !== this.user.rePassword);
    }
  },
  mounted() {
    console.log(this.$route);
    this.step = +this.$route.query.step || 1
  }
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
