<!--
 * @Description: 搜索框
 * @Author: astar
 * @Date: 2020-09-08 20:54:56
 * @LastEditTime: 2021-02-23 17:07:05
 * @LastEditors: astar
-->
<template>
<div class="search-box-wrapper">
  <div class="search-box__icon">
    <slot name="icon">
      <div class="default_icon"></div>
    </slot>
  </div>
  <input type="text" :placeholder="placeholder" v-model="searchTxt" @input="input">
</div>
</template>
<script>
export default {
  name: 's-search-box',
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
  position: relative;
  padding-left: 35px;
  width: 100%;
  height: 32px;
  border-radius: 4px;
  .search-box__icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    .default_icon {
      width: 32px;
      height: 32px;
      background: url('~@/assets/images/search.png') no-repeat center;
      background-size: 25px 25px;
      vertical-align: middle;
    }
  }
  input {
    display: inline-block;
    width: 100px;
    height: 100%;
    background-color: transparent;
    outline: 0;
    border: none;
    padding: 0 10px 0 8px;
    color: rgb(244, 244, 244);
    vertical-align: middle;
  }
}
</style>