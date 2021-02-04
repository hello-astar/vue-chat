<!--
 * @Author: astar
 * @Date: 2021-02-04 13:58:20
 * @LastEditors: astar
 * @LastEditTime: 2021-02-04 15:50:07
 * @Description: 弹窗
 * @FilePath: \vue-chat\src\components\dialog\index.vue
-->
<template>
<div class="dialog" v-if="visible">
  <div class="dialog-container">
    <h3 class="dialog-container_header"><i class="iconfont icon-chongwutubiao18"/>{{title || '温馨提示'}}</h3>
    <div class="dialog-container_content">
      <slot>
      </slot>
    </div>
    <div class="dialog-container_footer">
      <slot name="footer">
        <div class="btn cancel-btn" @click="$emit('cancel')">取消</div>
        <div class="btn" @click="$emit('confirm')">确定</div>
      </slot>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 's-dialog',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    title: String
  },
  watch: {
    value: {
      immediate: true,
      handler: function (val) {
        this.visible = val
      }
    },
    visible (val) {
      this.$emit('input', val)
    }
  },
  data () {
    return {
      visible: false
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(33,33,33,.5);
  &-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 80%;
    min-width: 60%;
    max-height: 80%;
    overflow: auto;
    padding: 0 10px;
    border-radius: 4px;
    background: #fff;
    color: #333;
    &_header {
      text-align: center;
    }
    &_content {
      font-size: 12px;
      padding: 10px 0;
    }
    &_footer {
      display: flex;
      text-align: center;
      border-top: 1px solid #f6f6f6;
      .btn {
        position: relative;
        width: 50%;
        line-height: 40px;
        &:first-child:after {
          position: absolute;
          top: 0;
          right: 0;
          content: '\20';
          display: block;
          height: 100%;
          width: 1px;
          background: #f6f6f6;
        }
        &.cancel-btn {
          color: #999;
        }
      }
    }
  }
}
</style>