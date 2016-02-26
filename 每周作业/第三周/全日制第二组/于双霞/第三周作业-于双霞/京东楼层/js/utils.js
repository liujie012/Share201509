/**
 * Created by chen on 2016/1/27.
 */
var utils = {

    //listToArray:Converts an array of classes into an array
    listToArray: function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },

    //toJSON:Converts a string of JSON format to an object in the JSON format
    toJSON: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    },

    //offSet:Gets the offset of the current element distance body
    offSet: function (curEle) {
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

    //getCss:Gets the style of the current element that is calculated by the browser
    getCss: function (curEle, attr) {
        var val = reg = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === "opacity") {
                val = curEle.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    },

    //win:Get or set so model information and a browser connection box
    win: function (attr, value) {
        if (value === undefined) {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    },
    prev: function prev(curEle) {
        if ("previousElementSibling" in curEle) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    },
    prevAll: function prevAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    },
    next: function next(curEle) {
        if ("nextElementSibling" in curEle) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    },
    nextAll: function nextAll(curEle) {
        var ary = [];
        var nex = this.next(curEle);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    },
    hasClass: function hasClass(curEle, cName) {
        var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)");
        return reg.test(curEle.className);
    },
    addClass: function addClass(curEle, cName) {
        if (!this.hasClass(curEle, cName)) {
            curEle.className += " " + cName;
        }
    },
    removeClass: function removeClass(curEle, cName) {
        if (this.hasClass(curEle, cName)) {
            var reg = new RegExp("(?:^| +)" + cName + "( +|$)", "g");
            curEle.className = curEle.className.replace(reg, " ");
        }
    }
};

utils.sibling = function sibling(curEle) {
    var pre = this.prev(curEle), nex = this.next(curEle);
    var ary = [];
    pre ? ary.push(pre) : null;
    nex ? ary.push(nex) : null;
    return ary;
};

utils.siblings = function siblings(curEle) {
    return this.prevAll(curEle).concat(this.nextAll(curEle));

};
