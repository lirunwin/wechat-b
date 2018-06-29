<template lang="html">
  <div class="row recruit-list">
    <div class="col-12 py-1 border-top"
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
                <div class="col-auto recruit-action">
                  待处理理
                  <div class="shadow-sm text-center mx-1 bg-white actions">
                    <div class="text-success border-bottom py-1">同意</div>
                    <div class="text-danger py-1">拒绝</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 size-1 text-black-50 font-weight-bold">{{ item.age }}岁｜{{ item.sex }}︱{{ item.educationName }}︱{{ item.schoolName }} </div>
          </div>
          <div class="size-1 text-black-50 row">
            <div class="col-auto font-weight-bold">13567843567</div>
            <div class="col address">{{ item.resideCityName + item.resideCountyName + item.resideaddress }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="!list.length" class="col-12 text-center text-black-50 size-1 py-1"> - 暂无相关人员 - </div> -->
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    },
    action: {
      type: [String, Boolean],
      default: false
    }
  },
  data: () => ({
    img: require('@/assets/img/avatar.png'),
    item: {
      "deliveryId": "1528631135450226",
      "id": "1525405461100376",
      "username": "张四",
      "sex": "MALE",
      "birthday": "2000-11-01",
      "age": 20,
      "identitytype": "STUDENT",
      "family": "汉",
      "avatar": null,
      "educationType": "LEVEL_5",
      "educationName": "大学本科",
      "schoolName": "电子科技大学",
      "resideaddress": "中铁骑士公馆1103",
      "backuptel": "17381975032",
      "alipay": "18780635150",
      "email": "17381975032@qq.com",
      "qq": "17381975032",
      "wechat": "17381975032",
      "verified": null,
      "educationInfo": null,
      "createtime": 1525405461000,
      "deliverystatus": "WAIT_CONFIRM",
      "comevaluationid": null,
      "userevaluationid": null,
      "confirmuserid": null,
      "confirmtime": null,
      "applyTime": "2018-06-10 19:45:35.0",
      "tel": "18780635150",
      "censusProvinceName": "四川省",
      "censusCityName": "青羊区",
      "censusCountyName": "青羊区",
      "resideProvinceName": "四川省",
      "resideCityName": "成都市",
      "resideCountyName": "青羊区",
      aa: `v-if="list.length"
        v-for="item in list"
        :key="item.deliveryId"`
    }
  }),
  methods: {
    navigageTo(id) {
      // console.log(id);
      this.$router.push({ path: '/pages/recruitment/detail', query: { id } })
    }
  }

}
</script>

<style lang="scss">
@import "~@/styles/scss/common";
.avatar {
    width: 60px;
    height: 60px;
    flex: 0 0 60px;
    border-radius: 50%;
}
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
        z-index: 1;
        .actions {
            position: absolute;
            right: 0;
            width: 80%;
            z-index: 1;
            display: none;
            &:active,
            &:focus {
                .actions {
                    display: block;
                }
            }
        }

    }
}
</style>
