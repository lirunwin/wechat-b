<template lang="html">
  <div class="row selector _input-label">
    <div class='col selector-text pr-0'>
      <picker @change="timeChange" mode="time" class="py-0 timepicker">
        <div class="row">
          <view class="col pr-0 text-truncate picker-label">
              {{ time }}
          </view>
          <div class="col-auto py-1 pr-2 pl-0">
            <div class="caret"></div>
          </div>
        </div>
      </picker>
    </div>
  </div>
</template>

<script>
import utils from "@/utils/util";
export default {
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: String,
    defaultValue: String
  },
  data: () => ({
    // now: utils.formatTime(new Date(), "hh:mm"),
    time: '',
  }),
  watch: {
    defaultValue: {
      immediate: true,
      handler(newTime, oldTime) {
        console.log({ newTime }, { oldTime }, this.value);
        if (newTime) {
          this.time = newTime;
          this.$emit('input', newTime);
        }
      }
    }
  },
  methods: {
    timeChange(e) {
      let val = this.time = e.target.value;
      this.$emit('input', val);
    },
  },
  onShow() {
    // console.log('time:', this.value);
    // this.time = this.value;
    // this.$emit('input', this.value);
  }
}
</script>
<style lang="scss">
.timepicker {
    border: none;
}
</style>
