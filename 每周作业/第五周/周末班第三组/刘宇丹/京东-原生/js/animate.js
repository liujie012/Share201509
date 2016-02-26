function getCss(curEle,attr){
    var val=reg=null;
    if(window.getComputedStyle){
        val=window.getComputedStyle(curEle,null)[attr];
    }else{
        if(attr=="opacity"){
            val=curEle.currentStyle["filter"];
            reg=/^alpha\(opacity=(\d+(\.\d+))\)$/;
            val=reg.test(val)?reg.exec(val):val;
        }else{
            val=curEle.currentStyle[attr];
        }
    }
    reg=/^-?(\d+)(\.\d+)?(px|rem|em|pt)?$/;
    return reg.test(val)?parseFloat(val):val;
}
function setCss(curEle,attr,value){
    if(attr=="opacity"){
        curEle.style[attr]=value;
        curEle.style["filter"]="alpha(opacity="+value*100+")";
    }else{
        curEle.style[attr]=value+"px";
    }
}
function animate(curEle,moveObj,duration){
    var oBegin={};
    var oTarget={};
    var oChange={};
    var interval=15;
    var times=0;

    //开始计算
    for(var attr in moveObj){
        oBegin[attr]=getCss(curEle,attr);
        oTarget[attr]=moveObj[attr];
        oChange[attr]=oTarget[attr]-oBegin[attr];
    }

    //开始运动
    window.clearInterval(curEle.curTimer);
    curEle.curTimer=window.setInterval(function(){
        times+=interval;
        if(times<duration){
            for(var attr in oChange){
                setCss(curEle,attr,oBegin[attr]+oChange[attr]/duration*times);
            }
        }else{
            for(var attr in oChange){
                setCss(curEle,attr,oTarget[attr]);
            }
            window.clearInterval(curEle.curTimer);
        }
    },interval)
}