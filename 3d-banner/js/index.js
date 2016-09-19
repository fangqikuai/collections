$(function(){
    var $ul = $('.banner-3d ul'),
        index =0,
        timer,
        hw = $ul.width() / 2,
        hh = $ul.height() / 2,
        xc = $ul.offset().left + hw,
        yc = $ul.offset().top + hh;  //获得中心点的位置
    timer = setInterval(changePic,6000);
    function changePic(){
        index++;
        $ul.find("li").eq(index).addClass('active').siblings().removeClass('active');
        if(index == 2) index = -1;
    }
    $ul.hover(function() {
        clearInterval(timer);
        $(this).find("li.active").on('mousemove',function(event){
            var event = event || window.event,
                pX = event.pageX,   //鼠标的位置
                pY = event.pageY,   //鼠标的位置

                distX = pX - xc,  //距离中心的距离
                distY = pY - yc,

                degY = distX / hw * 6,  //设置旋转的角度为正负6deg
                degX = -(distY / hh * 6),

                shadowX = -distX/hw * 30,  //设置阴影的位置
                shadowY = -distY/hh * 30;

            $(this).css('transform','rotateX('+ degX +'deg) rotateY(' + degY +'deg)').children('.banner-3d-shadow').css({
                    opacity: '1',
                    transition: 'opacity .2s',
                    transform: 'translate3d('+ shadowX +'px,' + shadowY + 'px,0)'
                });
            $(".banner-3d-box2").css({
                transform: 'translate3d('+ -(shadowX/3) +'px,' + -(degX) + 'px,-50px)'
            }).next().css({
                transform: 'translate3d('+ -(shadowX/2) +'px,' + -(degX) + 'px,0px)'
            });
        }).find(".banner-3d-shadow").on('mousemove',function(event){
            var event = event || window.event;
            event.stopPropagation();
        })
    }, function() {
        $(this).find('li.active').css('transform','rotateX(0deg) rotateY(0deg)').children('.banner-3d-shadow').css({
                opacity: '0'
        });
        $(".banner-3d-box2").css({
            transform: 'translate3d(0,0,0)'
        }).next().css({
            transform: 'translate3d(0,0,0)'
        });
        timer = setInterval(changePic,6000);
    });
})