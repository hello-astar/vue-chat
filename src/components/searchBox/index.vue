<!--
 * @Description: 搜索框
 * @Author: astar
 * @Date: 2020-09-08 20:54:56
 * @LastEditTime: 2020-09-08 22:29:04
 * @LastEditors: astar
-->
<template>
<div class="search-box-wrapper">
  <slot name="icon">
    <div class="search-icon"></div>
  </slot>
  <input type="text" :placeholder="placeholder" v-model="searchTxt" @input="input">
</div>
</template>
<script>
export default {
  data () {
    return {
      searchTxt: ''
    }
  },
  props: {
    value: String,
    placeholder: {
      type: String,
      default: '搜索'
    }
  },
  watch: {
    value: function (val) {
      this.searchTxt = val
    }
  },
  methods: {
    input (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.search-box-wrapper {
  width: 100%;
  background-color: #26292e;
  border-radius: 4px;
  .search-icon {
    display: inline-block;
    width: 32px;
    height: 32px;
    background: url('~@/assets/images/search.png') no-repeat center;
    background-size: 25px 25px;
    vertical-align: middle;
  }
  input {
    display: inline-block;
    height: 100%;
    background-color: #26292e;
    outline: 0;
    border: none;
    padding: 0 10px 0 8px;
    color: rgb(244, 244, 244);
    vertical-align: middle;
  }
}
</style>