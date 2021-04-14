/*
 * @Author: astar
 * @Date: 2021-04-12 14:29:25
 * @LastEditors: astar
 * @LastEditTime: 2021-04-14 13:46:24
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\utils\notify.js
 */
export default function (title, body, attrs = { icon: '', tag: (new Date()).getTime(), duration: 300 }) {
  if (window.Notification && window.Notification.permission === 'granted') {
    const n = new window.Notification(
      title,
      {
        icon: attrs.icon,
        body: body,
        tag: attrs.tag
      },
    );
    n.onclick = function handleClick() {
      window.focus();
      this.close();
    };
    setTimeout(n.close.bind(n), attrs.duration);
  }
}