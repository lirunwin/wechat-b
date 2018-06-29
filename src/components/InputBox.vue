<template lang="html">
  <div class="row align-items-center _input-label">
    <label class="col pl-1">
      <input :type="type"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :value="value"
        @change="updataVal($event.target.value)"
      >
      <text v-if="unit" class="unit p-1">{{unit}}</text>
    </label>
    <div class="col-auto smsCode btn btn-outline-primary shadow-none align-self-stretch d-flex align-items-center justify-content-center" v-if="sms">
      <span>获取验证码</span>
    </div>
  </div>
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
    maxlength: {
      type: [String, Number],
      default: 100
    },
    unit: String
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
    background: map-get($secondary,light);
    border-radius: $border-radius;
    font-size: 16px;
    position: relative;
    .label-text {
        font-weight: 600;
    }
    input {
        padding: 8px 2em 8px 0;
    }
    .smsCode {
        font-size: 14px;
        padding: 0;
    }
    .unit {
        position: absolute;
        top: 0;
        right: 0;
        line-height: 1;
        color: $material-color-grey-600;
    }
}
</style>
