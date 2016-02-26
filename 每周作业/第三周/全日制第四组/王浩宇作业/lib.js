function offset(curEle) {
    var l = curEle.offsetLeft, t = curEle.offsetTop;
    var p = curEle.offsetParent;
    while (p) {
        if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
            l += p.clientLeft;
            t += p.clientTop;
        }
        l += p.offsetLeft;
        t += p.offsetTop;
        p = p.offsetParent;
    }
    return {left: l, top: t};
}

function changTab(obj, i) {
    [].forEach.call(obj, function (item, index) {
        item.className = index == i ? 'select' : null;
    })
}
