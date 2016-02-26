var returnBtn = document.getElementById("return-top");
var oUl = document.getElementById("oUl");
var oLis = document.getElementsByTagName("li");
var oDivs = document.getElementsByClassName("img");

returnBtn.onclick = function () {

    returnBtn.style.display = "none";
    window.onscroll = null;

    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var step = (scrollTop / 1000) * 10;
    var timer = window.setInterval(function () {
        if (scrollTop <= 0) {
            window.clearInterval(timer);
            window.onscroll = onScroll;
            return;
        }
        scrollTop -= step;
        document.documentElement.scrollTop = scrollTop;
        document.body.scrollTop = scrollTop;
    }, 10);
}

~function menu() {

    for (var i = 0; i < oLis.length; i++) {
        (function (i) {
            var cur = oLis[i];

            cur.onclick = function () {

                var targetT = utils.offSet(oDivs[i]).top;
                var curScroll = document.documentElement.scrollTop || document.body.scrollTop;
                var step = ((targetT - curScroll) / 1000) * 10;
                var direction = (targetT - curScroll) > 0 ? 1 : -1;
                var timer = window.setInterval(function () {
                    if ((curScroll - targetT) * direction >= 0) {
                        document.documentElement.scrollTop = targetT;
                        document.body.scrollTop = targetT;
                        clearInterval(timer);
                        return;
                    }
                    curScroll += step;
                    document.documentElement.scrollTop = curScroll;
                    document.body.scrollTop = curScroll;
                }, 10);

                this.innerHTML = this.getAttribute("info");
            }
            cur.onmouseover = function () {
                if (this.className === "select") {
                    return;
                }
                this.className = "hover";
                this.innerHTML = cur.getAttribute("info");
            }
            cur.onmouseout = function () {
                if (this.className === "select") {
                    return;
                }
                this.className = "";
                this.innerHTML = cur.getAttribute("index");
            }
        })(i);
    }
}();

function onScroll() {

    ~function showNav() {

        var navT = utils.offSet(oDivs[0]).top - document.documentElement.clientHeight || document.body.clientHeight;
        var navB = utils.offSet(oDivs[oDivs.length - 1]).top + oDivs[oDivs.length - 1].offsetHeight;
        var winT = document.documentElement.scrollTop || document.body.scrollTop;
        if (winT > navT && winT < navB) {
            oUl.style.display = "block";
        }
        else {
            oUl.style.display = "none";
        }
    }();

    ~function showNowNav() {

        for (var i = 0; i < oDivs.length; i++) {
            (function (i) {
                var cur = oDivs[i];
                var boforeT = i === 0 ? 0 : (oDivs[i - 1].offsetHeight) / 2;
                var curT = utils.offSet(cur).top - boforeT;
                var curB = utils.offSet(cur).top + (cur.offsetHeight) / 2;
                var winT = document.documentElement.scrollTop || document.body.scrollTop;
                if (winT >= curT && winT <= curB) {
                    for (var j = 0; j < oLis.length; j++) {
                        oLis[j].innerHTML = oLis[j].getAttribute("index");
                        oLis[j].className = "";
                    }
                    oLis[i].innerHTML = oLis[i].getAttribute("info");
                    oLis[i].className = "select";
                }
            })(i);
        }
    }();

    ~function showReturnTopBtn() {

        var curT = document.documentElement.scrollTop || document.body.scrollTop;
        var winH = document.documentElement.clientHeight || document.body.clientHeight;
        if (curT > (winH / 2)) {
            returnBtn.style.display = "block";
        } else {
            returnBtn.style.display = "none";
        }
    }();
}

window.onscroll = onScroll;
