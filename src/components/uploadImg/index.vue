<!--
 * @Description: 上传图片
 * @Author: astar
 * @Date: 2020-09-20 18:24:39
 * @LastEditTime: 2020-09-20 21:38:40
 * @LastEditors: astar
-->
<template>
<div class="upload-img">
  <input ref="input" class="upload-img__input" type="file" accept="image/*" @change="change">
  <div class="upload-img__icon" v-show="!temp" @click="beforeUpload">
    <slot name="icon">
      <i class="iconfont icon-upload-avatar"></i>
    </slot>
  </div>
  <div class="upload-img__preview" @click="beforeUpload">
    <slot name="preview">
      <avatar shape="circle" :src="temp" size="large"/>
    </slot>
  </div>
</div>
</template>
<script>
import avatar from '@/components/avatar';
import * as qiniu from 'qiniu-js';
import { qiniuTokenReq, qiniuUploadReq } from '@/request';

export default {
  data () {
    return {
      file: '',
      temp: ''
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
      fileReader.onload = function (e) {
        _this.temp = this.result;
        _this.$emit('change', this.result);
      }
    },
    upload () {
      return qiniuTokenReq().then(res => {
        console.log(res)
        if (res.result === 1) {
          return res.data;
        } else {
          this.$toast.text(res.msg, 'top');
        }
      }).then(({ token }) => {
        const formData = new FormData();
        formData.append('token', token);
        formData.append('file', this.file);
        return qiniuUploadReq(formData);
      })
    }
  },
  components: {
    avatar
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