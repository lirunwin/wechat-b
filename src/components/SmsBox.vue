<template lang="html">
  <div class="row align-items-center _input-label">
    <label class="col pl-1">
      <input :type="type"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :value="value"
        @input="updataVal($event.target.value)"
      >
      <text v-if="unit" class="unit p-1">{{ unit }}</text>
    </label>
    <div class="col-auto smsCode btn btn-outline-primary shadow-none border-0 text-dark align-self-stretch d-flex align-items-center justify-content-center"
      v-if="sms !== null"
      @click="getCode"
      >
      <span>获取验证码{{time != countDown && time ?  time : '' }}</span>
    </div>
  </div>
</template>

<script>
import constant from '@/constants';
import util from '@/utils/util';
import { mapActions } from 'vuex';
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
    sms: {
      type: [String, Boolean],
      default: null
    },
    tel: String,
    smsType: {
      type: String,
      default: 'SIGNIN'
    },
    maxlength: {
      type: [String, Number],
      default: 100
    },
    unit: String
  },
  data: () => ({
    countDown: constant.smsCountDown,
    time: 0,
    disableSms: false
  }),
  methods: {
    ...mapActions(['getSmsCode']),
    updataVal(val) {
      this.$emit('input', val);
    },
    getCode() {
      console.log(this.tel);
      setTimeout(() => {
        if (!constant.regExp.phone.test(this.tel)) {
          util.showToast('电话号码有误');
          return;
        }

        if (!this.disableSms) {
          let timer = null;
          this.getSmsCode({
              tel: this.tel,
              type: this.smsType
            })
            .catch(() => {
              clearInterval(timer);
              this.time = this.countDown;
              this.disableSms = false;
            })
          this.disableSms = true;
          this.time = this.countDown;
          timer = setInterval(() => {
            this.time--;
            if (this.time === 0) {
              this.time = this.countDown;
              this.disableSms = false
              clearInterval(timer)
            }
          }, 1000)
        }
      }, 1000);
    }
  },
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
        padding-right: 2em;
        height: 40px;
        line-height: 40px;
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
