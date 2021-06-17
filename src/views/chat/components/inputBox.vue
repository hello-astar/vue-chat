<!--
 * @Author: astar
 * @Date: 2021-01-30 15:21:05
 * @LastEditors: astar
 * @LastEditTime: 2021-06-17 17:54:02
 * @Description: 聊天输入框
 * @FilePath: \vue-chat\src\views\chat\components\inputBox.vue
-->
<template>
<div class="input-box" ref="inputbox">
  <i class="iconfont icon-biaoqing" @click="toggleshowEmojis"></i>
  <div
    ref="input"
    class="input"
    contenteditable
    @keydown.enter="sendMessage"
    @click="getLastEditRange"
    @input="getLastEditRange();searchGif()"
    placeholder="按Enter发送"
  />
  <s-popup v-model="showEmojis" place="bottom" :x="pos.x" :y="pos.y" :width="popupWidth">
    <div class="emoji-popup">
      <message v-for="(item, idx) in EMOJIS" :key="idx" :item="{ kind: KINDS.EMOJI, value: item }" @click.native="insertHTMLFromJson({ kind: KINDS.EMOJI, value: item })"></message>
    </div>
  </s-popup>
  <s-popup v-model="showGifs" place="bottom" :x="pos.x" :y="pos.y" :width="popupWidth">
    <message @click.native="onSelectImg(item.url)" v-for="item in gifs" :key="item.id" :item="{ kind: KINDS.IMG, value: item.url }" />
  </s-popup>
</div>
</template>
<script>
import { getElementPagePosition, debounce } from '@/utils';
import { getHTMLFromJSON, getJSONFromInput, KINDS, EMOJIS, dealWithPasteProblem } from '@/utils/editor.js';
import { getGifs } from '@/request';
import message from './message';

export default {
  data () {
    return {
      EMOJIS,
      KINDS,
      popupWidth: '0px',
      pos: { x: '0', y: '0' }, // popup左下角位置
      showEmojis: false,
      lastEditRange: 0,
      insertAtCursor: null,
      showGifs: false,
      gifs: []
    }
  },
  mounted () {
    dealWithPasteProblem();
    this.computePopupStyle();
    window.addEventListener(
      'resize',
      this.computePopupStyle,
      false
    );
    this.$refs.input.focus();
    this.getLastEditRange();
    this.$refs.input.blur();
  },
  methods: {
    searchGif: debounce(function () {
      let children = this.$refs.input.childNodes;
      if (children[0] && children[0].nodeType === 3 && children[0].textContent && children[0].textContent.length <= 3) {
        getGifs({ keyword: children[0].textContent }).then(res => {
          this.gifs = res.data
          if (res.data.length) {
            this.showGifs = true
            this.showEmojis = false
          }
        });
      } else {
        this.showGifs = false
      }
    }, 300),
    /**
     * 计算emoji popup的位置
     * @author astar
     * @date 2021-04-01 15:07
     */
    computePopupStyle () {
      this.popupWidth = window.getComputedStyle(this.$refs.inputbox).width;
      this.pos = getElementPagePosition(this.$refs.inputbox);
    },
    /**
     * 展示或取消展示emoji popup
     * @author astar
     * @date 2021-04-01 15:08
     */
    toggleshowEmojis () {
      this.showEmojis = !this.showEmojis
      if (this.showEmojis) { // 点击表情包，输入框不失去焦点
        this.insertAtCursor('')
      }
    },
    /**
     * 按enter键发送数据，文本框不允许换行
     * @author astar
     * @date 2021-02-02 17:53
     * @param {Event} e - keydown事件
     */
    sendMessage (e) {
      e && e.preventDefault();
      this.$emit('send', getJSONFromInput(this.$refs.input));
      this.$refs.input.innerHTML = null;
      this.showEmojis = false;
      this.showGifs = false;
    },
    /**
     * 保存输入框光标最后所在位置，存入insertAtCursor函数
     * @author astar
     * @date 2021-02-02 14:23
     */
    getLastEditRange () {
      if (window.getSelection && window.getSelection().getRangeAt) { // chrome等
        let selection = window.getSelection();
        if (selection.rangeCount) {
          let range = selection.getRangeAt(0);
          range.collapse(false);
          this.insertAtCursor = function (text) {
            let node = range.createContextualFragment(text);
            let c = node.lastChild;
            range.insertNode(node);
            if (c) {
              range.setEndAfter(c);
              range.setStartAfter(c);
            }
            let j = window.getSelection();
            j.removeAllRanges();
            j.addRange(range);
          }
        }
      } else if (document.selection && document.selection.createRange) { // IE
        let range = document.selection.createRange()
        this.insertAtCursor = function (text) {
          range.pasteHTML(text)
        }
      }
    },
    /**
     * 将dom字符串插入光标位置
     * @author astar
     * @date 2021-02-02 17:56
     * @param {Object} data - { kind, value } 可用getHTMLFromJSON函数转换为相应dom string
     * @returns {*}
     */
    insertHTMLFromJson (data) {
      this.insertAtCursor && this.insertAtCursor(getHTMLFromJSON(data));
    },
    /**
     * 选择表情包，直接发送
     * @author astar
     * @date 2021-04-16 17:19
     */
    onSelectImg (url) {
      this.$refs.input.innerHTML = getHTMLFromJSON({ kind: KINDS.IMG, value: url })
      this.sendMessage()
      this.showGifs = false
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.computePopupStyle);
  },
  components: {
    message
  }
}
</script>
<style lang="scss" scoped>
.input-box {
  position: relative;
  .icon-biaoqing {
    position: absolute;
    top: 5px;
    left: 10px;
    cursor: pointer;
  }
  .input {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 10px 35px 10px;
    outline: none;
    overflow: auto;
    background: #fff;
    font-size: 12px;
    line-height: 18px;
  }
  .emoji-popup {
    padding: 5px;
  }
}
</style> 