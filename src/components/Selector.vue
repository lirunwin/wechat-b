<template lang="html">
  <div class="row selector _input-label">
    <div class='col-12 selector-text pr-0'>
      <picker @change="pickerChange" :value="index" :range="items" :range-key="label">
        <div class="row">
          <view class="col pr-0 text-truncate picker-label">
            {{index === -1 ? placeholder : items.length === 0 ? placeholder : items[index][label]}}
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
export default {
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: 'name'
    },
    items: Array,
    returnValue: {
      type: String,
      default: ''
    },
    defaultIndex: Number
  },
  data: () => ({
    index: -1,
  }),
  methods: {
    pickerChange(e) {
      console.log(e);
      let currentIndex = e.target.value;
      this.index = currentIndex;
      if (currentIndex > -1) {
        if (this.returnValue !== false) {
          // console.log(this.items);
          let val = this.items[currentIndex].value || this.items[currentIndex].id || '';
          this.$emit('input', val);
          // console.log(2, this.items[val].value || this.items[val].id);
        } else {
          this.$emit('input', currentIndex);
          // console.log(3, val);
        }
      }
      // console.log(1, val);      
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue) { // 有默认值的时候
        if (this.returnValue !== false) { // 如果需要返回值或id 否则返回 index
          let propertyName = this.returnValue ? this.returnValue : 'value'; // 如果没定义名称 返回value属性, 如果没有value属性
          let times = 10;
          let timer = setInterval(() => {
            times--
            if (this.items.length) {
              this.index = this.items.findIndex(item => item[propertyName] == newValue); // 没找到会返回 -1
              clearInterval(timer)
            }
            if (!times) {
              clearInterval(timer)
            }
          }, 500)

        } else {
          this.index = newValue
        }
      } else {
        this.index = -1;
      }
    },
    // defaultIndex(newIndex, oldIndex) {
    //   if (oldIndex === -1 && newIndex > -1) {
    //     this.index = newIndex;
    //     this.$emit('input', newIndex);
    //   }
    // }
  }
}
</script>

<style lang="scss">
@import "~@/styles/scss/common";
picker {
    height: 40px;
}
.picker-label {
    height: 40px;
    line-height: 40px;
}
.selector {
    .selector-text {
        color: $material-color-grey-600;
    }
    user-select: none;
    &._input-label {
        background: map-get($secondary,dark);
    }
}
</style>
