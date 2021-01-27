/*
 * @Description: 
 * @Author: astar
 * @Date: 2020-09-16 20:07:43
 * @LastEditTime: 2020-09-17 18:32:02
 * @LastEditors: astar
 */
import { os } from '@/utils/browser';
export default function (doc, win) {
  let docEl = win.document.documentElement;
  let metaEl = doc.querySelector('meta[name="viewport"]');
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  let dpr = 0;
  let scale = 0;
  // 对iOS设备进行dpr的判断，对于Android系列，始终认为其dpr为1
  let devicePixelRatio = win.devicePixelRatio;
  
  if(os.ios || os.android) {
    dpr = devicePixelRatio;
  } else {
    dpr = 1;
  }
  scale = 1 / dpr;
  docEl.setAttribute('data-dpr', dpr);
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    document.documentElement.firstElementChild.appendChild(metaEl);
  } else {
    metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  }
  let refreshRem = function () {
    let clientWidth = win.innerWidth // visual viewport
                      || doc.documentElement.clientWidth // layout viewport
                      || doc.body.clientWidth;
    if (!clientWidth) return;
    let fz;
    let width = clientWidth;
    let baseWidth = 0;
    if (width >= 768 * dpr) {
      baseWidth = 1520;
    } else {
      baseWidth = 375;
    }
    fz = 100 * width / baseWidth;
    docEl.style.fontSize = fz + 'px';
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, refreshRem, false);
  doc.addEventListener('DOMContentLoaded', refreshRem, false);
  refreshRem();
}