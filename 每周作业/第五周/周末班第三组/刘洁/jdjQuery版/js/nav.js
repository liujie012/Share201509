/**
 * Created by Administrator on 2016/2/25.
 */
(function(){
    $("#right li").hover(function(){
        $(this).addClass("over").
        find("div").css("display","block");
    },function(){
        $(this).removeClass("over").
        find("div").css("display","none");
    })
})()
