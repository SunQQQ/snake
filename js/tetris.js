/**
 * Created by OnlyMid_sq on 2017/3/9.
 */
/*画棋盘 把所有td装到一个二维数组里*/
var chessboard = document.getElementById('chessboard');
var alltd = [];
for(var i=0;i<30;i++){
    var thistr = chessboard.appendChild(document.createElement('tr'));
    var thistds = [];
    for(var k=0;k<30;k++){
        thistds[k] = thistr.appendChild(document.createElement('td'));
    }
    alltd[i] =  thistds;
}

var dir=4;/*水平向右方向*/
var blackspace=-1;/*空格键*/
//给键盘上下左右添加方法
document.onkeydown = function (e) {
    if (event.keyCode==37){dir=3;}// 左
    if (event.keyCode==38){dir=1;} // 上
    if (event.keyCode==39){dir=4;}// 右
    if (event.keyCode==40){dir=2;}// 下
    if (event.keyCode==32){
        blackspace = -blackspace;
        // myconsole(blackspace);
    }
};
// 初始化蛇
var snake = [];
var snakelength = 3;       /*蛇身的初始长度*/
var x=0; y=snakelength-1;  /*x,y刚开始时蛇头的坐标,*/
for(var i=0;i<snakelength;i++){
    snake[i]=alltd[0][i];                          /*构建蛇身数组(若干个td对象组成的舍身)*/
    alltd[0][i].style.backgroundColor = 'black';/*渲染出一条蛇蛇身*/
}
// 让蛇动起来。
var init;
if(blackspace==-1){
     init = setInterval(move,200);
}

/*随机生成鸡蛋*/
newegg();
var egg;
function newegg() {
    egg = alltd[Math.floor(Math.random()*30)][Math.floor(Math.random()*30)];
    egg.style.backgroundColor = 'black';
}

// 每次移动一下其实就是把蛇数组的第四个（头）换一个td，把第一个td（尾）颜色弄没，其余的td顺次前一下。
function move(){
    if(y==30||y>30){
        clearInterval(init);
    }else {
        snake[0].style.backgroundColor = '#ffffff';

        console.log('一次');

        if(blackspace==1){
            clearInterval(init);
        }

        for(var o=0;o<snake.length-1;o++){//将蛇身数组依次前移，挤掉蛇尾
            snake[o] = snake[o+1];
        }
        if(dir==1){//如果是向上前行
            snake[snake.length-1] = alltd[x-1][y];//任命新蛇头
            x-=1;//改变蛇头坐标
        }
        if(dir==2){//同理如果向下前行
            snake[snakelength-1] = alltd[x+1][y];
            x+=1;//改变蛇头坐标
        }
        if(dir==3){//同理向左前行
            snake[snakelength-1] = alltd[x][y-1];
            y-=1;//改变蛇头坐标
        }
        if(dir==4){//同理向右前行
            snake[snakelength-1] = alltd[x][y+1];
            y+=1;//改变蛇头坐标
        }
        snake[snake.length-1].style.backgroundColor= 'black';

        /*当吃到一个蛋*/
        // myconsole(alltd);
        // if(alltd[x][y] == egg){
        if(snake[snakelength-1] == egg){
            newegg();// 再生成一个
            snakelength++;// 长度加一
        }

        /*判断撞墙*/
        myconsole('x='+x+' y='+y);

        /*当蛇头碰到自己*/
        for(var i=0;i<snakelength;i++){
            if(snake[snakelength-1]==alltd[x][y]){
                alert['game over'];
            }
        }
        /*判断蛇头碰到自己*/
    }
}
























function myconsole(a) {
    console.log(a);
}
