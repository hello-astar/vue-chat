/*
 * @author: cmx
 * @Date: 2020-09-15 18:19:35
 * @LastEditors: astar
 * @LastEditTime: 2020-09-20 15:37:56
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
        if (res.result === 1) {
          commit('SET_USER_INFO', res.data);
          return res.data;
        }
        return Promise.reject(res.msg);
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