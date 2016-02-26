# 胡可第三周作业

***

#### 1.`clientWidth`和`offsetWidth`的区别是什么？

* `clientWidth`是内容的宽度+左右的`padding`
* `offsetWidth`是`clientWidth`+左右`border`

#### 2.`offsetLeft`是什么？什么情况下会产生`offsetLeft`？它的值包括哪些/从哪儿开始计算的？

`offsetLeft`是当前元素距离其`offsetParent`的左偏移。在IE8下，`offsetLeft`从子元素的外边框计算到其`offsetParent`的外边框。其他浏览器下，`offsetLeft`从子元素的外边框计算到其`offsetParent`的内边框。

#### 3.`offsetParent`是什么？在什么情况下，一个网页元素会变成下级（后代）元素的offsetParent？

`offsetParent`是元素在计算`offsetLeft`和`offsetTop`时的父级参照物。默认都为`body`。在样式中设置了`position:absolute/relative/fixed`的元素都会作为子元素的父级参照物。

#### 4.如何计算出浏览器的高度或宽度？

`document.documentElement.clientWidth || document.body.clientWidth`
`document.documentElement.clientHeight || document.body.clientHeight`

使用两个以避免兼容性问题，`documentElement`获取的宽高比较准确，但是在某些浏览器下不支持，`body`获取的宽高不太准确，但是兼容性比较好。所以有限获得准确的值，在无法获得准确值的情况下再去获得不太准确的值。

#### 5.如何计算浏览器中当前显示的页面的中心点的位置？

```javascript
function getCenter (curEle) {
	var winW = document.documentElement.clientWidth || document.body.clientWidth;
	var winH = document.documentElement.clientHeight || document.body.clientHeight;
	var a = (winW - curEle.offsetWidth) / 2 + "px";
	var b = (winH - curEle.offsetHeight) / 2 + "px";
	return {x: a, y: b}
}
```

#### 6.算出页面上任意元素的绝对位置（距离浏览器顶部的）？

```javascript
function offset(curEle) {
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
}
```

#### 7.如何判断是什么浏览器和浏览器版本号？

使用`window.navigatot.userAgent`，用`indexOf`检测返回字符串中是否包含`MSIE`、`FireFox`、`Chrome`等关键词来确认浏览器型号。版本号则需要进一步是用正则来进行判断，如`/MSIE(6|7|8)/`。

#### 8.使用`scrollTop`或`scrollLeft`实现一个文字无缝滚动的效果

```javascript
(function lamp(id, speed) {
    var oDiv = document.getElementById(id);
    var val=oDiv.innerHTML;
      window.setInterval(function(){
          var oldL = oDiv.scrollLeft;
          oDiv.scrollLeft+=1;

          var newL=oDiv.scrollLeft;
          if(oldL===newL){
              oDiv.innerHTML+=val;
          }

      },speed);
})("div", 10);
```

#### 9.关于逻辑运算的一些题：

```javascript
var a = false, b = 9, c = " ";
var result = a || b && c;//此时result的结果？->""中包含的内容（即b&&c的结果）
var result = a && b && c;//此时result的结果？->false
result = c && b && a;    //此时result的结果？->false
```
	
#### 10.`setTimeout`和`setInterval`的返回值是什么类型的，他俩有什么区别？

返回一个`Number`，代表当前是第几个定时器，这个数字两者是共用的。`setTimeout`是隔一段时间**只触发一次**，`setInterval`则是每个一段时间就触发一次，**触发多次**。
