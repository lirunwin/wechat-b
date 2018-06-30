<template lang="html">
  <div class="recruitments container">
    <recruitment-item :list="recruitments"></recruitment-item>
    <done-load v-if="noMoreData" :done="noMoreData"></done-load>
  </div>
</template>

<script>
import RecruitmentItem from '@/components/RecruitmentItem';
import DoneLoad from '@/components/DoneLoad';
import { mapActions, mapGetters } from 'vuex';
import util from '@/utils/util';
import wx from '@/utils/wx';
export default {
  components: {
    RecruitmentItem,
    DoneLoad
  },
  data: () => ({
    page: {
      pageIndex: 1,
      pageSize: 10
    },
    noMoreData: false
  }),
  methods: {
    ...mapActions(['fetchRecruitments']),
    loadMore() {
      if (!this.noMoreData) {
        let page = this.page;
        page.pageIndex += 1;
        this.fetchRecruitments(page)
          .then((res) => {
            if (res.length === 0) {
              this.noMoreData = true;
            }
          })
      }
    },
    refresh() {
      this.page.pageIndex = 1;
      this.fetchRecruitments(this.page)
        .then(() => {
          this.noMoreData = false;
          wx.stopPullDownRefresh();
        });
    }
  },
  computed: {
    ...mapGetters(['recruitments']),
    computedRecruitments() {
      return this.recruitments.map(recruitment => {
        recruitment.jobstatus = util.constantFilter('jobStatus', recruitment.jobstatus);
        recruitment.jobnature = util.constantFilter('jobNatures', recruitment.jobnature);
        recruitment.wageclearing = util.constantFilter('wageClearing', recruitment.wageclearing);
        return recruitment;
      });
    }
  },
  mounted() {
    this.fetchRecruitments(this.page)
  },
  onPullDownRefresh() {
    this.refresh();
  },
  onReachBottom() {
    this.loadMore();
  }
}
</script>

<style lang="scss">
@import "~@/styles/scss/common";
.recruitments {
    min-height: 100vh;
    background: $white;
}
</style>
