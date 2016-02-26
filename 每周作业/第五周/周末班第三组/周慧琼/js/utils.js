var utils = {};
/*
** 获取curEle的子元素,tag为标签类型
*/
utils.children = function(curEle,tag){
	var allNode = curEle.childNodes;//获取当前
	var ary = [];
	for(var i=0; i<allNode.length; i++){
		var cur =  allNode[i];
		if(cur.nodeType == 1){
			if(tag){
				var reg = RegExp('^'+tag+'$','i');
				var tagNode = reg.test(cur.tagName) ? ary.push(cur) : null;
				continue;
			};
			ary.push(cur);
		}
	};
	return ary;
};
/*
** 获取样式
*/
utils.getCss = function(curEle,attr){
	var data = '';
	if('getComputedStyle' in window){
		data = getComputedStyle(curEle,null)[attr];
	}else{
		//获取的是opacity，IE中是alpha(opacity=50)
		if(attr == 'opacity'){
			var reg = /^alpha(opacity=\d{1,3})$/,
				val = curEle.currentStyle['filter'];
			data = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
		}else{
			data = curEle.currentStyle[attr];
		};		
	};
	//如果带单位的就去掉单位
	var reg = /^-?\d+(.\\d+)?(px|rem|pt|em)?$/;
	return reg.test(data) ? parseFloat(data) : data;
};
/*
** 给样式赋值
*/ 
utils.setCss = function(curEle,attr,data){
	//opacity
	if(attr == 'opacity'){
		curEle.style.opacity = data;
		curEle.style['filter'] = 'alpha:opacity='+data * 100+'';
		return;
	};
	//float
	if(attr == 'float'){
		curEle.style['cssFloat'] = data;
		curEle.style['styleFloat'] = data;
		return;
	};
	//以下属性需要添加单位
	var reg = /^(width|height|top|left|right|bottom|(padding|margin(top|left|right|bottom)))$/;
	if(reg.test(attr)){
		var numData = /^-?\d+(.\\d+)?$/;
		if(numData.test(data)){
			curEle.style[attr] = data + 'px';
			return;
		};
	};
	curEle.style[attr] = data;
};
/*
** 判断是否含有这个类名
*/
utils.hasClass = function(curEle,cName){
	var reg = new RegExp('(?:^| +)'+cName+'(?: +|$)'),
		className = curEle.className;
	return reg.test(className);
};
/*
** 添加类名
*/
utils.addClass = function(curEle,cName){
	if(!this.hasClass(curEle,cName)){//不存在就添加
		curEle.className = ' ' + cName;
	};
};
/*
** 删除相应的类名
*/
utils.removeClass = function(curEle,cName){
	if(this.hasClass(curEle,cName)){
		var reg = new RegExp('(?:^| +)'+cName+'(?:$| +)');
		var newAllName = curEle.className.replace(reg, ' ');
		curEle.className = newAllName;
	};
}
/*
** 根据class获取元素
*/
utils.getElementByClass = function(curEle,cName){
	curEle = curEle || document;
	if('getElementsByClassName' in document){
		return this.listToArray(curEle.getElementsByClassName(cName));
	}else{
		var allNode = curEle.getElementsTagName('*'),
			reg = new RegExp('(?:^| +)'+cName+'(?: +|$)');
			arrCname = cName.replace(reg,'').split(/ +/),
			aryClass = [];
		for(var i=0; i< allNode.length; i++){
			var curClass = allNode[i].className,
				flag = true;//假设存在
				for(var z =0; z < arrCname.length; z++){
					if(curClass != arrCname[z]){
						flag = false;
						break;
					};
				};
				flag ? aryClass.push(allNode[i]) : null;
		}
		return aryClass;
	};
};
/*
** 类数组转化为数组
*/
utils.listToArray = function(likeArray){
	try{
		return Array.prototype.call.slice(likeArray);
	}catch(e){
		var ary = [];
		for(var i=0; i<likeArray.length; i++){
			ary.push(likeArray[i]);
		};
		return ary;
	};
};
/*
** 
*/
/*
** 动画库
** curEle 当前元素， obj 一个对象,需要变化的，duration：运动的总时间，fn:回调函数
*/
utils.animate = function(curEle,obj,duration,fn){
	var time = 0,
		interval = 15,//每步时间
		Obegin = {},
		Ochange = {};
	//求出每项动画的运动的总距离与开始值
	for(var i in obj){
		if(obj.hasOwnProperty(i)){
			Obegin[i] = utils.getCss(curEle,i);
			Ochange[i] = obj[i] - Obegin[i];
		};
	};
	//运动函数
	function step(){
		time += interval;
		if(time >= duration){//大于或者等于总时间，运动应结束
			for(var i in obj){
				var data = obj[i];
				utils.setCss(curEle,i,data);
			};
			clearInterval(timer);
		}else{
			for(var i in obj){
				var data = time / duration *  Ochange[i] +  Obegin[i];
				utils.setCss(curEle,i,data);
			};
		};
	};
	var timer = setInterval(step,interval);
};
