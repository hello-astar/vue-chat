/*
 * @Description: 
 * @Author: astar
 * @Date: 2020-09-16 20:07:43
 * @LastEditTime: 2021-12-24 14:17:38
 * @LastEditors: astar
 */
import { os } from '@/utils/browser';
const getDpr = function () {
  let devicePixelRatio = window.devicePixelRatio;
  return os.ios || os.android ? parseInt(devicePixelRatio) : 1;
}

export const getSize = function (win, doc) {
  let clientWidth = win.innerWidth // visual viewport
  || doc.documentElement.clientWidth // layout viewport
  || doc.body.clientWidth;
  let dpr = getDpr();
  if (!clientWidth) {
    console.warn('cannot get client width');
    return;
  }
  return {
    baseWidth: clientWidth >= 500 * dpr ? (clientWidth >= 1000 * dpr ? 1520 : 900) : 375,
    clientWidth,
    isLarge: clientWidth >= 500 * dpr
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
    let { clientWidth, baseWidth } = getSize(win, doc);
    let fz = 100 * clientWidth / baseWidth;
    docEl.style.fontSize = fz + 'px';
  };

  if (!doc.addEventListener) return;
  let resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
  win.addEventListener(resizeEvt, refreshRem, false);
  doc.addEventListener('DOMContentLoaded', refreshRem, false);
  refreshRem();
}