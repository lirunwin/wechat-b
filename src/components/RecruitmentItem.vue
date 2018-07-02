<template lang="html">
  <div class="row recruitment-list">
    <div class="col-12 py-1 border-top" v-for="item in list" :key="item.id" @click="navigageTo(item.id)">
      <div class="row align-items-start section-top">
        <div class="col">{{item.title}}</div>
        <div class="col-auto text-secondary">{{item.jobstatus}}</div>
      </div>
      <div class="row align-items-end section-middle">
        <div class="col text-muted">{{item.jobnature}} ︱ {{item.wageclearing}} ︱ {{item.wagebase}}元/天 </div>
        <div class="col-auto" v-if="item.waitCount">待处理
          <span class="font-weight-bold pl-1 size-3 text-secondary">{{item.waitCount}}</span>
        </div>
      </div>
      <div class="row align-items-end section-bottom">
        <div class="col text-muted">发布时间：{{item.createtime}}</div>
        <div class="col-auto font-weight-bold text-secondary">拟招募({{item.peoplenumber}}) ︱ 已招募({{item.recruitedCount ? item.recruitedCount : 0}})</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  methods: {
    navigageTo(id) {
      this.$router.push({ path: '/pages/recruitment/detail', query: { id } })
    }
  }

}
</script>

<style lang="scss">
@import "~@/styles/scss/common";

.recruitment-list {
    line-height: 1.375em;

    .section-top {
        font-size: $size-3;
    }
    .section-middle {
        font-size: $size-2;
    }
    .section-bottom {
        font-size: $size-1;
    }
}
</style>
