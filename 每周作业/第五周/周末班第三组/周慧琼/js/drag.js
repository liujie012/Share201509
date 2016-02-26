	function Drag(opt){
		this.opt = opt;
	};
	Drag.prototype = {
		constructor: Drag,
		init: function(){
			var that = this,opt = that.opt;
			opt.target.onmousedown = function(e){
				that.e = e;
				that.eFun();
				//元素显示，先计算开始位置
				
			};
		},
		eFun: function(){
			var that = this,opt = that.opt;
			that.e = that.e || window.event;
			that.target = that.e.target || that.e.srcElement;
		}
		
	};
	(new Drag({
		target: document.getElementById('drag')
	})).init();