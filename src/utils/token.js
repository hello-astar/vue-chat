/*
 * @Description: 保存uuid
 * @Author: astar
 * @Date: 2020-09-09 21:27:01
 * @LastEditTime: 2021-01-19 10:50:11
 * @LastEditors: astar
 */
const TOKEN_NAME = 'VUE_CHAT_USER_TOKEN';

export function setToken (token) {
  localStorage.setItem(TOKEN_NAME, token);
}

export function getToken () {
  return localStorage.getItem(TOKEN_NAME);
}

export function removeToken () {
  localStorage.removeItem(TOKEN_NAME);
}
