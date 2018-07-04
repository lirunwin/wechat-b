<template lang="html">
  <div class="px-3">
    <selector v-model="post.wageclearing"
      @input="aaa"
    returnValue :items="wageClearing" returnValue placeholder="请选择工资结算"></selector>
    <tab-bar></tab-bar>
    {{wageclearing}}
  </div>
</template>

<script>
import Selector from '@/components/Selector';
import TabBar from '@/components/TabBar';
import constant from '@/constants';
export default {
  components: {
    Selector,
    TabBar
  },
  data: () => ({
    post: {},
    wageClearing: constant.wageClearing.slice(),
  }),
  onShow() {
    this.post = {}
  },
  methods: {
    aaa(e) {
      this.post.wageclearing = e
      console.log(this.post);
    }
  }

}
</script>

<style lang="css">
</style>
