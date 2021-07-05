/*
 * @Author: astar
 * @Date: 2020-09-15 18:19:35
 * @LastEditors: astar
 * @LastEditTime: 2021-07-05 15:07:29
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
    getUserInfoByToken ({ commit }) {
      return userInfoReq().then(res => {
        if (res.data) {
          commit('SET_USER_INFO', res.data);
        } else {
          return Promise.reject(res.msg)
        }
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