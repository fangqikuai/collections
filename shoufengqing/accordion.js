(function($){
    $.fn.accordion = function(){
        var flag = false;
        $('.accordion ul li').mouseover(function() {
            if(flag) return;
            flag = true;
            $('.accordion ul li').stop().animate({width:'100px'}, 8).find('img').css('opacity','0.5');
            $(this).stop().animate({width:'350px'},8,function(){flag = false;}).find('img').css('opacity','1');
        });
    }
})(jQuery)