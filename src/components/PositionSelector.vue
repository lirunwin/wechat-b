<template lang="html">
<div class="row">
  <div class="col-6 pr-2">
    <selector v-model="pIndex" :items="positionParents"></selector>
  </div>
  <div class="col-6 pl-2">
    <selector v-model="cIndex" :items="positionChildren"></selector>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Selector from "@/components/Selector";
export default {
  components: {
    Selector
  },
  data: () => ({
    pIndex: 0,
    cIndex: 0,
    position: {
      positionParentId: '',
      positionid: ''
    }
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
    pIndex: function (newIndex, oldIndex) {
      console.log(newIndex);
      if (newIndex >= 0) {
        let pid = this.positionParents[newIndex].id
        this.position.positionParentId = pid;
        this.emitValue();
        this.getPositions({ pid })
      }
    },
    cIndex: function (newIndex, oldIndex) {
      console.log(newIndex);
      if (newIndex >= 0) {
        let pid = this.positionChildren[newIndex].id
        this.position.positionid = pid;
        this.emitValue();
        this.getPositions({ pid })
      }
    }
  },
  mounted() {
    this.getPositions({ pid: 0 });
  }
}
</script>

<style lang="css">
</style>
