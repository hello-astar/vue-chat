/*
 * @Author: astar
 * @Date: 2021-04-16 17:52:21
 * @LastEditors: astar
 * @LastEditTime: 2021-04-16 18:29:43
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\chat\components\message.js
 */
import { KINDS, EMOJIS } from '@/utils/editor';

export default {
  props: {
    item: {
      type: Object,
      required: true,
      validator: value => Object.keys(value).every(key => ['kind', 'value'].includes(key))
    }
  },
  render (createElement) {
    const { kind, value } = this.item;
    const mapEle = {
      [KINDS.TEXT]: {
        ele: 'span',
        attrs: {},
        content: value
      },
      [KINDS.AT]: {
        ele: 'span',
        attrs: {},
        content: `@${value} `
      },
      [KINDS.EMOJI]: {
        ele: 'i',
        attrs: {
          class: 'emoji-icon',
          style: `background-position: left 0 top ${EMOJIS.indexOf(value) * 100 / (EMOJIS.length - 1)}%`
        }
      },
      [KINDS.IMG]: {
        ele: 'img',
        attrs: {
          src: value
        }
      }
    };
    return createElement(mapEle[kind].ele, {
      attrs: {
        // contenteditable: false,
        'data-kind': kind,
        'data-value': value,
        ...mapEle[kind].attrs
      }
    }, mapEle[kind].content);
  }
}