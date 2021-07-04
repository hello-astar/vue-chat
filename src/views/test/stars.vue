<!--
 * @Description: 星星效果
 * @Author: astar
 * @Date: 2021-07-04 18:39:34
 * @LastEditTime: 2021-07-04 18:42:05
 * @LastEditors: astar
-->
<template>
  <div class="home-page">
    <!-- 背景 -->
    <ul class="home-page__stars" id="stars">
      <li
        class="home-page__stars__item"
        v-for="item in 30" :key="item"
        :style="{left: item * Math.random() * 500 + 'px', top: item * Math.random() * 200 + 'px', animationDelay: Math.random() * 0.8 + 's'}"
      ></li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.home-page {
  position: relative;
  height: 100%;
  overflow: auto;
  &__stars {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &__item {
      position: absolute;
      left: 20px;
      width: 1px;
      background: transparent;
      opacity: 0;
      animation: fall 5s infinite linear;
      &:after {
        content: '';
        display: block;
        border: 0px solid #fff;
        border-width: 0px 90px 2px 90px;
        border-color: transparent transparent transparent rgba(255, 255, 255, .5);
        box-shadow: 0 0 1px 0 rgba(255, 255, 255, .1);
        /*变形*/       
        transform: rotate(-45deg) translate3d(1px, 3px, 0);
        transform-origin: 0% 100%;
      }
      @keyframes fall {
        0% {
          opacity: 0;
          transform: scale(0.5) translate3d(0, 0, 0);
        }
        50% {
          opacity: 1;
          transform: scale(1) translate3d(-250px, 250px, 0);
        }
        100% {
          opacity: 0;
          transform: scale(1.5) translate3d(-500px, 500px, 0);
        }
      }
    }
  }
}
</style>