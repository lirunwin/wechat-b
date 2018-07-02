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
      <div class="col-12 pt-1 size-3">账号：{{ userInfo.contactstel }}</div>
      <div class="col-12 pt-1 size-3 text-muted">注册时间：{{userInfo.createtime}}</div>
    </div>
    <div class="row pb-4">
      <div class="col-12">
        <div class="px-3">
          <div class="btn btn-primary btn-block shadow-xs" @click="editUserInfo">修改信息</div>
        </div>
        <div class="px-3 mt-2">
          <div class="btn btn-outline-primary btn-block shadow-xs" @click="onLogout">退出登录</div>
        </div>
      </div>
    </div>
    <!-- <tabbar></tabbar> -->
  </div>
</template>

<script>
// import Tabbar from '@/components/Tabbar';
import { mapActions, mapGetters } from 'vuex';
import util from '@/utils/util';
import wx from '@/utils/wx';
export default {
  data: () => ({
    logo: require('@/assets/img/logo.png')
  }),
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions(['logout', 'getUserInfo']),
    editUserInfo() {
      this.$router.push({ path: '/pages/user/signup', query: { step: 2 } });
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
  }
}
</script>

<style lang="scss">
@import "~@/styles/scss/common";
.user-center {
    background: $white;
    min-height: 100vh;
}
</style>
