/**
 * Created by Orange on 2016/1/18.
 */

var oDiv = document.getElementById("box");
var oTable = oDiv.getElementsByTagName("table")[0];
var oThead = oTable.tHead;
var oTbody = oTable.tBodies[0];
var oThs = oThead.rows[0].cells;
var oTrs = oTbody.rows;
function bindData() {
    var oFrm = document.createDocumentFragment();
    for (var i = 0; i < jsonObj.Content.length; i++) {
        var curObj = jsonObj.Content[i];
        var oTr = document.createElement("tr");
        for (var key in curObj) {
            var oTd = document.createElement("td");
            oTd.innerHTML = curObj[key];
            oTr.appendChild(oTd);
        }
        oFrm.appendChild(oTr);
    }
    oTbody.appendChild(oFrm);
    oFrm = null;
}
bindData();

for (var i = 0; i < oThs.length; i++) {
    oThs[i].flag = -1;
    ~function (i) {
        oThs[i].onclick = function () {
            sortTab.call(this, i);
        }
    }(i);
}

function changeBg() {
    for (var i = 0; i < oTrs.length; i++) {
        oTrs[i].className = "tr" + i % 2;
    }
}
changeBg();


function sortTab(n) {
    this.flag *= -1;
    var _this = this;
    var ary = utils.listToArray(oTrs);
    for (var k = 0; k < oTrs.length; k++) {
        if (k != n) {
            oTrs[k].flag = -1;
        }
    }

    ary.sort(function (a, b) {
        var curIn = a.cells[n].innerHTML;
        var curNext = b.cells[n].innerHTML;
        var curInNum = parseFloat(curIn);
        var curNextNum = parseFloat(curNext);
        if (isNaN(curInNum) || isNaN(curNextNum)) {
            return (curIn.localeCompare(curNext)) * _this.flag;
        }
        return (curIn - curNext) * _this.flag;
    })
    var oFr = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        oFr.appendChild(ary[i]);
    }
    oTbody.appendChild(oFr);
    changeBg();
    oFr = null;
}