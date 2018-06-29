<template lang="html">
  <div class="text-muted text-center size-1 done-load py-1">{{done ? '- 数据加载完毕 -' : '- 下拉加载更多 -' }}</div>
</template>

<script>
export default {
  props: ['done']
}
</script>

<style lang="scss">
.done-load {
    position: fixed;
    z-index: -1;
    width: 100vw;
    bottom: 0;
    left: 0;
}
</style>
