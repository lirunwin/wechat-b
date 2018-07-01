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
          <input-box placeholder="请输入手机号"></input-box>
        </div>
      </div>
      <div class="col-12 px-0">
        <div class="px-3">
          <input-box placeholder="密码"></input-box>
        </div>
      </div>
      <div class="col-12 px-0 pt-3">
        <div class="px-3">
          <div class="row">
            <div class="btn btn-primary btn-block shadow-xs col-12">登录</div>
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
export default {
  components: {
    InputBox
  },
  data: () => ({
    logo: require('@/assets/img/logo.png'),
    btnBg: require('@/assets/img/signin_btn_bg.png')
  })
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
}
</style>
