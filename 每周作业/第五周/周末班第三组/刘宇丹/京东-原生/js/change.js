var count = 4;
var oInner = document.getElementById("inner");
var oTip = document.getElementById("tip");
var oTipList = oTip.getElementsByTagName("li");
var step = 0;
selectTip();

//��������
function selectTip() {
	for (var i = 0; i < count; i++) {
		var tempStep = step;
		(tempStep == count) ? tempStep = 0 : null;
		oTipList[i].className = (tempStep === i ? "bg" : null);
	}
}

//�������
(function moveTip() {
	for (var i = 0; i < 4; i++) {
		var curTip = oTipList[i];
		curTip.index = i;
		curTip.onclick = function () {
			step = this.index;
			animate(oInner, {left: step * (-1000)}, 500);
			selectTip();
		}
	}
})();

//�˶�����
function move() {
	step++;
	if (step > count) {
		step = 1;
		oInner.style.left = 0;
	}
	animate(oInner, {left: step * -1000}, 500);
	selectTip();
}
curTimer = window.setInterval(move, 2000);
//����
(function btnLeft() {
	var oBtnLeft = document.getElementById("btnLeft");
	oBtnLeft.onclick = function () {
		if (step === 0) {
			oInner.style.left = -count * 1000 + "px";
			step = count;
		}
		window.clearTimeout(curTimer);
		step--;
		animate(oInner, {left: step * -1000}, 500);
		selectTip();
		curTimer = window.setInterval(move, 2000);
	}
})();
//����
(function btnRight() {
	var oBtnRight = document.getElementById("btnRight");
	oBtnRight.onclick = function () {
		window.clearTimeout(curTimer);
		move();
		selectTip();
		curTimer = window.setInterval(move, 2000);
	}
})();