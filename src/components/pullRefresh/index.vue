<!--
 * @Author: astar
 * @Date: 2021-02-06 10:50:18
 * @LastEditors: astar
 * @LastEditTime: 2021-03-02 15:52:12
 * @Description: 下拉刷新
 * @FilePath: \vue-chat\src\components\pullRefresh\index.vue
-->
<template>
<!-- 下拉刷新 上拉加载更多-->
  <div class="container-wrapper"
    @touchstart="startTouch"
    @touchmove="move"
    @touchend="endTouch"
    ref="container"
  >
    <div class="content" ref="content">
      <!-- 下拉显示 -->
      <div class="status" :style="{'height': marginTop + 'px'}">
        <div class="msg" :style="{'line-height': height + 'px'}">
          <i class="icon iconfont icon-chongwutubiao16" :class="loading !== 2 ? 'stop' : ''"/>
          {{msg}}
        </div>
      </div>
      <!-- 显示的数据 -->
      <slot name="main" />
      <!-- 上拉显示 -->
      <div class="status" v-show="gesture === 2" :style="{'height': height + 'px'}">
        <div class="msg" :style="{'line-height': height + 'px'}">
          <i class="icon iconfont icon-chongwutubiao16" />
          {{msg}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BEFORE_LOAD, PULLING, LOADING, NO_DATA, REFRESH_SUCCESS, REFRESH_FAIL } from '@/utils/consts';

export default {
  name: 'pull-refresh',
  data () {
    return {
      loading: 0, // 是否正在加载 0-提示下拉更新，1-提示松开更新，2-加载中，（3- 暂无更新内容 4 - 更新结束）
      touchStart: 0, // 触摸起始点
      distance: 0, // 手指滑动距离
      timer: 0,
      gesture: 0,
      marginTop: 104, // 下拉的最大长度
      height: 44 // 最小长度
    }
  },
  props: {
    loadStatus: {
      type: Number
    },
    refreshNext: {
      type: Function
    },
    loadMoreNext: {
      type: Function
    }
  },
  model: {
    prop: 'loadStatus',
    event: 'change-status'
  },
  computed: {
    /**
     * 文案描述
     * @author astar
     * @date 2021-02-06 14:59
     */
    msg () {
      if (this.loading === BEFORE_LOAD) {
        return '拉动更新'
      } else if (this.loading === PULLING) {
        return '松开获取历史数据'
      } else if (this.loading === LOADING) {
        return '加载中...'
      } else if (this.loading === NO_DATA) {
        return '暂无更新内容'
      } else if (this.loading === REFRESH_SUCCESS) {
        return '刷新成功'
      } else if (this.loading === REFRESH_FAIL) {
        return '更新失败'
      }
      return ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      const $content = this.$refs.content
      $content.style.marginTop = `${-1 * this.marginTop}px`
      $content.style.transition = 'none'
      this.loading = 0
      this.touchStart = 0
      this.distance = 0
      this.gesture = 0
    },
    startTouch (e) {
      const clientY = e.targetTouches[0].clientY
      if (this.loading === 0) {
        this.touchStart = clientY
      }
    },
    move (e) {
      const $container = this.$refs.container
      const $content = this.$refs.content
      const distance = e.targetTouches[0].clientY - this.touchStart // 滑动距离
      const scrollTop = $container.scrollTop
      const clientHeight = $container.clientHeight
      const scrollHeight = $container.scrollHeight
      if (scrollTop === 0 && this.loading !== 2 && distance > 0 && this.refreshNext) { // 页面没有下滑 并且数据没有更新 并且是下拉
        this.distance = distance
        this.gesture = 1
        if (this.distance < this.marginTop) {
          $content.style.marginTop = `${this.distance - this.marginTop}px`
          if (this.distance >= this.height) {
            this.loading = 1
          }
        }
      } else if (scrollTop + clientHeight === scrollHeight && this.loading !== 2 && distance < 0 && this.loadMoreNext) { // 上拉 // 除法有误差，设置误差范围0.4rem
        // 上拉加载
        this.gesture = 2
        this.loading = 1
      }
    },
    endTouch () {
      // 松开判断loading
      if (this.loading === 1) {
        this.loading = 2 // 加载中
        // 根据手势判断上拉还是下拉
        if (this.gesture === 1 && this.refreshNext) {
          const $content = this.$refs.content
          $content.style.marginTop = `${-1 * this.marginTop + this.height}px`
          this.refreshNext().then(res => {
            if (res) {
              this.loading = 3
            } else {
              this.loading = 4
            }
            this.backToTop(500)
          }).catch(() => {
            this.loading = 5
            this.backToTop(500)
          })
        } else if (this.gesture === 2 && this.loadMoreNext) {
          this.loadMoreNext().then(res => {
            // 加载成功，判断是否有更新内容 to3 or 4
            if (res) {
              this.loading = 3
            } else {
              this.loading = 4
            }
            this.initData()
          }).catch(() => {
            this.loading = 5
            this.initData()
          })
        }
      } else {
        if (this.gesture === 1) {
          this.backToTop(0)
        }
      }
    },
    backToTop (duration) {
      console.log(duration)
      if (this.timer) {
        clearTimeout(this.timer)
      }
      const _this = this
      const $content = _this.$refs.content
      $content.style.marginTop = `${-1 * this.marginTop}px`
      $content.style.transition = 'margin-top .2s .8s ease-in'
      this.timer = setTimeout(function () {
        _this.initData()
      }, 1000)
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
</script>
<style lang="scss" scoped>
// @import '~@/assets/less/func';
.container-wrapper {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; // 解决h5苹果ios系统中overflow: auto滑动不流畅
  .content {
    .status {
      position: relative;
      background-color: #fff;
      .msg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        color: rgb(99, 99, 99);
        .icon {
          display: inline-block;
          margin-right: 5px;
          height: 20px;
          width: 20px;
          // animation: rotate .75s linear infinite;
          &.stop {
            // animation: none;
          }
        }
      }
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0)
    }
    to {
      transform: rotate(360deg)
    }
  }
}
</style>