/*
 * @Author: astar
 * @Date: 2020-09-14 10:30:03
 * @LastEditors: astar
 * @LastEditTime: 2020-09-14 11:47:51
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\utils\socket.js
 */
function CreateWebSocket (urlValue) {
  const { WebSocket, MozWebSocket } = window;
  if (WebSocket) return new WebSocket(urlValue);
  if (MozWebSocket) return new MozWebSocket(urlValue);
  return null;
}


export class WebsocketClass {
  constructor ({ url, params, onClose, onOpen, onMessage, onError }) {
    let paramsString = '';
    for (let key in params) { // 参数放入url中
      if (params.hasOwnProperty(key)) {
        let value = params[key];
        paramsString += (paramsString ? '&' : '')
        paramsString += `${key}=${encodeURIComponent(value)}`;
      }
    }
    this.socket = CreateWebSocket(`${url}?${paramsString}`);
    if (this.socket) {
      let rest = { onClose, onOpen, onMessage, onError };
      for (let key in rest) {
        if (rest.hasOwnProperty(key) && typeof rest[key] === 'function') {
        let item = rest[key];
          this.socket[key.toLocaleLowerCase()] = (evt) => {
            item(evt);
          };
        }
      }
    }
  }
  
  send (message) {
    if (this.socket) {
      this.socket.send(message);
    }
  }
}