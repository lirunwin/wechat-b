<template lang="html">
  <div class="container text-center user-center d-flex justify-content-between flex-column">
    <div class="row pt-3">
      <div class="col-12">
        <img
          class="avatar-lg"
          :src="userInfo.avatar || logo" alt="">
      </div>
    </div>
    <div class="row pb-4">
      <div class="col-12 pt-1 size-4">{{ userInfo.comname }}</div>
      <div class="col-12 pt-1 size-3">办公电话：{{ userInfo.contactstel }}</div>
      <div class="col-12 pt-1 size-3 text-muted">注册时间：{{ userInfo.createtime }}</div>
    </div>
    <div class="row pb-4">
      <div class="col-12">
        <div class="px-3">
          <div class="btn btn-primary btn-block" @click="changePwd">修改密码</div>
        </div>
        <div class="px-3 mt-2">
          <div class="btn btn-outline-primary btn-block" @click="onLogout">退出登录</div>
        </div>
      </div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import util from '@/utils/util';
import TabBar from '@/components/TabBar';
import wx from '@/utils/wx';
export default {
  components: {
    TabBar
  },
  data: () => ({
    logo: require('@/assets/img/logo.png')
  }),
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions(['logout', 'getUserInfo']),
    changePwd() {
      this.$router.push({ path: '/pages/user/changepwd' });
    },
    onLogout() {
      this.logout()
        .then(() => {
          setTimeout(() => {
            this.$router.replace({ path: '/pages/user/signin' });
          }, 2000)
        })
        .catch(() => {
          setTimeout(() => {
            this.$router.replace({ path: '/pages/user/signin' });
          }, 2000)
        });
    }
  },
  mounted() {
    this.getUserInfo()
  },
  onShareAppMessage () {}
}
</script>

<style lang="scss">
@import "~@/styles/scss/common";
.user-center {
    background: $white;
    min-height: 100vh;
}
</style>
