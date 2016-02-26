var utils = {
	listToArray : function (likeAry) {
		var ary = [];
		try {
			ary = Array.prototype.slice.call(likeAry);
		} catch (e) {
			for (var i = 0; i < likeAry.length; i++) {
				ary[ary.length] = likeAry[i];
			}
		}
		return ary;
	},
	strToJSON : function (str) {
		var res;
		if ("JSON" in window) {
			res = window.JSON.parse(str);
		} else {
			res = eval("(" + str + ")");
		}
		return res;
	}
};