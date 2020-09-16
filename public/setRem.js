// https://segmentfault.com/a/1190000008767416
(function (doc, win) {
  var docEl = win.document.documentElement;
  var metaEl = doc.querySelector('meta[name="viewport"]');
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var dpr = 0;
  var scale = 0;

  // 对iOS设备进行dpr的判断，对于Android系列，始终认为其dpr为1
  if (!dpr && !scale) {
    // var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/[iphone|ipad]/gi);
    var devicePixelRatio = win.devicePixelRatio;

    if(isIPhone) {
      dpr = devicePixelRatio;
    } else {
      drp = 1;
    }
    
    scale = 1 / dpr;
    console.log('=======', scale);
  }
  docEl.setAttribute('data-dpr', dpr);
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    document.documentElement.firstElementChild.appendChild(metaEl);
  } else {
    metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  }

  var refreshRem = function () {
    var clientWidth = win.innerWidth
                      || doc.documentElement.clientWidth
                      || doc.body.clientWidth;

    if (!clientWidth) return;
    var fz;
    var width = clientWidth;
    fz = 14 * width / 375;
    docEl.style.fontSize = fz + 'px';
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, refreshRem, false);
  doc.addEventListener('DOMContentLoaded', refreshRem, false);
  refreshRem();
})(document, window);