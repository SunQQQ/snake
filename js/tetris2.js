/**
 * Created by OnlyMid_sq on 2017/3/9.
 */

var tds = [],
    eggs = 0,
    timer,
    headerTr=0,
    headertd=0

/*画棋盘 把所有td装到一个二维数组里*/
var chessboard = document.getElementById('chessboard');
for(var i=0;i<30;i++){
    var thistr = chessboard.appendChild(document.createElement('tr'));
    var thistds = [];
    for(var k=0;k<30;k++){
        thistds[k] = thistr.appendChild(document.createElement('td'));
    }
    tds[i] =  thistds;
}

//画蛇身体
function Snake() {
}
Snake.prototype = {
    snakeBody:[],
    turnLeft:function () {

    },
    turnRight:function () {
        headertd+=1;
        this.snakeBody[this.snakeBody.length-1];
    }
}
var snake = new Snake();
snake.snakeBody.push(tds[headerTr][headertd]);
for(var a=0;a<snake.snakeBody.length;a++){
    snake.snakeBody[a].style.backgroundColor = "black";
}
timer = setInterval(function () {
    snake.snakeBody.turnRight();
},1000);