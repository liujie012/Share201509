/**
 * Created by Administrator on 2016/1/18.
 */
将类数组转化为数组
var utils={
    listToArray:function(likeArray){
        var ary=[];
        try{
           ary=Array.prototype.slice.call(likeArray);
        }catch(e){
            for(var i=0;i<likeArray.length;i++){
                ary[ary.length]=likeArray[i];
            }
        }
        return ary;
    },
    toJSON:function(str){
      return  "JSON" in window?JSON.parse(str):eval("("+str+")");
    }
};































