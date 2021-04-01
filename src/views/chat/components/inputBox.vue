<!--
 * @Author: astar
 * @Date: 2021-01-30 15:21:05
 * @LastEditors: astar
 * @LastEditTime: 2021-04-01 14:50:21
 * @Description: 聊天输入框
 * @FilePath: \vue-chat\src\views\chat\components\inputBox.vue
-->
<template>
<div class="input-box" ref="inputbox">
  <i class="iconfont icon-biaoqing" @click="toggleShowExpression"></i>
  <div
    ref="input"
    class="input"
    contenteditable
    @keydown.enter="sendMessage"
    @click="getLastEditRange"
    @input="getLastEditRange"
    placeholder="按Enter发送"
  />
  <s-popup class="expression-popup" v-model="showExpression" place="bottom" :x="pos.x" :y="pos.y" height="110px" :width="popupWidth">
    <expression :onSelectExpression="onSelectExpression"></expression>
  </s-popup>
</div>
</template>
<script>
import expression from './expression';
import { getElementPagePosition } from '@/utils';
export default {
  data () {
    return {
      popupWidth: '0px',
      pos: { x: '0', y: '0' }, // popup左下角位置
      showExpression: false,
      lastEditRange: 0,
      insertAtCursor: null,
    }
  },
  created () {
    const _this = this
    this.$nextTick(() => {
      _this.dealWithPasteProblem();
      _this.computePopupStyle();

      window.addEventListener(
        "resize",
        _this.computePopupStyle,
        false
      );

      _this.$refs.input.focus();
      _this.getLastEditRange();
      _this.$refs.input.blur();
    })
  },
  methods: {
    computePopupStyle () {
      this.popupWidth = window.getComputedStyle(this.$refs.inputbox).width;
      this.pos = getElementPagePosition(this.$refs.inputbox);
    },
    toggleShowExpression () {
      this.showExpression = !this.showExpression
      if (this.showExpression) { // 点击表情包，输入框不失去焦点
        this.insertAtCursor('')
      }
    },
    /**
     * 解决复制粘贴文本把样式也复制过来的问题
     * @author astar
     * @date 2021-02-02 17:52
     */
    dealWithPasteProblem () {
      document.querySelector('div[contenteditable="true"]').addEventListener("paste", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var text = '', event = (e.originalEvent || e);
        if (event.clipboardData && event.clipboardData.getData) {
            text = event.clipboardData.getData('text/plain');
        } else if (window.clipboardData && window.clipboardData.getData) {
            text = window.clipboardData.getData('Text');
        }
        if (document.queryCommandSupported('insertText')) {
            document.execCommand('insertText', false, text);
        } else {
            document.execCommand('paste', false, text);
        }
      });
    },
    /**
     * 按enter键发送数据，文本框不允许换行
     * @author astar
     * @date 2021-02-02 17:53
     * @param {Event} e - keydown事件
     */
    sendMessage (e) {
      e.preventDefault();
      this.$emit('send', this.getJSONFromInput());
      e.target.innerHTML = null;
      this.showExpression = false;
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
     * 选择emoji后的回调函数，将选择的emoji插入最后光标所在处
     * @author astar
     * @date 2021-02-02 17:56
     * @param {*}
     * @returns {*}
     */
    onSelectExpression (expression) {
      // this.showExpression = false
      this.insertAtCursor && this.insertAtCursor(expression)
    },
    /**
     * 将输入框内容转换为JSON格式数据
     * @author astar
     * @date 2021-02-02 18:02
     */
    getJSONFromInput () {
      const $ele = this.$refs.input
      const $children = $ele.childNodes
      let result = []
      $children.forEach(child => {
        let nodeType = child.nodeType
        console.log(nodeType)
        if (nodeType === 3 && child.textContent) { // 普通文本
          result.push({
            kind: 'text',
            value: child.textContent // 还需转义,到时候再说吧
          })
          console.log(child.textContent)
        } else if (nodeType === 1) { // 元素节点, 目前只有emoji类型，后期考虑其他
          if ((new RegExp(/^emoji-.*/)).test(child.dataset.name)) {
            result.push({
              kind: 'emoji',
              value: child.dataset.name.replace(/^emoji-/, '')
            })
            console.log(child.dataset.name)
          }
        }
      })
      return result
    }
  },
  beforeDestroy () {
    window.removeEventListener("resize", this.computePopupStyle);
  },
  components: {
    expression
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
    line-height: 20px;
  }
}
</style> 