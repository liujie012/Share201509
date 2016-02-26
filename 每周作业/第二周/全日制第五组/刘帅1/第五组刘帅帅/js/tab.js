//1、获取当前操作所需要的元素
var oTab = document.getElementById("tab");
var tHead = oTab.tHead;//->表单独有的属性，获取指定table下的thead
var tBody = oTab.tBodies[0];//->获取指定table下所有的tbody中的第一个
var oThs = tHead.rows[0].cells;//->获取tHead下所有行中的第一行下的所有的列   rows获取所有的行    cells获取所有的列
var oTrs = tBody.rows;//->获取tBody下的所有的行

//2、实现数据绑定
function bindDate() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < jsonAry.length; i++) {

        //事先进行数据的初始化处理
        var cur = jsonAry[i];
        cur.sex = cur.sex === 0 ? "男" : "女";

        //每一次循环都创建一个新的tr(创建一行)
        var oTr = document.createElement("tr");

        //每一行中还需要创建4个td
        for (var key in cur) {
            var oTd = document.createElement("td");
            oTd.innerHTML = cur[key];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg = null;
}
bindDate();

//3、实现隔行变色
function changeBg() {
    for (var i = 0; i < oTrs.length; i++) {
        oTrs[i].className = "bg" + (i % 2);
    }
}
changeBg();

//4、实现表格排序
function sortList(n) {
    var _this = this;
    _this.flag *= -1;

    //让除了当前列的其他列的flag标识回归初始值-1
    for (var k = 0; k < oThs.length; k++) {
        //n是当前列的索引，如果索引不是当前列的索引，证明它是其他列，而其他的列我们都让它的flag初始化为-1，这样每一次乱序后在点击都是按照升序先排序
        //if(k!==n){
        //    oThs[k].flag=-1;
        //}
        k !== n ? oThs[k].flag = -1 : null;
    }

    //1)将所有行的类数组转换为数组
    var ary = utils.listToArray(oTrs);

    //2)实现排序->根据每一行的第三列中的内容进行排序
    ary.sort(function (a, b) {
        var curIn = a.cells[n].innerHTML;
        var nexIn = b.cells[n].innerHTML;
        var curInNum = parseFloat(curIn);
        var nexInNum = parseFloat(nexIn);
        if (isNaN(curInNum) || isNaN(nexInNum)) {
            return (curIn.localeCompare(nexIn)) * _this.flag;
        }
        return (curInNum - nexInNum) * _this.flag;
    })

    //3)重新按照ary中的最新的顺序把我们的每一行重新的添加到页面中
    var frg = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg = null;

    //4)排完序后的奇偶行和之前的不一样了，需要重新的计算隔行变色
    changeBg();
}

//5、给所有表头中的列(具有class="cursor"这个样式的列)绑定点击事件
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



