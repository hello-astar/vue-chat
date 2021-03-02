/*
 * @Author: astar
 * @Date: 2021-03-01 13:54:09
 * @LastEditors: astar
 * @LastEditTime: 2021-03-02 16:56:34
 * @Description: 文件描述
 * @FilePath: \vue-chat\loader\reg.js
 */
// https://blog.csdn.net/qq_37728271/article/details/100519531?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&dist_request_id=f8ab0aae-56e5-467a-a91d-47d0883a2c04&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control
// 匹配template和script中的内容 // style内容由postcss-pxtorem完成转换
const contentReg = /<(template|script)>([\s\S]+)<\/(template|script)>/g;

// 匹配数字px 如 1px
const pxReg = /\b(\d+(\.\d+)?)px\b/g;

// 匹配${xxx}px => xxx内不能包含'${'和'}', 应为算术表达式
const jsxReg = /\${((?!.*?\${).*?)}px/g;
 
// 匹配aaa = xxx + 'px', aaa: xxx + 'px'的算术表达式
const expressionReg = /(:|=)(?:\s+)?([+*/-\w\s.]+)\+(?:\s+)?['"]px['"]/g;

 
module.exports = {
  contentReg,
  jsxReg,
  pxReg,
  expressionReg
}
