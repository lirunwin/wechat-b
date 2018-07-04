<template lang="html">
  <div class="row selector _input-label">
    <div class='col selector-text pr-0'>
      <picker @change="dateChange" :start="today" mode="date" class="py-0 datepicker">
        <div class="row">
          <view class="col pr-0 picker-label text-truncate">
              {{ date }}
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
  value: {
    immediate: true,
    handler(a, b) {
      console.log('asjdklsajdsa dlsajdlsadjklsajds阿斯利康到家了开始的阿萨德了', a, b);
    }
  },
  methods: {
    dateChange(e) {
      console.log(this.value);
      console.log('date changed', e);
      this.date = utils.formatTime(e.target.value, this.format, this.appendZero);
      this.$emit('input', this.date);
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
