<template lang="html">
  <div class="tabbar">
    <div class="container text-center bg-white size-1">
      <div class="row align-items-center">
        <div class="col" :class="{ active: currentTab === 'pagesRecruitmentIndex' }">
          <div @click="goToRecruitmentIndex">
            <i class="iconfont icon-home"></i>
            <div>招聘信息</div>
          </div>
        </div>
        <div class="col">
          <i class="iconfont icon-plus" @click="goToPost"></i>
        </div>
        <div class="col" :class="{ active: currentTab === 'pagesUserCenter' }">
          <div @click="goToUserCenter">
            <i class="iconfont icon-center"></i>
            <div>账户信息</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentTab() {
      return this.$route.name;
    }
  },
  mounted() {
    console.log(this.$route.name);
  },
  methods: {
    goToPost() {
      if (this.currentTab === 'pagesRecruitmentPost') return;
      this.$router.replace({ path: '/pages/recruitment/post' })
    },
    goToRecruitmentIndex() {
      if (this.currentTab === 'pagesRecruitmentIndex') return;
      this.$router.replace({ path: '/pages/recruitment/index' })
    },
    goToUserCenter() {
      if (this.currentTab === 'pagesUserCenter') return;
      this.$router.replace({ path: '/pages/user/center' })
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/scss/common";
.tabbar {
    position: relative;
    padding-top: 46px;
    .container {
        position: fixed;
        padding: 5px 8%;
        width: 100vw;
        left: 0;
        bottom: 0;
        font-size: 10px;
        color: $material-color-grey-600;
        border-top: 1px solid $border-color;
        .tab-bar-icon {
            width: 22px;
            height: 22px;
        }
        .tab-bar-icon-lg {
            width: 40px;
            height: 40px;
        }
        .iconfont {
            display: inline-block;
        }

        .icon-center::before,
        .icon-home::before {
            font-size: 28px;
            line-height: 1;
        }
        .active {
            color: map-get($primary, color);
            .icon-center::before,
            .icon-home::before {
                color: map-get($primary, color);
            }
        }
        .icon-plus {
            font-size: 35px;
            width: 40px;
            height: 40px;
            line-height: 40px;
            color: $white;
            border-radius: $border-radius;
            background: map-get($primary, light);
        }
    }
}
</style>
