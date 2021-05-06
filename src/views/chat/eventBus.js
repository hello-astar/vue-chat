/*
 * @Author: astar
 * @Date: 2021-05-06 17:15:31
 * @LastEditors: astar
 * @LastEditTime: 2021-05-06 17:59:26
 * @Description: 使用eventBus实现组件间通信
 * @FilePath: \vue-chat\src\views\chat\eventBus.js
 */
import Vue from 'vue';
const Bus = new Vue();

export default class eventBus {
  static REQUEST_GROUP_LIST = 'REQUEST_GROUP_LIST';
  
  constructor (name) {
    this.component = name;
    this.listeners = [];
  }

  // 发布消息
  broadcast (type, data) {
    console.log(`${this.component}发布${type}消息`);
    Bus.$emit(type, data);
  }

  // 订阅消息
  addListener (type, listener) {
    console.log(`${this.component}订阅${type}消息`);
    Bus.$on(type, listener);
    this.listeners.push(type);
  }

  // 关闭订阅
  offListener () {
    this.listeners.forEach(listener => {
      console.log(`${this.component}关闭监听发${listener}事件`);
      Bus.$off(listener);
    });
  }
}