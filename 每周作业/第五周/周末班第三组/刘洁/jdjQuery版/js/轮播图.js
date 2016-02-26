/**
 * Created by Administrator on 2016/2/25.
 */
(function(){
    var oInner = document.getElementById("inner");
    var oTip=document.getElementById("tip");
    var aryImg = ["../img/banner1.jpg", "../img/banner2.jpg", "../img/banner3.jpg", "../img/banner4.jpg",
        "../img/banner5.jpg", "../img/banner6.jpg"];
    var imgList = oInner.getElementsByTagName("img");
    (function bind() {  //这段就不用jQuery写了。。
        var str = "";
        for (var i = 0; i < aryImg.length; i++) {
            str += "</div><img src='' trueImg='" + aryImg[i] + "'>";
        }
        oInner.innerHTML = str;
        str = "";
        for(var i=0;i<aryImg.length;i++){
            str+="<li>"+(i+1)+"</li>";
        }
        oTip.innerHTML=str;
        str="";
    })();
    (function lazyLoad() {//这段也不写了jQuery了，因为不会写。。。
        for (var i = 0; i < aryImg.length; i++) {
            (function () {
                var curImg = imgList[i];
                var trueImg = new Image;
                trueImg.src = curImg.getAttribute("trueImg");
                trueImg.onload = function () {
                    curImg.src = trueImg.src;
                }
            })();
        }
    })();
    var $inner=$(oInner);
    $inner.page=0;
    (function init(){
        $inner.find("img")
            .first().css("opacity",1);
        $inner.curTimer=window.setInterval(preSwitch,3000);
        tipColor();
    })();
    $("#outer").hover(function(){
        $("#outer a").css("display","block");
        window.clearInterval($inner.curTimer);
    },function(){
        $("#outer a").css("display","none");
        $inner.curTimer=window.setInterval(preSwitch,3000);
    });
    $("#btnRight").click(preSwitch);
    $("#btnLeft").click(backSwitch);
    $("#tip li").mouseover(tipOver)
    function preSwitch(){
        $inner.page++;
        if($inner.page===aryImg.length){
            $inner.page=0;
        }
        $inner.find("img").css("opacity","0").stop()
            .eq($inner.page).animate({opacity:1},300);
        tipColor();
    }
    function backSwitch(){
        $inner.page--;
        if($inner.page<0){
            $inner.page=imgList.length-1;
        }
        $inner.find("img").css("opacity","0").stop()
            .eq($inner.page).animate({opacity:1},300);
        tipColor();
    }
    function tipColor(){
        $("#tip").find("li").each(function(index,curEle){
            (index===$inner.page)?($(curEle).addClass("select")):($(curEle).removeClass("select"));
        })
    }
    function tipOver(){
        $inner.page=$("#tip li").index(this);
        $inner.find("img").css("opacity","0").stop()
            .eq($inner.page).animate({opacity:1},300);
        tipColor();
    }
})();
