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
  headerTr=0,
  headertd=0,
  preDirection;


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
    }
    timer = setInterval(function () {
      snake.turn(direction);
    },gameSpeed);
  }
}
var snake = new Snake();
snake.snakeBody.push(tds[0][0]);
snake.snakeBody[0].style.backgroundColor = "black";
makeEgg();

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

function makeEgg() {
  egg = tds[parseInt(Math.random()*30)][parseInt(Math.random()*30)];
  egg.style.backgroundColor = "red";

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