//1、想要操作谁就先获取谁
var oTab = document.getElementById("tab");
var tHead = oTab.tHead;
var tBody = oTab.tBodies[0];

var oThs = tHead.rows[0].cells;
var oTrs = tBody.rows;

//2、实现数据绑定
function bingData() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < jsonAry.length; i++) {
        var cur = jsonAry[i];
        cur.sex = cur.sex === 0 ? "男" : "女";
        var oTr = document.createElement("tr");
        for (var key in cur) {
            var oTd = document.createElement("td");
            oTd.innerHTML = cur[key];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr)
    }
    tBody.appendChild(frg);
    frg = null;
}
bingData();

//3、实现隔行变色
function changBg() {
    for (var i = 0; i < oTrs.length; i++) {
        oTrs[i].className = "bg" + (i % 2);
    }
}
changBg();

//4、实现排序
function sortList(n) {
    var _this = this;
    _this.flag *= -1;
    for (var k = 0; k < oThs.length; k++) {
        k !== n ? oThs[k].flag = -1 : null;
    }
    var ary = utils.listToArray(oTrs);
    ary.sort(function (a, b) {
        var curIn = a.cells[n].innerHTML;
        var nextIn = b.cells[n].innerHTML;
        var curInNum = parseFloat(curIn);
        var nextInNum = parseFloat(nextIn);
        if (isNaN(curInNum) || isNaN(nextInNum)) {
            return (curIn.localeCompare(nextIn)) * _this.flag
        }
        return (curInNum - nextInNum) * _this.flag;
    });

    var frg = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    changBg();
}
for (var i = 0; i < oThs.length; i++) {
    var curTh = oThs[i];
    if (curTh.className === "cursor") {
        curTh.flag = -1;
        curTh.index = i;
        curTh.onclick = function () {
            sortList.call(this, this.index);
        }
    }
}














