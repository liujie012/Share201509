/**
 * Created by Administrator on 2016/1/18.
 */
//    1找到对应的元素
var oTab=document.getElementById("tab");
var oThead=oTab.tHead;
var oTbody=oTab.tBodies[0];
var orows=oTbody.rows;
var oThs = oThead.rows[0].cells;//第一行的所有td

//2.先绑定数据
function bindData(){
    var frg=document.createDocumentFragment();
    for(var i=0;i<jsonAry.length;i++){
        var tr=document.createElement("tr");
        var cur=jsonAry[i];
        cur.sex = (cur.sex === 0 ? "男" : "女");
        for(var key in cur){
            var td=document.createElement("td");
            td.innerHTML=cur[key];
            tr.appendChild(td);
        }
        frg.appendChild(tr);
    }
    oTbody.appendChild(frg);
    frg=null;
}
bindData();

//3.实现隔行变色
function changeBg(){
    for(var i=0;i<orows.length;i++){
      // console.log(orows[i]);
        orows[i].className=(i%2===1?"bg":null);
    }
}
changeBg();
//4.按照武力值进行大小排序
function listSort(){
    var _this=this;
   _this.flag*=-1;//这里面的this是ths[2]
    //1首先把tr变成数组
    var ary=utils.listToArray(orows);

//console.log(ary instanceof Array);
//2然后进行排序
    ary.sort(function(a,b){
        //console.log(a);
        var prevcur= a.cells[2].innerHTML;
        var nexcur= b.cells[2].innerHTML;
        return (parseFloat(prevcur)-parseFloat(nexcur))* _this.flag;//匿名函数里面的this 是window,所以不能用this来代表，用一个变量——this来代表this
    });
    //3将排完序的dom映射加载到页面
    var frg=document.createDocumentFragment();
   for(var i=0;i<ary.length;i++){
       frg.appendChild(ary[i]);
   }
   oTbody.appendChild(frg);
    frg=null;
//    4.按最新的奇偶行数行实现改变背景颜色
    changeBg();
}
//5.点击第三列的时候实现排序，就是className="cursor"
oThs[2].flag=-1;
 oThs[2].onclick=function(){
     listSort.call(this);
 }

