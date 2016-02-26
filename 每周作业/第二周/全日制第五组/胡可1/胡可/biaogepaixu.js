var oTab = document.getElementById('tab');
var tHead = oTab.tHead;
var tBody = oTab.tBodies[0];
var oThr = tHead.rows[0];
var oTbrs = tBody.rows;

var json = utils.strToJSON(jsonStr);

function bindData(data) {
	var frg = document.createDocumentFragment();
	for (var i = 0; i < data.length; i++) {
		var newTr = document.createElement("tr");
		var cur = data[i];
		cur.sex === 0?cur.sex = "男" : cur.sex = "女";
		for (var key in cur) {
			var newTd = document.createElement("td");
			newTd.innerHTML = cur[key];
			newTr.appendChild(newTd);
		}
		frg.appendChild(newTr);
	}
	tBody.appendChild(frg);
	frg = null;
}
bindData(json);

function changeColor(curRows) {
	for (var i = 0; i < curRows.length; i++) {
			curRows[i].className = "bg" + i%2;
		}
}
changeColor(oTbrs);

function preProcess(curRow, curCell) {
	for (var k = 0; k < curRow.cells.length; k++) {
		if (k != curCell.index) {
			curRow.cells[k].flag = -1;
		}
	}
}

function sortList(curHRowCell, curRows) {
	curHRowCell.flag *= -1;
	var ary = utils.listToArray(curRows);
	ary.sort(function (a, b) {
		a = a.cells[curHRowCell.index].innerHTML;
		b = b.cells[curHRowCell.index].innerHTML;
		if (isNaN(a*b)) {
			return (a.localeCompare(b))*curHRowCell.flag;
		}
		return (parseFloat(a) - parseFloat(b))*curHRowCell.flag;
	});
	var frg = document.createDocumentFragment();
	for (var i = 0; i < ary.length; i++) {
		var cur = ary[i];
		frg.appendChild(cur);
	}
	tBody.appendChild(frg);
	frg = null;
}

for (var i = 0; i < oThr.cells.length; i++) {
	if (oThr.cells[i].className == "cursor") {
		oThr.cells[i].index = i;
		oThr.cells[i].flag = -1;
		oThr.cells[i].onclick = function () {
			preProcess(oThr, this);
			sortList(this, oTbrs);
			changeColor(oTbrs);
		};
	}
}