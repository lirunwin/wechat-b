<template lang="html">
  <div class="user-password container bg-white">
    <div class="row mx-0 pt-2">
      <div class="col-12 pb-1">
        <input-box placeholder="旧密码" type="password" v-model="password.oldPwd"></input-box>
      </div>
      <div class="col-12 pb-1">
        <input-box placeholder="新密码" type="password" v-model="password.newPwd"></input-box>
      </div>
      <div class="col-12 pb-1">
        <input-box placeholder="确认密码" type="password" v-model="rePassword"></input-box>
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
    },
    rePassword: ''
  }),
  methods: {
    ...mapActions(['changePwd', 'logout']),
    onChangePwd() {
      setTimeout(() => {
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
          .then(() => {
            this.password = {
              newPwd: '',
              oldPwd: ''
            };
            this.rePassword = ''
            util.showToast('修改成功,请用新密码重新登陆');
            setTimeout(() => {
              this.logout()
                .then(() => {
                  this.$router.replace({ path: '/pages/user/signin' });
                })
            }, 2000);
          });
      }, 1000);
    },
  },
  onShow() {
    console.log('hide');
    this.password = {
      newPwd: '',
      oldPwd: ''
    };
    this.rePassword = ''
  },
  activated() { console.log('activated'); },
  deactivated() { console.log('deactivated'); },
  beforeDestroy() { console.log('beforeDestroy'); },
  destroyed() { console.log('destroyed'); },
}
</script>

<style lang="scss">
.user-password {
    min-height: 100vh;
}
</style>
