var oSec = document.getElementsByTagName('section');
var oAside = document.getElementsByTagName('aside')[0];
var oSpan = document.getElementsByClassName('selector');
var ary  = [];
var reg = /selector/;

function jump() {
	var curScroll = document.body.scrollTop;
	var target = ary[utils.getIndex(this)];
	var a = curScroll-target;
	var step = (Math.abs(a) / 300) * 10;
	var timer;
	if (a>=0) {
		timer = window.setInterval(function () {
		    if (curScroll <= target) {
		        window.clearInterval(timer);
		        return;
		    }
		    curScroll -= step;
		    document.documentElement.scrollTop = curScroll;
		    document.body.scrollTop = curScroll;
		}, 10);
	} else {
		timer = window.setInterval(function () {
		    if (curScroll >= target) {
		        window.clearInterval(timer);
		        return;
		    }
		    curScroll += step;
		    document.documentElement.scrollTop = curScroll;
		    document.body.scrollTop = curScroll;
		}, 5);
	}
}
function changeDis() {
	var temp = this.innerHTML;
	this.innerHTML = this.dis;
	this.dis = temp;
}
window.onload = function () {
	oAside.style.left = oSec[0].offsetLeft - 32 + "px";
	for (var i = 0; i < oSec.length; i++) {
		~function (i) {
			var str ="";
			str+="<span class='selector'>";
			str+=(i+1)+"F"+"</span>";
			oAside.innerHTML += str;
			ary[ary.length] = oSec[i].offsetTop;

		}(i);
	}
	for (var k = 0; k < oSpan.length; k++) {
		~function(k) {
			oSpan[k].dis = json[k]["floor-discription"];
		}(k);
	}
};
oAside.onclick = function(e){
	if(reg.test(e.target.className)){
		jump.call(e.target);
	}
};
oAside.onmouseover = function(e) {
	if(reg.test(e.target.className)){
		changeDis.call(e.target);
	}
};
oAside.onmouseout = function(e) {
	if(reg.test(e.target.className)){
		changeDis.call(e.target);
	}
};
window.onscroll = function () {
	var distance = Math.floor((utils.win("scrollTop")/utils.win("scrollHeight"))*10);
	if (distance<oSec.length) {
		~function(index) {
			utils.addClass(oSpan[index], "on");
			var collection = utils.siblings(oSpan[index]);
			for (var i = 0; i < collection.length; i++) {
				utils.removeClass(collection[i], "on");
			}
		}(distance);
	}
	if (utils.win("scrollTop") > utils.win("clientHeight")*0.5) {
		oAside.className = "down";
	} else {
		oAside.className = "";
	}
};