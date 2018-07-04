<template lang="html">
  <div class="container user-signin bg-white d-flex justify-content-between flex-column">
    <div class="row pt-3">
      <div class="col-12 text-center">
        <img
          class="logo"
          :src="logo" alt="">
      </div>
    </div>
    <div class="row">
      <div class="col-12 px-0 pb-1">
        <div class="px-3">
          <input-box placeholder="请输入手机号" v-model="user.account" maxlength="11" type="number"></input-box>
        </div>
      </div>
      <div class="col-12 px-0">
        <div class="px-3">
          <sms-box placeholder="密码" type="password"
            v-model.lazy="user.password"
            :sms="user.loginType === 'PASSWORD' ? null : ''"
            :tel="user.account"></sms-box>
        </div>
      </div>
      <div class="col-12 px-0 pt-3">
        <div class="px-3">
          <div class="row">
            <div class="btn btn-primary btn-block col-12 signin-btn" @click="onSignIn">登录</div>
          </div>
          <div class="row size-2">
            <div class="col px-0">
              <div class="py-1 d-inline-block"
                @click="switchSignInWay">
                {{user.loginType === 'PASSWORD' ? '短信登录' : '账号登录'}}
              </div>
            </div>
            <div class="col px-0 text-right">
              <div class="py-1 d-inline-block" @click="navigageToSignUp">马上注册</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 signin-bg"></div>
    </div>
  </div>
</template>

<script>
import InputBox from '@/components/InputBox';
import SmsBox from '@/components/SmsBox';
import { mapActions } from 'vuex';
import constant from '@/constants';
import util from '@/utils/util';
import wx from '@/utils/wx';
export default {
  components: {
    InputBox,
    SmsBox
  },
  data: () => ({
    logo: require('@/assets/img/logo.png'),
    user: {
      loginType: 'PASSWORD',
      account: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions(['signIn']),
    onSignIn() {
      console.log(this.user.account);
      if (!this.user.account) {
        util.showToast('电话号码不能为空');
        return;
      }
      if (!constant.regExp.phone.test(this.user.account)) {
        util.showToast('电话号码有误');
        return;
      }
      if (!this.user.password) {
        util.showToast('密码不能为空');
        return;
      }
      this.signIn(this.user)
        .then(res => {
          this.$store.commit('logedIn');
          wx.setStorageSync(constant.userKeyName, res.data || res);
          if (res.msg === 'WSXX') {
            this.$router.replace({ path: '/pages/user/signup', query: { step: 2 } })
          } else {
            this.$router.push({ path: '/pages/recruitment/index' })
          }
        })
    },
    // navigageToFindPwd() {
    //   this.$router.push({ path: '/pages/user/findpwd' })
    // },
    navigageToSignUp() {
      this.$router.push({ path: '/pages/user/signup', query: { step: 1 } })
    },
    switchSignInWay() {
      this.user.loginType === 'PASSWORD' ? this.user.loginType = 'TELCODE' : this.user.loginType = 'PASSWORD';
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/scss/common";
.logo {
    width: 80px;
    height: 80px;
    flex: 0 0 80px;
}
.user-signin {
    min-height: 100vh;
    .signin-bg {
        padding-top: calc(100vw * 0.4213333334);
        background: url("~@/assets/img/signin_bg.png");
        background-size: cover;
    }
    .signin-btn {
        background: url("~@/assets/img/signin_btn_bg.png");
        background-size: cover;
    }
}
</style>
