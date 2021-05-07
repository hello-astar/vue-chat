/*
 * @Author: astar
 * @Date: 2021-04-12 14:29:25
 * @LastEditors: astar
 * @LastEditTime: 2021-05-07 23:56:49
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\utils\notify.js
 */
export default function (title, body, attrs) {
  let defaultAttrs = { icon: '', tag: (new Date()).getTime(), duration: 3000 };
  attrs = Object.assign(defaultAttrs, attrs);
  if (window.Notification && window.Notification.permission === 'granted') {
    const n = new window.Notification(
      title,
      {
        icon: attrs.icon,
        body: body,
        tag: attrs.tag
      }
    );
    n.onclick = function handleClick() {
      window.focus();
      this.close();
    };
    setTimeout(n.close.bind(n), attrs.duration);
  }
}