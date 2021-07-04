<!--
 * @Description: 上传图片
 * @Author: astar
 * @Date: 2020-09-20 18:24:39
 * @LastEditTime: 2021-07-04 22:38:09
 * @LastEditors: astar
-->
<template>
<div class="upload-img">
  <input ref="input" class="upload-img__input" type="file" accept="image/*" @change="change">
  <div class="upload-img__icon" v-show="!dataURL" @click="beforeUpload">
    <slot name="icon">
      <i class="iconfont icon-upload-avatar"></i>
    </slot>
  </div>
  <div class="upload-img__preview" @click="beforeUpload">
    <slot name="preview">
      <s-avatar v-bind="$props" :src="dataURL" size="large"/>
    </slot>
  </div>
</div>
</template>
<script>
// import qiniu from 'qiniu-js';
// import { qiniuTokenReq, qiniuUploadReq } from '@/request';
import { uploadImg } from '@/request';

export default {
  name: 's-upload-img',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  watch: {
    value: {
      immediate: true,
      handler: function (val) {
        this.dataURL = val
      }
    }
  },
  data () {
    return {
      file: '',
      dataURL: ''
    }
  },
  methods: {
    beforeUpload () {
      this.$refs.input.click();
    },
    change (e) {
      const _this = this;
      var fileReader = new FileReader();
      this.file = e.target.files[0];
      fileReader.readAsDataURL(this.file);
      fileReader.onload = function () {
        _this.dataURL = this.result;
        _this.$emit('change', this.result);
      }
    },
    upload () {
      // return qiniuTokenReq().then((res) => {
      //   let token = res.data.token;
      //   const formData = new FormData();
      //   formData.append('token', token);
      //   formData.append('file', this.file);
      //   return qiniuUploadReq(formData);
      // })
      const formData = new FormData();
      formData.append('file', this.file);
      return uploadImg(formData, { headers: { 'content-type': 'multipart/form-data' }, responseType: 'blob', emulateJSON: true });
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-img {
  position: relative;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  &__input {
    display: none;
  }
  &__icon, &__preview {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  &__icon {
    .icon-upload-avatar {
      font-size: 40px;
    }
  }
}
</style>