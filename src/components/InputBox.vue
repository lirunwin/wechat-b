<template lang="html">
  <label class="row align-items-center _input-label">
    <div class="col">
      <input :type="type"
        :placeholder="placeholder"
        :maxlength="maxlength"
        v-bind="$attrs"
        :value="value"
        @change="updataVal($event.target.value)"
      >
    </div>
    <div class="col-auto smsCode btn btn-outline-primary shadow-none align-self-stretch d-flex align-items-center justify-content-center" v-if="sms">
      <span>获取验证码</span>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    value: [String, Number],
    sms: [String, Boolean],
    maxlength: String
  },
  methods: {
    updataVal(val) {
      this.$emit('input', val);
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/scss/variables';
._input-label {
    border: 1px map-get($primary,color) solid;
    border-radius: $border-radius;
    font-size: 16px;
    .label-text {
        font-weight: 600;
    }
    input {
        padding: 8px 0;
    }
    .smsCode {
        font-size: 14px;
        padding: 0;
    }
}
</style>
