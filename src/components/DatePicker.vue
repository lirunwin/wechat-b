<template lang="html">
  <div class="row selector _input-label">
    <div class='col selector-text pr-0'>
      <picker @change="dateChange" :start="today" mode="date" :value="value || date" class="py-0 datepicker">
        <div class="row">
          <view class="col pr-0 py-1 text-truncate">
              {{value || date}}
          </view>
          <div class="col-auto py-1 pr-2 pl-0">
            <div class="caret"></div>
          </div>
        </div>
      </picker>
      <!-- <picker mode="date" :value="date" start="2015-09-01" end="2017-09-01" @change="dateChange">
    <view class="picker">
      当前选择: {{date}}
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
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    appendZero: {
      type: Boolean,
      default: true
    },
    value: String
  },
  data: () => ({
    today: '',
    date: ''
  }),
  methods: {
    dateChange(e) {
      let val = this.date = utils.formatTime(e.target.value, this.format, this.appendZero);
      this.$emit('input', val);
    },
  },
  mounted() {
    this.today = utils.formatTime(new Date(), this.format, this.appendZero);
    this.date = this.today;
    this.$emit('input', this.today);
  }
}
</script>
<style lang="scss">
.datepicker {
    border: none;
}
</style>
