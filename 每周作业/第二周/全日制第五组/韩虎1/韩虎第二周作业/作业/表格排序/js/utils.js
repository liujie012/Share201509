var utils = {
    //把类数据转换为数组
    listToArray: function (likeAry) {
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
    //把toJSON数据转换为对象
    toJSON: function (str) {
        var cur = null;
        try {
            cur = JSON.parse(str);
        } catch (e) {
            str = eval("(" + str + ")");
        }
        return str;
    }
}