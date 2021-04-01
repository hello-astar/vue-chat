/*
 * @Author: astar
 * @Date: 2021-04-01 16:02:08
 * @LastEditors: astar
 * @LastEditTime: 2021-04-01 18:37:07
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\utils\editor.js
 */
export const KINDS = {
  TEXT: 'TEXT',
  AT: 'AT',
  EMOJI: 'EMOJI'
}
export const EMOJIS = [
  '呵呵', '哈哈', '吐舌', '啊', '酷', '怒', '开心', '汗', '泪', '黑线',
  '鄙视', '不高兴', '真棒', '钱', '疑问', '阴险', '吐', '咦', '委屈', '花心',
  '呼', '笑眼', '冷', '太开心', '滑稽', '勉强', '狂汗', '乖', '睡觉', '惊哭',
  '升起', '惊讶', '喷', '爱心', '心碎', '玫瑰', '礼物', '星星月亮', '太阳', '音乐',
  '灯泡', '蛋糕', '彩虹', '钱币', '咖啡', 'haha', '胜利', '大拇指', '弱', 'ok',
]
/**
 * 将json解析为html
 * @author astar
 * @date 2021-04-01 16:02
 * @param {Object} data - 包含kind和value属性值
 * @returns {DOM String}
 */
export function getHTMLFromJSON (data) {
  switch (data.kind) {
    // case KINDS.TEXT:
    //   return `<span contenteditable="false">${data.value}</span>`;
    case KINDS.AT:
      return `<span data-kind="${KINDS.AT}" data-value="${data.value}" contenteditable="false">@${data.value} </span>`;
    case KINDS.EMOJI:
      return `<i class="emoji-icon" data-kind="${KINDS.EMOJI}" data-value="${data.value}" contenteditable="false" style="background-position: left 0 top ${EMOJIS.indexOf(data.value) * 100 / (EMOJIS.length - 1)}%"></i>`;
    default:
      return null;
  }
}

/**
 * 将HTML转换为JSON格式数据
 * @author astar
 * @date 2021-02-02 18:02
 */
export function getJSONFromInput ($ele) {
  const $children = $ele.childNodes
  let result = []
  $children.forEach(child => {
    let nodeType = child.nodeType
    if (nodeType === 3 && child.textContent) { // 普通文本
      result.push({
        kind: KINDS.TEXT,
        value: child.textContent // 还需转义,到时候再说吧
      })
    } else if (nodeType === 1) { // 元素节点, 目前只有emoji类型，后期考虑其他
      let options = child.dataset
      result.push({
        kind: options.kind,
        value: options.value
      })
    }
  })
  return result
}