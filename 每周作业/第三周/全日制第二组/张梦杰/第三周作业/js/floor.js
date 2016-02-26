

var utils={
    offset:function (curEle) {
        var t = curEle.offsetTop, l = curEle.offsetLeft, p = curEle.offsetParent;
        while (p) {
            if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                t += p.clientTop;
                l += p.clientLeft;
            }
            t += p.offsetTop;
            l += p.offsetLeft;
            p = p.offsetParent;
        }
        return {top: t, left: l};
    }

};




   ~function(){
       function fn() {
           var oInner=document.getElementById("inner");
           var val = inner.innerHTML;
           var oldL = inner.scrollLeft;
           inner.scrollLeft += 1;
           var newL = inner.scrollLeft;
           if (oldL === newL) {
               inner.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;" + val;
           }
       }
       var timer=window.setInterval(fn, 10);
       inner.onmouseover=function(){
           window.clearInterval(timer);
       };
       inner.onmouseout=function() {
           timer=window.setInterval(fn, 10);
       }

   }();

    var oUl=document.getElementById("ul1");
    var oList=oUl.getElementsByTagName("li");
    for(var i=0;i<oList.length;i++) {
        oList[i].onmouseover=function(){
            this.className="bg";
        };
        oList[i].onmouseout=function(){
            this.className="";
        };

        ~function (i) {

            var oLi = oList[i];

            oLi.onclick = function () {
                var aa =utils.offset(oDivs[i]).top+1;

                var bb = document.documentElement.scrollTop || document.body.scrollTop;

                var step=((aa-bb)/500)*10;
                var timer = window.setInterval(function () {
                 if(bb<=aa+1&&bb>=aa-1){
                     window.clearInterval(timer);
                     return;
                 }
                   bb+=step;
                    document.documentElement.scrollTop=bb;
                    document.body.scrollTop=bb;

                }, 10);
            }
        }(i);

    }

var curEle=document.getElementById("div1");
curEle.onclick = function () {
    this.style.display = "none";
    window.onscroll = null;
    var target = document.documentElement.scrollTop || document.body.scrollTop;
    var duration = 1000, interval = 100, step = (target / duration) * interval;
    var timer = window.setInterval(function () {
        if (target <= 0) {
            window.clearInterval(timer);
            window.onscroll = scrollMove;
            return;
        }
        target -= step;
        document.documentElement.scrollTop = target;
        document.body.scrollTop = target;
    }, interval);
};
function scrollMove() {
    var curT = document.documentElement.scrollTop || document.body.scrollTop;
    var winH = document.documentElement.clientHeight || document.body.clientHeight;
    if (curT >= (winH / 2)) {
        curEle.style.display = "block";
    } else {
        curEle.style.display = "none";
    }
}
window.onscroll = scrollMove;












