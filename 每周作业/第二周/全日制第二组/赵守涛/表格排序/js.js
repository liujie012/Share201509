var oTab = document.getElementById("tab");
var tHead = oTab.tHead;
var tBody = oTab.tBodies[0];
var oThs = tHead.rows[0].cells;
var oTrs = tBody.rows;
function bindData() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < jsonAry.length; i++) {
        var cur = jsonAry[i];
        cur.sex = cur.sex === 0 ? "ÄÐ" : "Å®";

        var oTr = document.createElement("tr");

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
bindData();

function changeBg() {
    for (var i = 0; i < oTrs.length; i++) {
        oTrs[i].className = "bg" + (i % 2);
    }
}
changeBg();

function sortList() {
    oThs[2].flag *= -1;
    var ary = utils.listToArray(oTrs);
    ary.sort(function (a, b) {
        var curIn = a.cells[2].innerHTML;
        var nexIn = b.cells[2].innerHTML;
        var curInNum = parseFloat(curIn);
        var nexInNum = parseFloat(nexIn);
        return (curInNum - nexInNum) * oThs[2].flag;
    });
    var frg = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg = null;
    changeBg();
}

for(var i=0;i<oThs.length;i++){
    var curTh =oThs[i];
    if(curTh.className==="cursor"){
        curTh.flag=-1;
        curTh.index=i;
        curTh.onclick=function(){
            sortList.call(this,this.index);
        };
    }
}