(function(){
	var nav = document.getElementById('nav'),
		ulNode = utils.children(nav,'ul')[0];
		lisNode =  utils.children(ulNode,'li');
	//给存在子元素项的菜单添加手型;
	function  styleCur(){
		for(var i=0; i < lisNode.length; i++){
			var liaNode = utils.children(lisNode[i],'a')[0],
				liaiNode = utils.children(liaNode,'i')[0];
			if(liaiNode) liaNode.style.cursor =  'pointer';
		};
	};
		
	for(var i=0; i<lisNode.length; i++){
		lisNode[i].onmouseenter = function(){
			var navBox =  utils.children(this,'div')[0];
			if(navBox){
				navBox.style.display = 'block';
			};
			var liaNode = utils.children(this,'a')[0];
			utils.addClass(liaNode,'active');
		};
		lisNode[i].onmouseleave = function(){
			var navBox =  utils.children(this,'div')[0];
			if(navBox){
				navBox.style.display = 'none';
			};
			var liaNode = utils.children(this,'a')[0];
			utils.removeClass(liaNode,'active');
		};
	};
	
	
	/*//绑定事件,利用事件委托
	nav.onmouseover = function(e){
		var e = e || window.event;
			e.target =  e.target || e.srcElement;
		var reg = /^(span|i)$/i;
		//根据事件源的不同进行不同的操作
		if(reg.test(e.target.tagName)){
			var navBox =  utils.children(e.target.parentNode.parentNode,'div')[0];
			navBox.style.display = utils.getCss(navBox,'display') == 'none' ? 'block':'none';
			return
		};
		
		
	
	};
	nav.onmouseout = function(e){
		var e = e || window.event;
			e.target =  e.target || e.srcElement;
		var reg = /^(li)$/i;
		//根据事件源的不同进行不同的操作
		if(reg.test(e.target.tagName)){
			var navBox =  utils.children(e.targe,'div')[0];
			navBox.style.display = utils.getCss(navBox,'display') == 'none' ? 'block':'none';
		};
		
	};*/
	styleCur();
})();
(function(){
	function sliderFn(option){
		var that = this;
		that.opt = option;
	};
	sliderFn.prototype = {
		constructer: sliderFn,
		init: function(){
			var that = this,opt = this.opt;
			that.liArr = utils.getElementByClass(opt.target,'slider-panel');
			that.leftBtn = utils.getElementByClass(opt.target,'slider-prev')[0];
			that.rightbtn = utils.getElementByClass(opt.target,'slider-next')[0];
			that.sliderItem =  utils.getElementByClass(opt.target,'slider-item');
			that.step = 0;
			that.stepFnNew = function(){
				that.stepFn();
			};
			that.timer = setInterval(that.stepFnNew,2000);
			//点击小菜单
			for(var i=0; i< that.sliderItem.length; i++){
				(function(i){
					that.sliderItem[i].onclick = function(){
						that.step = i;
						if(that.step == that.liArr.length) that.step = 0;
						that.sliderMainFn();
					};
				})(i)
			};
			//当鼠标移到幻灯片终止动画，左右按钮显示
			opt.target.onmouseenter = function(e){
				clearInterval(that.timer);
				that.leftBtn.style.display = that.rightbtn.style.display = 'block';
			};
			//当鼠标移出启动动画
			opt.target.onmouseleave = function(e){
				that.timer = setInterval(that.stepFnNew,2000);
				that.leftBtn.style.display = that.rightbtn.style.display = 'none';
			};
			//点击左边按钮
			that.leftBtn.onclick = function(){
				that.leftSilder();
			};
			//点击右边按钮
			that.rightbtn.onclick = function(){
				that.stepFn();
			};
		},
		stepFn: function(){//自动播放
			var that = this,opt = this.opt;
			that.step ++;
			if(that.step == that.liArr.length) that.step = 0;
			that.sliderMainFn();
		},
		leftSilder: function(){//点击左按钮
			var that = this,opt = this.opt;
			that.step --;
			if(that.step < 0) that.step = that.liArr.length - 1;
			that.sliderMainFn();
		},
		sliderMainFn: function(){
			var that = this,opt = this.opt;
			for(var i=0; i<that.liArr.length; i++){
				if(that.step == i){
					utils.animate(that.liArr[i],{opacity: 1},500);
				}else{
					utils.setCss(that.liArr[i],'opacity',0);
				};
			};
			that.tipStyle();
		},
		tipStyle: function(){//设置按钮样式
			var that = this,opt = this.opt;
			for(var i=0; i< that.sliderItem.length; i++){
				if(that.step == i){
					utils.addClass(that.sliderItem[i],'active');
				}else{
					utils.removeClass(that.sliderItem[i],'active');
				}
			}
		}
	};
	(new sliderFn({
		target: document.getElementById('slider')
	})).init();
})();