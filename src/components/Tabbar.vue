<template lang="html">
  <div class="tabbar">
      <div class="container text-center bg-white">
        <div class="row">
          <div class="col">
            <img :src="tab1" class="tab-bar-icon">
            <div>招聘信息</div>
          </div>
          <div class="col">
            <img :src="tab1" class="tab-bar-icon-lg">
          </div>
          <div class="col">
            <img :src="tab1" class="tab-bar-icon">
            <div>账户信息</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab1: require('@/assets/img/tab1.png'),
    tab2: require('@/assets/img/tab2.png'),
    tab3: require('@/assets/img/tab3.png')
  })
}
</script>

<style lang="scss">
.tabbar {
    position: fixed;
    left: 0;
    bottom: 0;
    .tab-bar-icon {
        width: 22px;
        height: 22px;
    }
    .tab-bar-icon-lg {
        width: 40px;
        height: 40px;
    }
}
</style>
