var oTab=document.getElementById("tab");
var oLis=oTab.getElementsByTagName("li");
var imgList=oTab.getElementsByTagName("img");



function bindData(){
    var str="";
    for(var i=0;i<dataAry.length;i++){
        var cur=dataAry[i];
        str += "<div class='right'><img src='img/default.jpg' trueImg='" + cur["logo"] + "'/></div>";
    }
    oTab.innerHTML+=str;
}
bindData();

    for (var i = 0; i < oLis.length; i++) {
        (function (i) {
            //    var winT = document.documentElement.clientHeight || document.body.clientHeight;
                oLis[i].onclick = function () {
                    document.documentElement.scrollTop =670*i;
                    document.body.scrollTop =670*i;
                };
            }(i))
    }

function init(){
    console.log("ok");
    for(var i=0;i<imgList.length;i++){
        ~function(i){
            var curImg=imgList[i];
            //if(curImg.isLoad)return;
            var curImgT = 670*i;
            var winT=(document.documentElement.clientHeight||document.body.clientHeight)+
                (document.documentElement.scrollTop||document.body.scrollTop);
           if(curImgT<winT){
               var oImg=new Image;
               oImg.src=curImg.getAttribute("trueImg");
               oImg.onload=function(){
                   curImg.src=this.src;
                   curImg.isLoad=true;
               }
           }

        }(i);
    }
}

window.setTimeout(init, 500);
window.onscroll = init;