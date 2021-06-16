/*
 * @Description: 
 * @Author: astar
 * @Date: 2020-09-16 20:07:43
 * @LastEditTime: 2021-06-17 00:10:46
 * @LastEditors: astar
 */
import { os } from '@/utils/browser';
const getDpr = function () {
  let dpr = 0;
  // 对iOS设备进行dpr的判断，对于Android系列，始终认为其dpr为1
  let devicePixelRatio = window.devicePixelRatio;
  
  if(os.ios || os.android) {
    dpr = devicePixelRatio;
  } else {
    dpr = 1;
  }
  return dpr;
}

export const getSize = function (win, doc) {
  let clientWidth = win.innerWidth // visual viewport
  || doc.documentElement.clientWidth // layout viewport
  || doc.body.clientWidth;
  if (!clientWidth) {
    console.warn('cannot get client width');
  }
  let width = clientWidth;
  let dpr = getDpr();
  return {
    baseWidth: width >= 500 * dpr ? (width >= 1000 * dpr ? 1520 : 900) : 375,
    clientWidth: width,
    isLarge: width >= 500 * dpr
  }
}
export default function (doc, win) {
  let refreshRem = function () {
    let docEl = win.document.documentElement;
    let metaEl = doc.querySelector('meta[name="viewport"]');
    let dpr = getDpr();
    let scale = 1 / dpr;
    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
      metaEl = doc.createElement('meta');
      metaEl.setAttribute('name', 'viewport');
      metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
      document.documentElement.firstElementChild.appendChild(metaEl);
    } else {
      metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    }
    let fz;
    let { clientWidth, baseWidth } = getSize(win, doc);
    fz = 100 * clientWidth / baseWidth;
    docEl.style.fontSize = fz + 'px';
  };

  if (!doc.addEventListener) return;
  let resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
  win.addEventListener(resizeEvt, refreshRem, false);
  doc.addEventListener('DOMContentLoaded', refreshRem, false);
  refreshRem();
}