<template lang="html">
  <label class="selector">
    <div class='val'>四川</div>
  </label>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "~@/styles/scss/common";
.selector {
    width: 100%;
    .val {
        @include caret;
    }
}
</style>
