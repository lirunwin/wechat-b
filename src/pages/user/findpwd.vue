<template lang="html">
  <div class="user-password container bg-white">
    <div class="row mx-0 pt-2">
      <div class="col-12 pb-1">
        <input-box placeholder="请输入手机号" v-model="user.tel" maxlength="11"></input-box>
      </div>
      <div class="col-12 pb-1">
        <input-box placeholder="请输入验证码" v-model="user.veryCode"maxlength="6" sms :tel="user.tel"></input-box>
      </div>
      <div class="col-12 pb-1">
        <input-box placeholder="新密码" v-model="user.password" type="password" maxlength="30"></input-box>
      </div>
      <div class="col-12 pb-1">
        <input-box placeholder="确认密码" v-model="rePassword" type="password" maxlength="30"></input-box>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <div class="btn btn-primary btn-block shadow-xs">确定</div>
      </div>
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
    user: {
      "tel": "", //手机号
      "password": "", //密码
      "veryCode": "", //手机验证码
    }
  }),
}
</script>

<style lang="scss">
.user-password {
    min-height: 100vh;
}
</style>
