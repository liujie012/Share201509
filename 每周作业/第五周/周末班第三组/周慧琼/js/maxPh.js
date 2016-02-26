(function(){
	var imgListBox = document.getElementById('img-list'),
		allA = utils.children(imgListBox,'a'),
		mark = document.getElementById('mark'),
		markImg = utils.children(mark,'img')[0];
	imgListBox.onmousemove = function(e){
		var e = e || window.event;
			e.target = e.target || e.srcElement;
		var reg = /^(img)$/i;
		if(reg.test(e.target.tagName)){
			mark.style.display = 'block';
			markImg.src = e.target.getAttribute('maxSrc');
		};
		mark.style.top = e.clientY - imgListBox.offsetTop + 10 + 'px';
		mark.style.left = e.clientX - imgListBox.offsetLeft + 10 + 'px';
	};
	imgListBox.onmouseout = function(){
		var e = e || window.event;
			e.target = e.target || e.srcElement;
		var reg = /^(img)$/i;
		if(reg.test(e.target.tagName)){
			mark.style.display = 'none';
		};
	};
})();