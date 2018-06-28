<template lang="html">
<div class="row">
  <div class="col-6 pr-2">
    <selector v-model="pIndex" :items="positionParents" @input="parentChange"></selector>
  </div>
  <div class="col-6 pl-2">
    <selector v-model="cIndex" :items="positionChildren" @input="positionChange"></selector>
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
    positionChange() {
      console.log(11111);
      console.log(this.position);
    },
    parentChange() {
      if (this.pIndex) {
        let pid = this.positionParents[this.pIndex].id
        console.log(pid);
        this.position.positionParentId = pid;
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
