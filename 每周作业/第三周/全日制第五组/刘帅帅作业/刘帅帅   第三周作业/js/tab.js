

var oTab=document.getElementById("tab");
var oLis=oTab.getElementsByTagName("li");
var oDivs=oTab.getElementsByTagName("div");
var oUl=document.getElementById("ul1");

function bindDate(){
    var str="";
    str+="<ul id='ul1'>";
    for(var i=0;i<jsonAry.length;i++){
        var cur=jsonAry[i];
        str+="<li> "+cur.title+" </li>";
    }
    str+="</ul>";
    for(var k=0;k<jsonAry.length;k++){
        var curT=jsonAry[k];
        str+="<div> "+curT.hover+" </div>";
    }
    oTab.innerHTML=str;
}
bindDate();






























