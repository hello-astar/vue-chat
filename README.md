# vue-chat
`vue-chat`是一个使用vue实现的在线聊天应用，该项目基于vue、vuex、vue-router、socket.io-client、sass、axios等技术开发。

[服务端项目(koa-chat)](https://github.com/hello-astar/koa-chat)

[项目在线展示](https://hello-astar.asia/chat/main)

# 功能
1. 注册登录功能，使用rsa非对称加密传输用户登录注册信息至服务端，对密码进行sha256加密后存储用户信息至数据库。
2. 聊天室在线聊天功能，基于socket.io-client实现。
3. 支持多种消息类型，包括文本/emoji表情/长按头像艾特/发送表情包/(...待增加)。

# To-Do-List
- [x] rem + viewport + media，响应式布局
- [ ] 性能监控performance
- [x] 图片qiniuyun
- [ ] 七牛云改为服务器端上传+私密空间
- [x] 密码加密
- [x] 背景图拉伸问题
- [x] 聊天室功能-在线用户展示、聊天
- [x] 同端登录互踢
- [x] 表情包功能
- [ ] change log
- [x] 开发webpack loader-将内联样式的px转换为rem
- [ ] 艾特@功能
- [ ] 抽出下拉上拉逻辑，重构pullRefresh组件
- [x] 目前暂时用v-html展示，考虑转义还是拆组件
- [ ] 升级vue3.0
- [ ] 组件库

# 安装运行
1. 拉取项目
```
git clone git@github.com:hello-astar/vue-chat.git
```
2. 安装依赖
```
npm install
```
3. 运行项目
```
npm run serve
```
4. 打开https://localhost:2000
5. 拉取并运行服务端项目（[服务端项目(koa-chat)](https://github.com/hello-astar/koa-chat)）
6. 若本地调试，在登录页面获取不到图片验证码，可打开https://localhost:3001链接（接口地址），点击信任页面
# 项目截图
最新版
![PC端效果图-登录页面](/doc/screenshots/pc-login.png)
![PC端效果图-主页](/doc/screenshots/pc-main.png)
![PC端效果图-群组](/doc/screenshots/pc-group.png)
![PC端效果图-联系人页面](/doc/screenshots/pc-contact.png)
![PC端效果图-个人信息编辑页面](/doc/screenshots/pc-me.png)
![PC端效果图-404页面](/doc/screenshots/pc-404.png)
![PC端效果图-401页面](/doc/screenshots/pc-401.png)
![移动端效果图](/doc/screenshots/mobile-login.png)
![移动端效果图](/doc/screenshots/mobile-main.png)
![移动端效果图](/doc/screenshots/mobile-main2.png)
![移动端效果图](/doc/screenshots/mobile-group.png)
![移动端效果图](/doc/screenshots/mobile-contact.png)
![移动端效果图](/doc/screenshots/mobile-me.png)
![移动端效果图](/doc/screenshots/mobile-404.png)
![移动端效果图](/doc/screenshots/mobile-401.png)

旧版
![PC端效果图](/doc/screenshots/pc.png)
![移动端效果图](/doc/screenshots/mobile.png)