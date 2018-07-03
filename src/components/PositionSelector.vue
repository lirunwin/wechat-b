<template lang="html">
<div class="row">
  <div class="col-6 pr-2">
    <selector v-model="pid" :items="positionParents" returnValue="id"></selector>
  </div>
  <div class="col-6 pl-2">
    <selector v-model="cid" :items="positionChildren" returnValue="id"></selector>
  </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';
import Selector from "@/components/Selector";
export default {
  props: ['value'],
  components: {
    Selector
  },
  data: () => ({
    pid: 0,
    cid: 0,
    position: {
      positionParentId: '',
      positionid: ''
    },
    initCid: null
  }),
  computed: {
    ...mapGetters(['positionParents', 'positions']),
    positionChildren() {
      return this.positions.filter(position => position.pid === this.position.positionParentId);;
    }
  },
  methods: {
    ...mapActions(['getPositions']),
    emitValue() {
      this.$emit('input', this.position)
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (!oldValue.positionParentId) {
        this.pid = newValue.positionParentId;
        this.initCid = newValue.positionid;
      }
    },
    pid: function (newPid) {
      if (newPid) {
        this.position.positionParentId = newPid;
        this.emitValue();
        this.getPositions({
            pid: newPid
          })
          .then(() => {
            if (this.initCid !== null) {
              this.cid = this.initCid;
              this.initCid = null;
            } else {
              this.cid = -1;
            }
          })
      }
    },
    cid: function (newCid) {
      if (newCid) {
        this.position.positionid = newCid;
        this.emitValue();
      }
    }
  },
  mounted() {
    this.getPositions({
        pid: 0
      })
      .then((res) => {
        // console.log(123, res);
        // console.log(1, JSON.stringify(this.value));

      });
  }
}
</script>

<style lang="css">
</style>
