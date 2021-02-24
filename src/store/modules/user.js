/*
 * @Author: astar
 * @Date: 2020-09-15 18:19:35
 * @LastEditors: astar
 * @LastEditTime: 2021-02-24 14:39:49
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\store\modules\user.js
 */
import { userInfoReq } from '@/request';
const user = {
  namespaced: true,
  state: {
    userInfo: {}
  },
  actions: {
    getUserInfo ({ commit }) {
      return userInfoReq().then(res => {
        commit('SET_USER_INFO', res.data);
      })
    }
  },
  mutations: {
    SET_USER_INFO: (state, obj) => {
      state.userInfo = obj
    }
  }
}

export default user