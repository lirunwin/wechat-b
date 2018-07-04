<template lang="html">
  <div class="radio-boxes">
      <radio-group class="radio-group" @change="radioChange">
        <label v-for="(item, index) in items" :key="index" v-if="!item.disable">
          <radio :value="item.value" :checked="item.checked" color="transparent"/><label class="size-1">{{item.name}}</label>
        </label>
      </radio-group>
  </div>
</template>

<script>
export default {
  props: ['items'],
  data: () => ({

  }),
  methods: {
    radioChange(e) {
      this.$emit('input', e.target.value);
    }
  },
  mounted() {
    if (this.items.length) {
      let checked = this.items.find(item => item.checked === true);
      if (checked) {
        this.$emit('input', checked.value);
      }
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/scss/variables';
/* 未选中的 背景样式 */
.radio-boxes {
    label {
        background: none;
        margin-right: 2em;
    }
    radio {
        text-align: left;
        margin-right: 0.5em;
    }
    radio .wx-radio-input {
        border-radius: 50%;
        height: 25px;
        width: 25px;
        line-height: 25px;
        border: none;
        transition: 0.28s ease;
        position: relative;
    }

    radio .wx-radio-input::before {
        content: "";
        border-radius: 50%;
        border: 2px solid map-get($primary,color);
        position: absolute;
        margin: 4px;
        width: 16px;
        height: 16px;
        z-index: 0;
        top: 0;
        left: 0;
        transform: translate(50%) scale(1);
    }
    radio .wx-radio-input.wx-radio-input-checked::after {
        content: "";
        border-radius: 50%;
        border: 2px solid map-get($primary,color);
        background-color: map-get($primary,color);
        position: absolute;
        margin: 4px;
        width: 16px;
        height: 16px;
        z-index: 0;
        top: 0;
        left: 0;
        transform: translate(50%) scale(.6);
    }
}
</style>
