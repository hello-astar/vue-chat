/*
 * @Author: astar
 * @Date: 2021-04-16 17:52:21
 * @LastEditors: astar
 * @LastEditTime: 2021-04-16 23:21:33
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\chat\components\message.js
 */
import { getHTMLFromJSONConfig } from '@/utils/editor';

export default {
  props: {
    item: {
      type: Object,
      required: true,
      validator: value => ['kind', 'value'].every(key => value[key])
    }
  },
  render (createElement) {
    const { kind, value } = this.item;
    const config = getHTMLFromJSONConfig({ kind, value });
    return createElement(config.ele, {
      attrs: config.attrs
    }, config.body);
  }
}