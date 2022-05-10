<!--
 * @Description: 上传图片
 * @Author: astar
 * @Date: 2020-09-20 18:24:39
 * @LastEditTime: 2022-01-27 18:08:52
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
    },
    shape: {
      type: String
    },
    size: {
      type: String
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
      this.file = e.target.files[0];
      this.dataURL.startsWith('blob:') && URL.revokeObjectURL(this.dataURL)
      this.dataURL = URL.createObjectURL(this.file);
      this.$emit('change', this.dataURL);
    },
    // 切片
    sliceToChunks (file, piece = 1024 * 1024 * 5) {
      console.log(file)
      let totalSize = file.size
      let start = 0
      let end = piece
      let chunks = []
      while (start < totalSize) {
        chunks.push(file.slice(start, end))
        start = end
        end = end + piece
      }
      return chunks
    },
    // 分片上传
    async upload () {
      let file = this.file
      let chunks = this.sliceToChunks(file)
      let promises = []
      for (let i = 0, len = chunks.length; i < len; i++) {
        let formData = new FormData();
        formData.append('total', file.size)
        formData.append('file', chunks[i])
        formData.append('index', i)
        // 可以算个哈希值
        formData.append('sign', `${file.lastModified}${file.size}.${file.name.split('.').pop()}`)
        promises.push(uploadImg(formData, { headers: { 'content-type': 'multipart/form-data' } }).then(({ data }) => data))
      }
      const res = await Promise.all(promises.map(p => p.catch(e => {
        console.log(e)
      })));
      return res[0];
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