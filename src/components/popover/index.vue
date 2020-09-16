<!--
 * @author: cmx
 * @Date: 2020-09-14 17:47:08
 * @LastEditors: cmx
 * @LastEditTime: 2020-09-14 17:51:14
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\components\popover\index.vue
-->
<template>
<div class="">
  <slot>
    {{content}}
  </slot>
</div>
</template>
<script>
export default {
  props: {
    placement: {
      type: String
    },
    content: {
      type: String
    }
  }
}
</script>