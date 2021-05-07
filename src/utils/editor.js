/*
 * @Author: astar
 * @Date: 2021-04-01 16:02:08
 * @LastEditors: astar
 * @LastEditTime: 2021-05-07 21:31:26
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\utils\editor.js
 */
// 全部功能
export const KINDS = {
  TEXT: 'TEXT', // 输入文字
  AT: 'AT', // 艾特
  EMOJI: 'EMOJI', // emoji表情
  IMG: 'IMG' // 搜索表情包
};

// emoji配置
export const EMOJIS = [
  '呵呵', '哈哈', '吐舌', '啊', '酷', '怒', '开心', '汗', '泪', '黑线',
  '鄙视', '不高兴', '真棒', '钱', '疑问', '阴险', '吐', '咦', '委屈', '花心',
  '呼', '笑眼', '冷', '太开心', '滑稽', '勉强', '狂汗', '乖', '睡觉', '惊哭',
  '升起', '惊讶', '喷', '爱心', '心碎', '玫瑰', '礼物', '星星月亮', '太阳', '音乐',
  '灯泡', '蛋糕', '彩虹', '钱币', '咖啡', 'haha', '胜利', '大拇指', '弱', 'ok',
];

// 从JSON转换为HTML配置项
export function getHTMLFromJSONConfig ({ kind, value }) {
  let normalAttrs = {
    'data-kind': kind,
    'data-value': value,
    'contenteditable': false
  }
  const mapEle = {
    [KINDS.TEXT]: {
      ele: 'span',
      attrs: normalAttrs,
      body: value
    },
    [KINDS.AT]: {
      ele: 'div',
      attrs: {
        ...normalAttrs,
        style: 'display: inline-block'
      },
      body: `@${value} `
    },
    [KINDS.EMOJI]: {
      ele: 'i',
      attrs: {
        ...normalAttrs,
        class: 'emoji-icon',
        style: `background-position: left 0 top ${EMOJIS.indexOf(value) * 100 / (EMOJIS.length - 1)}%`
      }
    },
    [KINDS.IMG]: {
      ele: 'img',
      attrs: {
        ...normalAttrs,
        src: value,
        style: 'max-width: 1.2rem;'
      }
    }
  };
  return mapEle[kind];
}

/**
 * 将json解析为html
 * @author astar
 * @date 2021-04-01 16:02
 * @param {Object} data - 包含kind和value属性值
 * @returns {DOM String}
 */
export function getHTMLFromJSON (data) {
  let config = getHTMLFromJSONConfig(data);
  let attrStr = Object.keys(config.attrs).map(key => `${key}='${config.attrs[key]}'`).join(' ');
  return `<${config.ele} ${attrStr}>${config.body || ''}</${config.ele}>`
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
    } else if (nodeType === 1) { // 元素节点, 目前只有emoji和at类型，后期考虑其他
      let options = child.dataset;
      if (options.kind && options.value) {
        result.push({
          kind: options.kind,
          value: options.value
        });
      }
    }
  })
  return result
}

/**
* 将消息转换为简洁字符串表示
* @author astar
* @date 2021-05-07 21:31
*/
export function getSimpleMessageFromJSON ({ kind, value }) {
  const mapSimpleMessage = {
    [KINDS.TEXT]: value,
    [KINDS.AT]: `@${value} `,
    [KINDS.EMOJI]: `[${value}]`,
    [KINDS.IMG]: '[表情]'
  }
  return mapSimpleMessage[kind]
}

/**
 * 解决复制粘贴文本把样式也复制过来的问题
 * @author astar
 * @date 2021-02-02 17:52
 */
export function dealWithPasteProblem () {
  document.querySelector('div[contenteditable="true"]').addEventListener("paste", function(e) {
    e.stopPropagation();
    e.preventDefault();
    var text = '', event = (e.originalEvent || e);
    if (event.clipboardData && event.clipboardData.getData) {
      text = event.clipboardData.getData('text/plain');
    } else if (window.clipboardData && window.clipboardData.getData) {
      text = window.clipboardData.getData('Text');
    }
    if (document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, text);
    } else {
      document.execCommand('paste', false, text);
    }
  });
}
