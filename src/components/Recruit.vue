<template lang="html">
  <div class="row recruit-list">
    <div class="col-12 py-1 border-top"
      v-for="(item, index) in recruits"
      :key="index"
    >
      <div class="row align-items-center">
        <div class="col-auto pr-0">
          <img :src="item.avatar || img" class="avatar" alt="">
        </div>
        <div class="col ">
          <div class="row">
            <div class="col-12 size-2">
              <div class="row">
                <div class="col">{{ item.username }}<span class="text-black-50">({{ item.identitytype }})</span></div>
                <div class="col-auto recruit-action"
                  v-if="action !== false"
                  :class="{active: item.activeAction}"
                  @click="item.activeAction = !item.activeAction">
                  待处理
                  <div class="shadow-sm text-center mx-1 bg-white actions">
                    <div class="text-success border-bottom py-1"
                      @click="onAgreeApply(item.deliveryId)"
                    >同意</div>
                    <div class="text-danger py-1"
                      @click="onRejectApply(item.deliveryId)"
                      >拒绝</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 size-1 text-black-50 font-weight-bold">{{ item.sex ? item.sex + '︱' : ''}}{{ item.educationName ? item.educationName + '︱' : '最高学历: 未知︱'}}{{ item.schoolName ? item.schoolName : '学校名称:未知'}} </div>
          </div>
          <div class="size-1 text-black-50 row">
            <div class="col-auto font-weight-bold">{{item.tel}}</div>
            <div class="col address">{{ (item.resideCityName + item.resideCountyName + item.resideaddress) || '住址未知' }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!recruits.length" class="col-12 text-center text-black-50 size-1 py-1"> - 暂无相关人员 - </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    recruits: {
      type: Array,
      default: () => ([])
    },
    action: {
      type: [String, Boolean],
      default: false
    }
  },
  data: () => ({
    img: require('@/assets/img/avatar.png')
  }),
  methods: {
    ...mapActions(['agreeApply', 'rejectApply']),
    onAgreeApply(id) {
      this.agreeApply({ id, pid: this.$route.query.id })
        .then(() => this.$emit('refresh'));
    },
    onRejectApply(id) {
      this.rejectApply({ id, pid: this.$route.query.id })
        .then(() => this.$emit('refresh'));
    },
  }
}
</script>

<style lang="scss">
@import "~@/styles/scss/common";
.recruit-list {
    line-height: 1.25em;

    .address {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        direction: rtl;
    }
    .recruit-action {
        position: relative;
        .actions {
            position: absolute;
            right: 0;
            width: 80%;
            z-index: 1;
            display: none;
        }
        &.active {
            .actions {
                display: block;
            }
        }

    }
}
</style>
