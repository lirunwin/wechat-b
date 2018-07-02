<template lang="html">
  <div class="row align-items-center">
    <div class="px-0 col-7 img-preview"
      v-if="bgImg"
      @click="previewImage"
      :style="{'background-image': 'url('+ bgImg + ')'}">
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
    </div>
  </div>
</template>

<script>
import promiseWX from '@/utils/promiseWX';
import constant from '@/constants';
export default {
  props: {
    value: String
  },
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
          let image = res.tempFilePaths[0]
          this.bgImg = image;
          this.loading = true;
          return image;
        })
        .then(image => {
          return promiseWX.uploadFile({
              url: constant.fileUploadUrl, //仅为示例，非真实的接口地址
              filePath: image,
              name: 'file',
              formData: {
                'user': 'test'
              }
            })
            .then(res => {
              let imgUrl = JSON.parse(res.data)
                .data.src
              this.$emit('input', imgUrl);
            })
        })
    },
    previewImage() {
      if (this.image !== null) {
        promiseWX.previewImage({
          urls: [this.bgImg]
        })
      }
    }
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
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue && !oldValue) {
        this.bgImg = constant.baseURL + newValue;
      }
    }
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
