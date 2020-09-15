/*
 * @author: cmx
 * @Date: 2020-09-15 18:19:35
 * @LastEditors: cmx
 * @LastEditTime: 2020-09-15 18:21:27
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\store\modules\user.js
 */
const user = {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    SET_USER_INFO: (state, obj) => {
      state.userInfo = obj
    }
  }
}

export default user