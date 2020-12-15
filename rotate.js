var index=0;
var imgs=document.getElementsByClassName("item");//图片
var leftImg=document.getElementById("leftImg");//向左
var rightImg=document.getElementById('rightImg');//向右
var points=document.getElementsByClassName("point");//小点点
var timeOut=0;
function clearActive(){
    for(var i=0;i<imgs.length;i++){
        imgs[i].className='item';
        points[i].className='point';
        }
}
function goNext(){
    clearActive();
    index++;
    index=index%imgs.length;
    imgs[index].className='item active';
    points[index].className='point active';
    timeOut=0;
}
function goPre(){
    clearActive();
    index--;
    if(index<0){
        index=imgs.length-1;
    }
    imgs[index].className='item active';
    points[index].className='point active';
}
/*当鼠标悬停在向左向右的图片上方时需要改变图片样式使用户得到相应的反馈，这里学习了小米商城主页轮播图的做法，只用一张图片，通过改变这张图片到边界的距离实现样式改变*/
function preHover(){
    leftImg.style.marginLeft="0px";
}
function nextHover(){
    rightImg.style.marginLeft="-60px";
}
function preHout(){
    leftImg.style.marginLeft="-120px";
}
function nextHout(){
    rightImg.style.marginLeft="-180px";
}
/*************************************************/
function jmpByPoint(pointIndex){
    clearActive();
    index=pointIndex;
    imgs[index].className="item active";
    points[index].className='point active';
    timeOut=0;
}
for(var i=0;i<points.length;i++){
    points[i].addEventListener('click',function(){
        var pointIndex=this.getAttribute("data-index");
        jmpByPoint(pointIndex);
    })
}

leftImg.addEventListener('click',function(){
    goPre();
})
leftImg.addEventListener('mouseover',function(){
    preHover();
})
leftImg.addEventListener('mouseout',function(){
    preHout();
})
rightImg.addEventListener('click',function(){
    goNext();
})
rightImg.addEventListener('mouseover',function(){
    nextHover();
})
rightImg.addEventListener('mouseout',function(){
    nextHout();
})


setInterval(function(){ 
    timeOut++;
    if(timeOut==10){
        goNext();
        timeOut=0;
    }
},500)
/*此方法使得timeOut参数每隔0.5（500ms）秒加一，当timeOut加到10时（即5秒）显示下一张图片，同时timeOut清零，
使用timeOut参数而不直接使用setInterval(fun(),5000)函数定时的目的在于：假设当用户点击点点跳到某张图片时，
距离到达5000毫秒只剩一丝丝时间，那张图片就马上跳走了，而用户可能还没来得及看清除图片，
使用timeOut定时后，当用户通过点跳转之后，将timeOut参数清零，可实现重新计时，就不会马上跳走，见function jmpByPoint(pointIndex)；*/