<template lang="html">
  <div class="row selector _input-label">
    <div class='col selector-text pr-0'>
      <picker @change="pickerChange" :value="index" :range="items" :range-key="label">
        <div class="row">
          <view class="col py-1 pr-0 text-truncate">
            {{index === -1 || items.length === 0 ? placeholder : items[index][label]}}
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
      type: [Boolean, String]
    },
    test: String
  },
  data: () => ({
    index: -1,
  }),
  methods: {
    pickerChange(e) {
      let val = e.target.value;
      this.index = val;
      if (this.returnValue !== false) {
        this.$emit('input', this.items[val].value)
      } else {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (!oldValue) {
        console.log(newValue);
        this.index = this.items.findIndex(item => item.id === newValue);
        console.log('index:',
          this.index);
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/scss/common";
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
