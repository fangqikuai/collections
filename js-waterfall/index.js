window.onload = function(){
    var WaterfallObj = new Waterfall({
        contentId : 'content',
        itemClass: 'item-wrapper'
    });
    //onresize事件触发有多次快速触发的bug，应该设置节流来降低次数，使得每改变窗口大小只执行一次事件
    window.onresize = throttle(function(){
        WaterfallObj.render();
    },200)
    function throttle(fn,delay){
        var timer = null;
        return function(){
            clearTimeout(timer);
            timer = setTimeout(fn,delay);
        }
    }
    //鼠标滚动事件 加载更多内容
    window.onscroll = function(){
        if(checkPosition()){
            var contentObj = document.getElementById("content");
            //调用json文件实现懒加载
            var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            xhr.open("get","pic.json","true");
            xhr.send(null);
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 && xhr.status == 200){
                    var data = JSON.parse(xhr.responseText);
                    console.log(data);
                    var html =[];
                    for(var i = 0, len = data.data.length; i < len; i++){
                        var _data = data.data[i];
                        html.push('<div class="item-wrapper">');
                        html.push('<div class="item">');
                        html.push('<img src=' + _data.pic + ' />');
                        html.push('<div class="footer">');
                        html.push('<p>' + _data.title +'</p>');
                        html.push('<div class="status">');
                        html.push('<span class="repost"><i class="fa fa-share"></i>' + _data.repost + '</span>');
                        html.push('<span class="like"><i class="fa fa-heart"></i>' + _data.like +' </span>');
                        html.push('</div>');
                        html.push('</div>');
                        html.push('</div>');
                        html.push('</div>');
                    }
                    contentObj.innerHTML += html.join("");
                    setTimeout(function(){
                        var WaterfallObj2 = new Waterfall({
                            contentId : 'content',
                            itemClass: 'item-wrapper'
                        });
                        window.onscroll = null;
                    },100)
                }
            }
        }
    }
}

//构造函数
function Waterfall(options){
    //容器盒子的ID
    this.content = options.contentId;
    //内容的class
    this.itemClass = options.itemClass;
    //盒子的dom对象
    this.contentObj = document.getElementById(options.contentId);
    //初始化方法
    this.render();
}

//原型链函数
Waterfall.prototype.render = function(){

    //调用方法 根据class名获取每个dom对象
    var oItems = getElementsByClass(this.itemClass);
    //每个小容器的宽度
    var itemWidth = oItems[0].offsetWidth;
    //窗口的可视宽度
    var documentWidth = document.documentElement.clientWidth || document.body.clientWidth;
    //每行显示的列数
    var colsNum =  Math.floor(documentWidth / itemWidth);
    // 设置居中
    this.contentObj.style.cssText = "width: " + (colsNum * itemWidth) + "px; margin: 0 auto";
    // 用数组来存储每一列的高度
    var colsHeightArr = [];
    var item;
    //遍历所有dom元素
    for(var i = 0, len =oItems.length; i < len; i++){
        item = oItems[i];
        if(i < colsNum){  //最上边一行元素作为初始高度的基点
            colsHeightArr.push(item.offsetHeight);
            item.style.position = "";
        }else{
            //获取每次列的最小的高度
            var minHeight = Math.min.apply(null,colsHeightArr);
            //获取每次最小列的下标
            var minHeightIndex = this._getIndex(colsHeightArr,minHeight);
            //设置定位
            item.style.position = 'absolute';
            //设置定位距离上边位置
            item.style.top = minHeight + "px";
            //设置定位距离左边位置
            item.style.left = minHeightIndex * itemWidth + "px";
            //每遍历一次必须更新一下数组，让其更新，使得最小值发生相应的变化
            colsHeightArr[minHeightIndex] += item.offsetHeight;
        }
    }

}

//获取最小高度相应的索引
Waterfall.prototype._getIndex = function(arr,val){
    for(var i in arr){
        if(arr[i] == val){
            return i;
        }
    }
}
//检测是否到了最后元素
function checkPosition (){
    var oItems = getElementsByClass("item-wrapper");
    var lastItemTop = oItems[oItems.length - 1].offsetTop;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var clientHeight = document.documentElement.clientHeight;
    return lastItemTop <= (scrollTop + clientHeight);
}
//获取操作dom元素  根据class获取
function getElementsByClass(s){
    var items = [];
    if(document.querySelectorAll){  // IE兼容问题
        items = document.querySelectorAll('.' + s);
    }else{
        var allItems = this.contentObj.getElementsByTagName("*");
        for(var i = 0, len = allItems.length; i < len; i++){
            var item = allItems[i];
            if(item.className === s){
                items.push(item);
            }
        }
    }
    return items;
}