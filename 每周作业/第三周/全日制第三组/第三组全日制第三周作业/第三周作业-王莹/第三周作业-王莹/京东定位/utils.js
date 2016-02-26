/**
 * Created by Logan on 2016/1/22.
 */
var utils = {
  offset: function (curEle) {
    var t = curEle.offsetTop, l = curEle.offsetLeft, p = curEle.offsetParent;
    while (p) {
      if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
        t += p.clientTop;
        l += p.clientLeft;
      }
      t += p.offsetTop;
      l += p.offsetLeft;
      p = p.offsetParent;
    }
    return {top: t, left: l};
  },
  win: function (attr, value) {
    if (typeof value === "undefined") {
      return document.documentElement[attr] || document.body[attr];
    }
    document.documentElement[attr] = value;
    document.body[attr] = value;
  }
};