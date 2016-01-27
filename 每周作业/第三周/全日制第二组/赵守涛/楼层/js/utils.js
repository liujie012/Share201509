var utils = {
    //listToArray:��������ת��Ϊ����
    listToArray: function listToArray(likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },
    //toJSON:���ַ���ת��ΪJSON��ʽ�Ķ���
    toJSON: function toJSON(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }
};

//win:��ȡ�������ú��������صĺ���ģ����Ϣ
utils.win = function win(attr, value) {
    if (typeof value === "undefined") {
        return document.documentElement[attr] || document.body[attr];
    }
    document.documentElement[attr] = value;
    document.body[attr] = value;
};

//getCss:��ȡ��ǰԪ�ؾ���������������ʽ
utils.getCss = function getCss(curEle, attr) {
    var val = reg = null;
    if ("getComputedStyle" in window) {
        val = window.getComputedStyle(curEle, null)[attr];
    } else {
        if (attr === "opacity") {
            val = curEle.currentStyle["filter"];
            reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
            val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
        } else {
            val = curEle.currentStyle[attr];
        }
    }
    reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/;
    return reg.test(val) ? parseFloat(val) : val;
};

//offset:��ȡԪ�ؾ���body��ƫ����(����body�Ƿ�Ϊ����������)
utils.offset = function offset(curEle) {
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
};

/*--------------------------------------------------*/

//prev:��ȡ��ǰԪ�ص���һ�����Ԫ�ؽڵ�
utils.prev = function prev(curEle) {
    if ("previousElementSibling" in curEle) {
        return curEle.previousElementSibling;
    }
    var pre = curEle.previousSibling;
    while (pre && pre.nodeType !== 1) {
        pre = pre.previousSibling;
    }
    return pre;
};

//prevAll:��ȡ��ǰԪ�ص����еĸ��Ԫ�ؽڵ�
utils.prevAll = function prevAll(curEle) {
    //this->utils
    var ary = [], pre = this.prev(curEle);
    while (pre) {
        ary.unshift(pre);
        pre = this.prev(pre);
    }
    return ary;
};

//next:��ȡ��ǰԪ�ص���һ���ܵ�Ԫ�ؽڵ�
utils.next = function next(curEle) {
    if ("nextElementSibling" in curEle) {
        return curEle.nextElementSibling;
    }
    var nex = curEle.nextSibling;
    while (nex && nex.nodeType !== 1) {
        nex = nex.nextSibling;
    }
    return nex;
};

//nextAll:��ȡ��ǰԪ�ص����еĵܵ�Ԫ�ؽڵ�
utils.nextAll = function nextAll(curEle) {
    var ary = [], nex = this.next(curEle);
    while (nex) {
        ary[ary.length] = nex;
        nex = this.next(nex);
    }
    return ary;
};

//sibling:��ȡ��ǰԪ�ص����ڽڵ�(��һ�����+��һ���ܵ�)
utils.sibling = function sibling(curEle) {
    var pre = this.prev(curEle), nex = this.next(curEle);
    var ary = [];
    pre ? ary[ary.length] = pre : null;
    nex ? ary[ary.length] = nex : null;
    return ary;
};

//sibling:��ȡ��ǰԪ�ص��ֵ�Ԫ�ؽڵ�(���+�ܵ�)
utils.siblings = function sibling(curEle) {
    return this.prevAll(curEle).concat(this.nextAll(curEle));
};

//getIndex:��ȡ��ǰԪ�ص�����,�м������,�ҵ��������Ǽ�
utils.getIndex = function getIndex(curEle) {
    return this.prevAll(curEle).length;
};

/*--------------------------------------------------*/

//hasClass:�жϵ�ǰԪ���Ƿ����ĳ����ʽ����
utils.hasClass = function hasClass(curEle, cName) {
    var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)");
    return reg.test(curEle.className);
};

//addClass:����ǰ��Ԫ��������ʽ����
utils.addClass = function addClass(curEle, cName) {
    if (!this.hasClass(curEle, cName)) {//->�����жϵ�ǰ��Ԫ�����Ƿ��Ѿ�����cName�����ʽ����,���ھͲ���������...
        curEle.className += " " + cName;
    }
};

//removeClass:����ǰ��Ԫ���Ƴ�ĳһ����ʽ����
utils.removeClass = function removeClass(curEle, cName) {
    if (this.hasClass(curEle, cName)) {//->�����жϵ�ǰ��Ԫ�����Ƿ��Ѿ�����cName�����ʽ����,�еĻ����Ƴ�...
        var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)", "g");
        curEle.className = curEle.className.replace(reg, " ");
    }
};

/*--------------------------------------------------*/

//children:��ȡ��ǰԪ�������е�Ԫ���ӽڵ�,���������tagֵ,��˼�������е���Ԫ�ؽڵ����ڰѱ�ǩ��Ϊtag��ɸѡ����
utils.children = function children(curEle, tag) {
    var nodeList = curEle.childNodes, ary = [];
    for (var i = 0; i < nodeList.length; i++) {
        var cur = nodeList[i];
        if (cur.nodeType === 1) {
            if (typeof tag !== "undefined") {
                var reg = new RegExp("^" + tag + "$", "i");
                reg.test(cur.tagName) ? ary[ary.length] = cur : null;
                continue;
            }
            ary[ary.length] = cur;
        }
    }
    return ary;
};

/*--------------------------------------------------*/

//getElementsByClass:ͨ��Ԫ�ص���ʽ����,��ָ�����������л�ȡ��ص�Ԫ��
utils.getElementsByClass = function getElementsByClass(strClass, context) {
    context = context || document;
    if ("getElementsByClassName" in document) {
        return this.listToArray(context.getElementsByClassName(strClass));
    }
    var tagList = context.getElementsByTagName("*"), ary = [];
    strClass = strClass.replace(/(^ +| +$)/g, "").split(/ +/);
    for (var i = 0; i < tagList.length; i++) {
        var curTag = tagList[i], curTagClass = curTag.className;
        var flag = true;
        for (var k = 0; k < strClass.length; k++) {
            var reg = new RegExp("(?:^| +)" + strClass[k] + "(?: +|$)");
            if (!reg.test(curTagClass)) {
                flag = false;
                break;
            }
        }
        flag ? ary[ary.length] = curTag : null;
    }
    return ary;
};


//https://github.com/zhufengpeixun/zhufengDom.git
//http://tool.css-js.com/