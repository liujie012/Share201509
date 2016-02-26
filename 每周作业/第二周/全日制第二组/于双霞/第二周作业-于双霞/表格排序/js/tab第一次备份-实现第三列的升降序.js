//1、获取当前操作所需要的元素
var oTab = document.getElementById('tab');
var tHead = oTab.tHead;
var tBody = oTab.tBodies[0];
var oThs = tHead.rows[0].cells;
var oTrs = tBody.rows;

//2、实现数据绑定
function bindDate() {
    //创建文档碎片
    var frg = document.createDocumentFragment();
    for (var i = 0; i < jsonAry.length; i++) {
        var cur = jsonAry[i];
        cur.sex = cur.sex === 0 ? "男" : "女";

        var oTr = document.createElement('tr');
        for (var key in cur) {
            var oTd = document.createElement('td');
            oTd.innerHTML = cur[key];
            oTr.appendChild(oTd);

        }
        frg.appendChild(oTr);
    }


    tBody.appendChild(frg);
    frg = null;

    //事先进行数据的初始化处理
    //每一次循环都创建一个新的tr(创建一行)
    //oTr.className = "bg" + (i % 2);
    //每一行中还需要创建4个td

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
//1)将所有行的类数组转换为数组
//2)实现排序->根据每一行的第三列中的内容(分数)进行排序
//3)从新按照ary中的最新的顺序把我们的每一行重新的添加到页面中
//4)排完序后的奇数偶数行和之前的不一样了,需要重新的计算隔行变色
function sortList() {
    oThs[2].flag*=-1;
    var ary = utils.listToArray(oTrs);

    ary.sort(function (a, b) {
        var curIn = a.cells[2].innerHTML;
        var nextIn = b.cells[2].innerHTML;
        var curInNum = parseFloat(curIn);
        var nextInNum = parseFloat(nextIn);

        return (curInNum - nextInNum)*oThs[2].flag;
    })

    var frg=document.createDocumentFragment();
    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg=null;
    changeBg();
}

//5、当点击分数的时候实现我们的排序
oThs[2].flag=-1;
oThs[2].onclick=function(){
    sortList();
}
