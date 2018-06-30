<template lang="html">
  <div class="row selector _input-label">
    <div class='col selector-text pr-0'>
      <picker @change="timeChange" mode="time" :value="time" class="py-0 timepicker">
        <div class="row">
          <view class="col pr-0 py-1 text-truncate">
              {{time}}
          </view>
          <div class="col-auto py-1 pr-2 pl-0">
            <div class="caret"></div>
          </div>
        </div>
      </picker>
      <!-- <picker mode="time" :value="time" start="2015-09-01" end="2017-09-01" @change="timeChange">
    <view class="picker">
      当前选择: {{time}}
    </view>
  </picker> -->
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
    }
  },
  data: () => ({
    now: utils.formatTime(new Date(), "hh:mm"),
    time: ''
  }),
  methods: {
    timeChange(e) {
      let val = this.time = e.target.value;
      this.$emit('input', val);
    },
  },
  mounted() {
    this.time = this.now;
    this.$emit('input', this.now);
  }
}
</script>
<style lang="scss">
.timepicker {
    border: none;
}
</style>
