/**
 * author: sunquan 2017/3/9.
 *
 * 本文件用js语言实现一个贪吃蛇游戏；
 */
var tds = [],         //
    egg,
    eggNum = 0,
    timer,
    gameSpeed = 200,
    headerTr = 0,
    headertd = 0,
    preDirection;


/*画棋盘 把所有td装到一个二维数组里*/
var chessboard = document.getElementById('chessboard');
for(var i=0;i<30;i++){
    // 插入一个行元素，appendChild还返回插入的节点
    var thistr = chessboard.appendChild(document.createElement('tr')); //
    var thistds = [];
    // 给行元素插入30个列元素
    for(var k=0;k<30;k++){
        thistds[k] = thistr.appendChild(document.createElement('td'));
    }
    // 这样，数组tds的每一个值，又都是一个数组。通过两层下标就可以准确的取到对应的td块
    tds[i] =  thistds;
}

//画蛇身体
function Snake() {}
Snake.prototype = {
    snakeBody:[],
    turn:function () {
        var direction = arguments[0];

        // 限制回退操作
        if((preDirection=="left"&&direction=="right")||(preDirection=="right"&&direction=="left")){
            return;
        }else if((preDirection=="up"&&direction=="down")||(preDirection=="down"&&direction=="up")){
            return;
        }
        preDirection = direction;

        clearInterval(timer);

        if(direction=="left"){
            headertd-=1;
        }else if(direction=="right"){
            headertd+=1;
        }else if(direction=="up"){
            headerTr-=1;
        }else if(direction=="down"){
            headerTr+=1;
        }

        if(headertd>29||headerTr>29||headertd<0||headerTr<0){
            clearInterval(timer);
            alert("已撞晕，game over");
            window.location.reload();
        }else if(biteMyself()){
            clearInterval(timer);
            alert("咬自己了，game over");
            window.location.reload();
        }else {
            if(snake.snakeBody[snake.snakeBody.length-1]==egg){
                makeEgg();
                snake.snakeBody[0].style.backgroundColor = "black";
            }else {
                this.snakeBody[0].style.backgroundColor = "#cbcbcb";
                this.snakeBody[0].style.border = "1px solid #cbcbcb";
                this.snakeBody.shift();
            }

            this.snakeBody.push(tds[headerTr][headertd]);


            this.snakeBody[this.snakeBody.length-1].style.backgroundColor = "black";
            this.snakeBody[this.snakeBody.length-1].style.border = "1px solid black";
        }

        timer = setInterval(function () {
            snake.turn(direction);
        },gameSpeed);
    }
}
var snake = new Snake();
snake.snakeBody.push(tds[0][0]);

makeEgg('black');
makeEgg('red');

window.addEventListener("keydown",function (e) {
    if(e.keyCode=="40"){
        snake.turn("down");
    }else if(e.keyCode=="37"){
        snake.turn("left");
    }else if(e.keyCode=="39"){
        snake.turn("right");
    }else if(e.keyCode=="38"){
        snake.turn("up");
    }
});


/** 随机的渲染一个方块
 * color:蛋的背景色，和蛋的边框颜色
 */
function makeEgg(color) {
    egg = tds[parseInt(Math.random()*30)][parseInt(Math.random()*30)];
    egg.style.backgroundColor = color;
    egg.style.border = "1px solid " + color;

    document.getElementsByClassName("warm")[0].innerHTML = "你吃了"+eggNum+"个蛋";

    eggNum+=1;

    if(eggNum==2){
        gameSpeed-=30;
    }else if(eggNum==4){
        gameSpeed-=30;
    }else if(eggNum==6){
        gameSpeed-=30;
    }else if(eggNum==8) {
        gameSpeed -= 30;
    }else if(eggNum==8) {
        gameSpeed -= 20;
    }
}

function biteMyself() {
    for(var b=0,snakelength=snake.snakeBody.length-1;b<snakelength;b++){
        if(snake.snakeBody[snakelength]==snake.snakeBody[b]){
            return true;
        }
    }
    return false;
}