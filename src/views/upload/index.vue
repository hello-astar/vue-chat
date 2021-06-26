<!--
 * @Description: 上传图片
 * @Author: astar
 * @Date: 2020-09-20 18:24:39
 * @LastEditTime: 2021-06-26 20:43:28
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
      <s-avatar shape="circle" :src="dataURL" size="large"/>
    </slot>
  </div>
</div>
</template>
<script>
// import qiniu from 'qiniu-js';
import { qiniuTokenReq, qiniuUploadReq, uploadImg } from '@/request';

export default {
  data () {
    return {
      file: '',
      dataURL: ''
    }
  },
  methods: {
    urlToBase64(url) {
      return new Promise ((resolve,reject) => {
        let image = new Image();
        image.onload = function() {
          let canvas = document.createElement('canvas');
          canvas.width = this.naturalWidth;
          canvas.height = this.naturalHeight;
          // 将图片插入画布并开始绘制
          canvas.getContext('2d').drawImage(image, 0, 0);
          let result = canvas.toDataURL('image/png')
          resolve(result);
        };
        // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
        image.setAttribute("crossOrigin",'Anonymous');
        image.src = url;
        // 图片加载失败的错误处理
        image.onerror = () => {
            reject(new Error('图片流异常'));
        };
      })
    },
    // 原理：利用URL.createObjectURL为blob对象创建临时的URL
    base64ToBlob ({ b64data = '', contentType = '', sliceSize = 512 } = {}) {
        return new Promise((resolve) => {
          // 使用 atob() 方法将数据解码
          let byteCharacters = atob(b64data);
          let byteArrays = [];
          for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);
            let byteNumbers = [];
            for (let i = 0; i < slice.length; i++) {
                byteNumbers.push(slice.charCodeAt(i));
            }
            // 8 位无符号整数值的类型化数组。内容将初始化为 0。// 如果无法分配请求数目的字节，则将引发异常。
            byteArrays.push(new Uint8Array(byteNumbers));
          }
          let result = new Blob(byteArrays, {
            type: contentType
          })
          result = Object.assign(result,{
            // jartto: 这里一定要处理一下 URL.createObjectURL
            preview: URL.createObjectURL(result),
            name: `图片示例.png`
          });
          resolve(result)
        })
    },
    // 原理：利用fileReader的readAsDataURL，将blob转为base64

    blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          resolve(e.target.result);
        };
        // readAsDataURL
        fileReader.readAsDataURL(blob);
        fileReader.onerror = () => {
          reject(new Error('文件流异常'));
        };
      });
    },
    beforeUpload () {
      this.$refs.input.click();
    },
    change (e) {
      const _this = this;
      var fileReader = new FileReader();
      this.file = e.target.files[0];
      console.log(this.file)
      fileReader.readAsDataURL(this.file);
      fileReader.onload = function () {
        _this.dataURL = this.result;
        _this.$emit('change', this.result);
      }
      const formData = new FormData();
      formData.append('file', this.file);
      uploadImg(formData, { headers: { 'content-type': 'multipart/form-data' }, responseType: 'blob', emulateJSON: true })
    },
    upload () {
      return qiniuTokenReq().then((res) => {
        let token = res.data.token;
        const formData = new FormData();
        formData.append('token', token);
        formData.append('file', this.file);
        return qiniuUploadReq(formData);
      })
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