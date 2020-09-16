/* eslint-disable */
function detect() {
  let ua = navigator.userAgent
  let platform = navigator.platform
  let os = {}
  let browser = {}
  let webkit = ua.match(/Web[kK]it[\/]?([\d.]+)/)
  let android = ua.match(/(Android);?[\s\/]+([\d.]+)?/)
  let osx = !!ua.match(/\(Macintosh; Intel /)
  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
  let ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/)
  let iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
  let win = /Win\d{2}|Windows/.test(platform)
  let wp = ua.match(/Windows Phone ([\d.]+)/)
  let chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)
  let firefox = ua.match(/Firefox\/([\d.]+)/)
  let ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^?]+).*rv:([0-9.].)/)
  let webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/)
  let safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)

  if (browser.webkit = !!webkit) browser.version = webkit[1]

  if (android) {
    os.android = true
    os.version = android[2]
  }
  if (iphone && !ipod) {
    os.ios = os.iphone = true
    os.version = iphone[2].replace(/_/g, '.')
  }
  if (ipad) {
    os.ios = os.ipad = true
    os.version = ipad[2].replace(/_/g, '.')
  }
  if (ipod) {
    os.ios = os.ipod = true
    os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
  }
  if (wp) {
    os.wp = true
    os.version = wp[1]
  }
  if (win) {
    os.windows = true
  }
  if (chrome) {
    browser.chrome = true
    browser.version = chrome[1]
  }
  if (firefox) {
    browser.firefox = true
    browser.version = firefox[1]
  }
  if (ie) {
    browser.ie = true
    browser.version = ie[1]
  }
  if (safari && (osx || os.ios || win)) {
    browser.safari = true
    if (!os.ios) browser.version = safari[1]
  }
  if (webview) {
    browser.webview = true
  }

  browser.weixin = /MicroMessenger/.test(ua)
  browser.uc = /UCBrowser/.test(ua)

  let system = {
    isWin: /^Win/.test(platform),
    isMac: /^Mac/.test(platform),
    isX11: /^(X11$|Linux)/.test(platform)
  }
  system.isPC = system.isWin || system.isMac || system.isX11
  system.isMobile = !system.isPC

  return {os, browser, system}
}

let {os, browser, system} = detect()

export {os, browser, system, detect}
