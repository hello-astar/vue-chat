<!--
 * @Author: astar
 * @Date: 2020-11-12 11:19:43
 * @LastEditors: astar
 * @LastEditTime: 2021-07-04 19:28:13
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\home\index.vue
-->
<template>
  <div class="home-page">
    <main class="home-page__main">
      <ul class="img-list" @click="dealWithClick">
        <li :data-route="item.route" v-for="(item, index) in imgList" :key="index" class="img-list__item" :style="{'background': `url(${item.img}) no-repeat center`, 'background-size': 'cover'}">
          <p class="label" :data-route="item.route">{{item.label}}</p>
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
        { img: 'https://w.wallhaven.cc/full/nz/wallhaven-nzo8xj.jpg', label: '聊天室', route: '/chat' },
        { img: 'https://w.wallhaven.cc/full/0j/wallhaven-0jk33y.png', label: '大文件上传', route: '/upload' },
        { img: 'https://w.wallhaven.cc/full/y8/wallhaven-y8qe1l.jpg', label: 'swiper', route: '/test/aaa' },
        { img: 'https://th.wallhaven.cc/small/96/96qy3w.jpg', label: '关于', route: '/home/about' },
        { img: 'https://w.wallhaven.cc/full/n6/wallhaven-n66m2x.jpg', label: '流星效果', route: '/test/stars' }
      ]
    }
  },
  methods: {
    /**
     * 事件委托
     * @author astar
     * @date 2021-03-03 18:21
     */
    dealWithClick (e) {
      if (['LI', 'P'].includes(e.target.nodeName.toUpperCase()) && e.target.dataset.route) {
        this.$router.push(e.target.dataset.route)
      }
    }
  }
}
</script>

<style lang="scss">
.home-page {
  position: relative;
  height: 100%;
  overflow: auto;
  &__main {
    width: 100%;
    padding: 4%;
    .img-list {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      &__item {
        position: relative;
        flex-grow: 1;
        min-width: 300px;
        min-height: 200px;
        margin: 15px 10px;
        overflow: hidden;
        cursor: pointer;
        .label {
          display: inline-block;
          font-size: 18px;
          background: rgba(255,255,255,.7);
          padding: 10px 20px;
          color: black;
          backdrop-filter: blur(8px);
        }
      }
    }
  }
}
</style>