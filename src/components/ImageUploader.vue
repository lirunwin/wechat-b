<template lang="html">
  <div class="row align-items-center">
    <div class="px-0 col-7 img-preview" :style="{background: bgImg}">
    </div>
    <div class="text-center col-5">
      <label class="btn btn-primary" @click="chooseFile" :loading="loading">
        上传图片
        <input type="file"
        v-show="false"
        ref="uploadImage"
        accept="image/*"
        @change="onFilePicked">
      </label>
      {{bgImg.background}}
    </div>
  </div>
</template>

<script>
import promiseWX from '@/utils/promiseWX'
export default {
  data: () => ({
    bgImg: require('@/assets/img/img_placeholder.gif'),
    loading: false
  }),
  methods: {
    chooseFile() {
      promiseWX.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
        })
        .then(res => {
          console.log(res);
          this.bgImg = res.tempFilePaths[0];
          this.loading = true;
          return res;
        })
        .then(res => promiseWX.previewImage({
          urls: res.tempFilePaths
        }))
    },
    // onFilePicked(event) {
    //   this.loading = true;
    //   const files = event.target.files;
    //   let filename = files[0].name;
    //   if (filename.lastIndexOf('.') <= 0) {
    //     return;
    //   }
    //   const fileReader = new FileReader();
    //   fileReader.addEventListener('load', () => {
    //     this.imageUrl = fileReader.result;
    //   })
    //   fileReader.readAsDataURL(files[0]);
    //   this.image = files[0];
    //
    //   let formData = new FormData();
    //   formData.append("file", files[0]);
    //   // var request = new XMLHttpRequest();
    //   // request.open("POST", "http://192.168.0.105:8085/common/upload");
    //   // request.send(formData);
    //   this.uploadFile(formData)
    //     .then(res => {
    //       this.$emit('input', res.src);
    //       this.loading = false;
    //     });
    //
    // }
  }
}
</script>

<style lang="scss" scoped>
.img-preview {
    max-height: 200px;
    min-height: 120px;
    margin: 0 auto;
    background: url("~@/assets/img/img_placeholder.gif");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}
</style>
