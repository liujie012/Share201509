var util = {};
/*
** hasClass 判断当前元素是否拥有cName
 */
util.hasClass = function hasClass(curEle,cName){
	var curClass = curEle.className,
		reg = new RegExp('(^| +)'+cName+'( +|$)');
	return reg.test(curClass);
};
/*
** addClass 先判断当前元素是否拥有cName，没有就不添加
 */
util.addClass = function addClass(curEle,cName){
	//判断当前元素是否已经拥有cName
	var flag = this.hasClass(curEle,cName);
	!flag ? curEle.className += ' '+cName : null;
};
/*
** addClass 先判断当前元素是否拥有cName，有就删除
 */
util.removeClass = function removeClass(curEle,cName){
	//判断当前元素是否已经拥有cName,拥有就删除
	var flag = this.hasClass(curEle,cName);
	if(flag){
		var reg = new RegExp('(^| +)' + cName + '( +|$)');
		curEle.className  =  curEle.className.replace(reg, ' ');//这里替换成空防止className连接到一起了
	};
};
/*
** perv 获取当前元素的哥哥节点
 */
util.prev = function prev(curEle){
	//先拿到curEle.previousSibling,判断他是是不是节点，不是继续循环，兼容previousElementSibling
	if('previousElementSibling' in curEle){
		return curEle.previousElementSibling;
	}
	var curPrev = curEle.previousSibling;
	while(curPrev && curPrev.nodeType != 1){
		curPrev = curPrev.previousSibling;
	};
	return curPrev;
	
};
/*
** next 获取当前元素的弟弟节点
 */
util.next = function next(curEle){
	if('nextElementSibling' in curEle){
		return curEle.nextElementSibling;
	};
	var next = curEle.nextSibling;
	while(next && next.nodeType != 1){
		next = next.nextSibling;
	};
	return next;
};
/*
** prevAll 获取所有的哥哥节点，当前节点一直往上找，直到找到空为止
 */
util.prevAll = function prevAll(curEle){
	var curPrev = this.prev(curEle),ary = [];
	while(curPrev){
		ary.unshift(curPrev);
		curPrev = this.prev(curPrev);
	};
	return ary;
};
/*
** nextAll 获取所有的弟弟节点
 */
util.nextAll = function nextAll(curEle){
	var next = this.next(curEle),ary = [];
	while(next){
		ary.unshift(next);
		next = this.next(next);
	};
	return ary;
};
/*
** siblings 所有相邻节点(所以哥哥+弟弟)
*/
util.siblings = function siblings(curEle){
	return this.prevAll(curEle).concat(this.nextAll(curEle));
};
/*
** index 获取当前元素的下标,有多少个哥哥元素他的下标就是多少
*/
util.index = function index(curEle){
	return this.prevAll(curEle).length;
};
/*
** getElementByClassName 根据class获取DOM,content:上下文，指定的范围，传递的参数是class类名集合 
*/
util.getElementByClassName = function getElementByClassName(classList,context){
	context = context || document;
	if('getElementByClassName' in document){
		return this.toArray(content.getElementByClassName(classList));
	};
	//获取context下面的所有元素
	var allEle = context.getElementsByTagName('*'),
		ary = [];//存在符合条件的
	//classList 处理为数组,先去掉首尾空格，再以空格分开
	var classRry = classList.replace(/(^\s+|\s+$)/g,'').split(/ +/g); 
	// 下的所有子节点，进行判断,利用假设法，假设这个元素符合条件，
	var flag = true;
	for(var i= 0; i<allEle.length; i++){
		//判断这些元素是否classRry中的元素是否存在
		for(var k=0; k<classRry.length; k++){
			flag = this.hasClass(allEle[i],classRry[k]);
			if(!flag){
				break;
			};
		};
		if(flag){
			ary.push(allEle[i]);
		};
	};
	return ary;
};
/*
** childNodes孩子节点,tagName:标签的名称
*/
util.childNodes = function(curEle,tagName){
	var children = curEle.childNodes,ary = [];
	for(var i=0; i<children.length; i++){
		if(children[i] && children[i].nodeType == 1){
			tagName? (function(){
				if(children[i].nodeName.toLowerCase() == tagName.toLowerCase()) ary.push(children[i]);
			})():ary.push(children[i]);
		}
	};
	return ary;
};
/*
** 内数组转为数组
*/
util.toArray = function toArray(simAry){
	try{
		return Array.prototype.slice.call(simAry);
	}catch(e){
		var ary = [];
		for(var i=0; i<simAry.length; i++){
			ary.push(sim[i])
		};
		return ary;
	}
};
/*
** 每个元素距离body的偏移距离，注意IE8对offsetTop 已经包括clientTop
*/
util.offset = function offset(curEle){
	var t = curEle.offsetTop,l = curEle.offsetLeft, p = curEle.offsetParent;
	while(p){
		if(window.navigator.userAgent.indexOf('MSIE 8.0') < 0){
			t += p.clientTop;
			l += p.clientLeft;
		};
		t += p.offsetTop;
		l += p.offsetLeft;
		p = p.offsetParent;
	};
	return {top:t,left:l};
};
/*
** 获取或者设置浏览器信息
*/
util.win  = function win(type,data){	
	if(typeof data == 'undefined'){
		return document.documentElement[type] || document.body[type];
	};
	document.documentElement[type] = data;
	document.body[type] = data;
};