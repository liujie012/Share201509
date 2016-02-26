var utils = {
    //listToArray:将类数组转换为数组
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
    //toJSON:将字符串转换为JSON格式的对象
    toJSON: function toJSON(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }
};

//win:获取或者设置和浏览器相关的盒子模型信息
utils.win = function win(attr, value) {
    if (typeof value === "undefined") {//如果没传value值就是获取
        return document.documentElement[attr] || document.body[attr];
    //    获取就直接返回这个值
    }
    document.documentElement[attr] = value;
    document.body[attr] = value;
};
//例如： utils.win("scrollTop", 0);
//获取浏览器的样式如果有就获取，如果没有就设置，获取浏览器的盒子模型信息，浏览器的盒子模型信息都有
//client:clientTop clientHeight clientTop clientLeft
//offset:offsetLeft offsetTop offsetParent offsetHeight offsetWidth
//scroll:scrollTop scrollLeft scrollHeight scrollWidth


//getCss:获取当前元素经过浏览器计算的样式
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
//例如：var res = getCss(oDiv, "opacity");

//offset:获取元素距离body的偏移量(不管body是否为父级参照物)
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

//prev:获取当前元素的上一个哥哥元素节点
utils.prev = function prev(curEle) {
    if ("previousElementSibling" in curEle) {
        return curEle.previousElementSibling;
    }//兼容性，如果有这个属性自然用这个来求上一个哥哥元素节点
    var pre = curEle.previousSibling;
    //没有的话就取出所有的哥哥节点
    while (pre && pre.nodeType !== 1) {
        //循环存在哥哥节点的并且哥哥节点的节点类型是1的这样的元素就为元素节点
        pre = pre.previousSibling;
    }
    return pre;
};


//prevAll:获取当前元素的所有的哥哥元素节点
utils.prevAll = function prevAll(curEle) {
    //this->utils
    var ary = [], pre = this.prev(curEle);
    //空数组存放元素，然后获取当前元素的上一个哥哥元素
    while (pre) {
        //如果哥哥元素存在，那么那么久开始循环将找到的哥哥元素存进数组的头部
        ary.unshift(pre);
        pre = this.prev(pre);
        //让哥哥元素，等于上一个哥哥元素
    }
    return ary;
    //返回这个空数组
};

//next:获取当前元素的下一个弟弟元素节点
utils.next = function next(curEle) {
    //寻找下一个弟弟元素节点
    if ("nextElementSibling" in curEle) {
        return curEle.nextElementSibling;
    }
    //首先如果有这个直接查找下一个弟弟元素节点的属性就直接用这个属性就可以找到下一个弟弟元素节点
    var nex = curEle.nextSibling;
    //如果没有这个属性，那么就用另一个方法找到所有的弟弟节点
    while (nex && nex.nodeType !== 1) {
        //在弟弟元素节点中筛查，不是元素节点的就继续向下查找下一个弟弟节点，知道查到是元素节点为止
        nex = nex.nextSibling;
    }
    return nex;
//    这个是返回查到的下一个弟弟元素就可以了
};

//nextAll:获取当前元素的所有的弟弟元素节点
utils.nextAll = function nextAll(curEle) {
    var ary = [], nex = this.next(curEle);
    while (nex) {
        //如果有下一个弟弟元素，就将下一个弟弟元素存进数组
        ary[ary.length] = nex;
        nex = this.next(nex);
        //并且将下一个兄弟元素找到
    }
    return ary;
};

//sibling:获取当前元素的相邻节点(上一个哥哥+下一个弟弟)
utils.sibling = function sibling(curEle) {
    var pre = this.prev(curEle), nex = this.next(curEle);
    //分别用上面的方法找到上一个哥哥元素以及下一个弟弟元素
    var ary = [];
    //弄一个空数组
    pre ? ary[ary.length] = pre : null;
    //上一个元素存在就将数组中添加一个元素，否则就不操作
    nex ? ary[ary.length] = nex : null;
    return ary;
    //返回这个数组即可
};

//sibling:获取当前元素的兄弟元素节点(哥哥+弟弟)
utils.siblings = function sibling(curEle) {
    return this.prevAll(curEle).concat(this.nextAll(curEle));
    //用数组的contact方法，将返回的所有的哥哥元素和所有的弟弟元素拼接起来
};

//getIndex:获取当前元素的索引,有几个哥哥,我的索引就是几
utils.getIndex = function getIndex(curEle) {
    return this.prevAll(curEle).length;
    //有几个哥哥元素索引就是几个，所以找到所有的哥哥元素的长度就是索引
};

/*--------------------------------------------------*/

//hasClass:判断当前元素是否包含某个样式类名
utils.hasClass = function hasClass(curEle, cName) {
    //例如<div class="  w1   w3"></div>
    var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)");
    //只能用这个创建实例的方式来拼接变量，开头有可能是边界或者是空格然后只检查不捕获，后面有可能是空格或者边界只检查不捕获
    return reg.test(curEle.className);
//    检查当前元素的className上有没有这个；类名
};

//addClass:给当前的元素增加样式类名
utils.addClass = function addClass(curEle, cName) {
    if (!this.hasClass(curEle, cName)) {//->首先判断当前的元素中是否已经存在cName这个样式名了,存在就不在增加了...
        curEle.className += " " + cName;
        //如果没有这个样式名然后才添加，添加就直接是空格加上cName就行了
    }
};

//removeClass:给当前的元素移除某一个样式类名
utils.removeClass = function removeClass(curEle, cName) {//<div class="  w1   w3"></div>移除" w3  "
    if (this.hasClass(curEle, cName)) {//->首先判断当前的元素中是否已经存在cName这个样式名了,有的话才移除...
        var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)", "g");
        //存在的话才移除,移除就用正则表达式来进行捕获移除的部分,左边是边界或者多个空格，拼接上”w3“,然后将正则捕获的部分用replace
        //来代替成空格
        curEle.className = curEle.className.replace(reg, " ");
    }
};

/*--------------------------------------------------*/

//children:获取当前元素下所有的元素子节点,如果传递了tag值,意思是在所有的子元素节点中在把标签名为tag的筛选出来
utils.children = function children(curEle, tag) {
    //获取当前元素下的所有的孩子元素，如果tag就是获取当前元素下的tag标签的所有元素
    //<ul>
    //  <li></li>
    //  <li></li>
    //  <li></li>
    //  <p></p>
    //</ul>
    var nodeList = curEle.childNodes, ary = [];
    //获取当前元素下的所有的孩子节点，并创建一个容器
    for (var i = 0; i < nodeList.length; i++) {
        var cur = nodeList[i];
        if (cur.nodeType === 1) {
            //循环所有的孩子节点，当孩子节点类型是1时说明就是元素节点
            if (typeof tag !== "undefined") {
                //如果标签名传了就说明要找孩子下标签名为tag的元素
                var reg = new RegExp("^" + tag + "$", "i");
                //写一个正则，忽略大小写标签名为tag的标签
                reg.test(cur.tagName) ? ary[ary.length] = cur : null;
                //存在这个标签名则就存进数组中，不存在就不进行操作
                continue;
                //跳出本次循环就不进行下面的代码
            }
            ary[ary.length] = cur;
            //没有传tag的值，就直接放进去cur数组
        }
    }
    return ary;
    //返回这个数组
};

/*--------------------------------------------------*/

//getElementsByClass:通过元素的样式类名,在指定的上下文中获取相关的元素
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