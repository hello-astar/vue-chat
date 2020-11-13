<!--
 * @author: cmx
 * @Date: 2020-11-12 11:19:43
 * @LastEditors: cmx
 * @LastEditTime: 2020-11-13 15:42:58
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\home\index.vue
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
    <main class="home-page__main">
      <ul class="img-list">
        <li v-for="(item, index) in imgList" :key="index" class="img-list__item" @click="item.route && $router.push(item.route)">
          <img :src="item.img" alt="">
          <p class="label">{{item.label}}</p>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgList: [
        { img: 'https://th.wallhaven.cc/lg/9m/9mxz8k.jpg', label: '聊天室', route: '/chat' },
        { img: 'https://th.wallhaven.cc/small/96/96qy3w.jpg', label: '关于', route: '/about' },
        { img: 'https://th.wallhaven.cc/small/6k/6k8kkx.jpg', label: '敬请期待' },
        { img: 'https://w.wallhaven.cc/full/ox/wallhaven-oxkjgm.jpg', label: 'D' }
      ]
    }
  }
}
</script>

<style lang="scss">
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
  &__main {
    width: 100%;
    padding: 4%;
    .img-list {
      max-width: 850px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      &__item {
        position: relative;
        flex-grow: 1;
        height: 150px;
        margin: 15px 10px;
        overflow: hidden;
        box-shadow: rgba(255,255,255,.2) 0 1px 5px 0px;
        cursor: pointer;
        img {
          object-fit: cover;
          height: 100%;
          min-width: 100%;
          max-width: 100%;
        }
        .label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>