/**
 * Created by Administrator on 2016/1/24.
 */
var oBody=document.body;
function bindDate(){
    var str="";
    for(var j=0;j<imgAry.length;j++){
        var curImg=imgAry[j];
        str+="<div><img src='"+curImg.logo+"'/></div>";
    }
     oBody.innerHTML+=str;
}
bindDate();
function onMouse(){
    var oUl=document.getElementById("tab");
    var oLis=oUl.getElementsByTagName("li");
    for(var i=0;i<oLis.length;i++){
        var cur=oLis[i];
        cur.content=cur.innerHTML;
        cur.zhufeng=i;
        cur.onmouseover=function(){
            var ary=["小壶","笑脸","猫鱼","花盆","星星","小孩","放学","浪漫","清新","瓷瓶"];
            this.className="bg";
            this.style.color="white";
            this.innerHTML=ary[this.zhufeng];
        };
        cur.onmouseout=function(){
            this.className="";
            this.style.color="";
            this.innerHTML=this.content;
        };
    }
}
onMouse();
function onclickEvent(){
    var oUl=document.getElementById("tab");
    var oLis=oUl.getElementsByTagName("li");
    for(var i=0;i<oLis.length;i++){
        var cur=oLis[i];
        ~function(i){
            cur.onclick=function(){
              var ary=["1300","1938","2573","3209","3860","4495","5131","5782","6418","7053"];
                var target=utils.win("scrollTop")-parseFloat(ary[i]);
                if(target>=0){
                    var step = (target / 1000) * 10;
                    var timer = window.setInterval(function (){
                        var curT = utils.win("scrollTop");
                        if (curT <parseFloat(ary[i])) {
                            utils.win("scrollTop", parseFloat(ary[i]));
                            window.clearInterval(timer);
                            return;
                        }
                        utils.win("scrollTop", curT - step);
                    },10);
                }
                else{
                    var step1 = (target / 1000) * 10*(-1);
                    var timer1 = window.setInterval(function (){
                        var curT1 = utils.win("scrollTop");
                        if (curT1 > parseFloat(ary[i])) {
                            utils.win("scrollTop", parseFloat(ary[i]));
                          window.clearTimeout(timer1);
                            return;
                        }
                        utils.win("scrollTop", curT1 + step1);
                    },10);
                }
            }
        }(i);
    }
}
onclickEvent();


function scrollMove() {
    var winH = utils.win("clientHeight");
    var oUl=document.getElementById("tab");
    var curT = utils.win("scrollTop");
    oUl.style.display = curT >= 2*winH ? "block" : "none"
}
window.onscroll = scrollMove;
