<template lang="html">
  <div class="user-password container bg-white">
    <div class="row mx-0 pt-2">
      <div class="col-12 pb-1">
        <input-box placeholder="请输入手机号"></input-box>
      </div>
      <div class="col-12 pb-1">
        <input-box placeholder="请输入验证码"></input-box>
      </div>
      <div class="col-12 pb-1">
        <input-box placeholder="新密码"></input-box>
      </div>
      <div class="col-12 pb-1">
        <input-box placeholder="确认密码"></input-box>
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
  }
}
</script>

<style lang="scss">
.user-password {
    min-height: 100vh;
}
</style>
