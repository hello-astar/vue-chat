/*
 * @Description: 保存uuid
 * @Author: astar
 * @Date: 2020-09-09 21:27:01
 * @LastEditTime: 2020-09-10 09:47:37
 * @LastEditors: cmx
 */
const UUID_NAME = 'VUE_CHAT_USER_UUID';

export function setUUID (uuid) {
  localStorage.setItem(UUID_NAME, uuid);
}

export function getUUID () {
  return localStorage.getItem(UUID_NAME);
}

export function removeUUID () {
  localStorage.removeItem(UUID_NAME)
}
