var count = 4;
var oInner = document.getElementById("inner");
var oTip = document.getElementById("tip");
var oTipList = oTip.getElementsByTagName("li");
var step = 0;
selectTip();

//锁定焦点
function selectTip() {
	for (var i = 0; i < count; i++) {
		var tempStep = step;
		(tempStep == count) ? tempStep = 0 : null;
		oTipList[i].className = (tempStep === i ? "bg" : null);
	}
}

//点击焦点
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

//运动函数
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
//点左
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
//点右
(function btnRight() {
	var oBtnRight = document.getElementById("btnRight");
	oBtnRight.onclick = function () {
		window.clearTimeout(curTimer);
		move();
		selectTip();
		curTimer = window.setInterval(move, 2000);
	}
})();