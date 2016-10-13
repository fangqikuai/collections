window.onload = function(){
    var wrapper = document.getElementById("wrapper"),
        disX,
        disY,
        degX = 0,
        degY = 0;
    wrapper.onmousedown = function(e){
        e = e || event;
        var cx = e.clientX;
        var cy = e.clientY;
        document.body.style.cursor = 'url("data:image/gif;base64,R0lGODlhEAAQAJECAAAAAP///////wAAACH5BAEAAAIALAAAAAAQABAAQAI3lC8AeBDvgosQxQtne7yvLWGStVBelXBKqDJpNzLKq3xWBlU2nUs4C/O8cCvU0EfZGUwt19FYAAA7"), ew-resize';
        window.onmousemove = function(e){
            e = e || event;
            var nx = e.clientX,
                ny = e.clientY;
            disY = ny - cy;
            disX = nx - cx;
            cx = e.clientX;
            cy = e.clientY;
            degX += disX*0.2;
            degY -= disY*0.2;
            wrapper.style.transform = "rotateY(" + degX + "deg) rotateX(" + degY + "deg)"
        }
        window.onmouseup = function(){
            window.onmousemove = null;
            document.body.style.cursor = 'default';
        }
    }
}