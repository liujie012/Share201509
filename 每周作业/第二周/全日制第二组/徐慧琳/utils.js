var utils={
    listToArray:function (likeAry){
        var ary=[];
        try{
            ary=Array.prototype.slice.call(likeAry,0)
        }catch(e){
            for(var i=0;i<jsonAry.length;i++){
                ary[ary.length]=likeAry[i];
            }
        }
        return ary;
    },
    toJSON:function (str){
        var obj=null;
        try{
            obj=JSON.parse(str);
        }catch(e){
            obj=eval("("+str+")")
        }
        return obj;
    }

};
utils.getCss=function (curEle,attr){
    var val=reg=null;
    if("getComputedStyle" in window){
         val =window.getComputedStyle()
    }
}

