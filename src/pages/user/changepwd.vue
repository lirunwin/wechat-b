<template lang="html">
  <div class="user-password container bg-white">
    <div class="row mx-0 pt-2">
      <div class="col-12 pb-1">
        <input-box placeholder="旧密码" type="password" v-model.lazy="password.odlPwd"></input-box>
      </div>
      <div class="col-12 pb-1">
        <input-box placeholder="新密码" type="password" v-model.lazy="password.newPwd"></input-box>
      </div>
      <div class="col-12 pb-1">
        <input-box placeholder="确认密码" type="password" v-model.lazy="rePassword"></input-box>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <div class="btn btn-primary btn-block" @click="onChangePwd">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import InputBox from '@/components/InputBox';
import util from '@/utils/util';
import { mapActions } from 'vuex';
export default {
  components: {
    InputBox
  },
  data: () => ({
    password: {
      newPwd: '',
      oldPwd: ''
    }
  }),
  methods: {
    ...mapActions(['changePwd', 'logout']),
    onChangePwd() {
      if (!this.password.oldPwd) {
        util.showToast('旧密码不能为空');
        return;
      }
      if (!this.password.newPwd) {
        util.showToast('新密码不能为空');
        return;
      }
      if (this.password.newPwd !== this.rePassword) {
        util.showToast('密码输入不相同');
        return;
      }
      this.changePwd(this.password)
        .then(res => {
          if (res.msg) {
            util.showToast('修改成功');
            this.logout()
              .then(() => {
                setTimeout(() => {
                  this.$router.replace({ path: '/pages/user/signin' });
                }, 2000)
              });
          }
        });
    }
  }
}
</script>

<style lang="scss">
.user-password {
    min-height: 100vh;
}
</style>
