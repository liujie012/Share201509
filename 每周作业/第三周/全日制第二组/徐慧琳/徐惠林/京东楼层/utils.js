var utils={
    listToArray:function (likeAry){
        var ary=[];
        try{
            ary=Array.prototype.slice.call(likeAry,0);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary[ary.length]=likeAry[i];
            }
        }
        return ary;
    },
    toJSON:function (str){
         "JSON" in window?JSON.parse(str):eval("("+str+")");
    }
};
utils.getCss=function (curEle,attr){
    var val=null;
    if("getComputedStyle" in window){
        val= window.getComputedStyle(curEle,null)[attr];
    }else{
        if(attr==="opacity"){
            val=curEle.currentStyle["filter"];
            reg=/^alpha \(opacity=(\d+(\.\d+)?)\)$/;
            val=reg.test(val)?reg.exec(val)[1]/100:1;
        }else{
            val=curEle.currentStyle[attr];
        }
    }
    reg=/^-?\d+(\.\d+)?(px|pt|em|rem)?$/;
    return reg.test(val)?parseFloat(val):val;
};
utils.offset=function (curEle){
    var l=curEle.offsetLeft,t=curEle.offsetTop,p=curEle.offsetParent;
    while(p){
    if(navigator.userAgent.indexOf("MSIE 8.0")===-1){
       l+= p.clientLeft;
        t+= p.clientTop;
    }
    l+= p.offsetLeft;
    t+= p.offsetTop;
    p= p.offsetParent;
}
    return {top:t,left:l};
};
utils.win=function (attr,value){
    if(typeof value==="undefined"){
        return document.documentElement[attr]||document.body[attr];
    }
    document.documentElement[attr]=value;
    document.body[attr]=value;
}