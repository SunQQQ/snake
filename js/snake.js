/**
* author: sunquan 2017/3/9.
*
* 本文件用js语言实现一个贪吃蛇类；
*/
function Snake(para) {
  // 在新建蛇时可以修改的参数
  this.gameSpeed = para.gameSpeed; //游戏开场时的速度
  this.gameOver = para.gameOver;

  // 初始化的参数
  this.snakeBody = [];  // 蛇的身体
  this.eggNum = 0;      // 蛋的个数
  this.headerTr = 0;    // 蛇头的横坐标
  this.headertd = 0;    // 蛇头的纵坐标
  this.tds = [];        // 装整个棋盘的方块
  this.block = '';      // 染了色的方块
  this.timer = '';      // 初始一个计时器
  this.preDirection;    // 第一个蛇头的方向
  this.timeBegin = 0;   // 游戏计时变量
  this.timeWatch = '';  // 统计游戏持续时间
  this.direction = '';
}

// 蛇的转向
Snake.prototype.turn = function () {
  console.log('turn');
  var that = this;

  that.direction = arguments[0];

  // 限制回退操作
  if ((that.preDirection == "left" && that.direction == "right") || (that.preDirection == "right" && that.direction == "left")) {
    return;
  } else if ((that.preDirection == "up" && that.direction == "down") || (that.preDirection == "down" && that.direction == "up")) {
    return;
  }
  that.preDirection = that.direction;

  if (that.direction == "left") {
    this.headertd -= 1;
  } else if (that.direction == "right") {
    this.headertd += 1;
  } else if (that.direction == "up") {
    this.headerTr -= 1;
  } else if (that.direction == "down") {
    this.headerTr += 1;
  }

  if (this.headertd > 29 || this.headerTr > 29 || this.headertd < 0 || this.headerTr < 0) {
    window.clearInterval(that.timer);
    // alert("已撞晕，game over");
    // window.location.reload();
    this.updateTime(false);

    that.gameOver({
      score:that.eggNum * 10,
      time:that.timeBegin + 's'
    });
  } else if (this.biteMyself()) {
    clearInterval(that.timer);
    alert("咬自己了，game over");
    this.updateTime(false);


    window.clearInterval(that.timer);
    // alert("已撞晕，game over");
    // window.location.reload();
    this.updateTime(false);
    that.gameOver(that.eggNum * 10);
  } else {
    if (this.snakeBody[this.snakeBody.length - 1] == this.block) {
      this.createEgg();
      this.snakeBody[0].style.backgroundColor = "black";
    } else {
      this.snakeBody[0].style.backgroundColor = "rgb(88, 104, 88)";
      this.snakeBody[0].style.border = "3px solid rgb(88, 104, 88)";
      this.snakeBody.shift();
    }

    this.snakeBody.push(this.tds[this.headerTr][this.headertd]);


    this.snakeBody[this.snakeBody.length - 1].style.backgroundColor = "black";
    this.snakeBody[this.snakeBody.length - 1].style.border = "3px solid black";
  }
};

/**
 * 随机的给一个方块上色
 * color:方块的背景色，和边框颜色
 */
Snake.prototype.createRandomBlock = function (color) {
  var horizon = parseInt(Math.random() * 30),
    vertical = parseInt(Math.random() * 30);

  this.block = this.tds[horizon][vertical];
  this.block.style.backgroundColor = color;
  this.block.style.border = "3px solid " + color;

  return {
    horizon: horizon,
    vertical: vertical
  };
}

/**
 * 创建一个新的蛋，并刷新游戏成绩，提高游戏速度
 */
Snake.prototype.createEgg = function () {
  this.createRandomBlock('red');

  document.getElementsByClassName("score")[0].innerHTML = this.eggNum * 10;

  this.eggNum += 1;

  if (this.eggNum == 2) {
    this.gameSpeed -= 30;
  } else if (this.eggNum == 4) {
    this.gameSpeed -= 30;
  } else if (this.eggNum == 6) {
    this.gameSpeed -= 30;
  } else if (this.eggNum == 8) {
    this.gameSpeed -= 30;
  } else if (this.eggNum == 10) {
    this.gameSpeed -= 30;
  }
}

// 判断蛇是否咬到自己
Snake.prototype.biteMyself = function () {
  for (var b = 0, snakelength = this.snakeBody.length - 1; b < snakelength; b++) {
    if (this.snakeBody[snakelength] == this.snakeBody[b]) {
      return true;
    }
  }
  return false;
}

// 画棋盘，即地图
Snake.prototype.drawChessBoard = function () {
  /*画棋盘 把所有td装到一个二维数组里*/
  var chessboard = document.getElementById('chessboard');
  for (var i = 0; i < 30; i++) {
    // 插入一个行元素，appendChild还返回插入的节点
    var thistr = chessboard.appendChild(document.createElement('tr')); //
    var thistds = [];
    // 给行元素插入30个列元素
    for (var k = 0; k < 30; k++) {
      thistds[k] = thistr.appendChild(document.createElement('td'));
    }
    // 这样，数组tds的每一个值，又都是一个数组。通过两层下标就可以准确的取到对应的td块
    this.tds[i] = thistds;
  }
}

// 监听上下左右四个按键
Snake.prototype.listenKeyDown = function () {
  var that = this;
  window.addEventListener("keydown", function (e) {
    if (e.keyCode == "40") {
      that.turn("down");
    } else if (e.keyCode == "37") {
      that.turn("left");
    } else if (e.keyCode == "39") {
      that.turn("right");
    } else if (e.keyCode == "38") {
      that.turn("up");
    }
  });
};

// 游戏计时
Snake.prototype.updateTime = function (close) {
  var that = this;//给游戏更新持续时间;

  if(close){
    that.timeWatch = window.setInterval(function () {
      that.timeBegin += 1;
      document.getElementsByClassName('time')[0].innerHTML = that.timeBegin;
    },1000);
  }else {
    console.log('游戏计时停止');
    window.clearInterval(that.timeWatch);
    that.timeWatch = 0;
  }
}

// 游戏开场的上下动画
Snake.prototype.upDownAnimation = function(callback){
  var that = this,
    trNum = -1,
    tdNum = 30

  // 上下动画
  var upDownInter = window.setInterval(function () {
    trNum += 1;
    tdNum -= 1;

    if(trNum < 30){
      for(var i=0;i<29;i= i+2){
        that.tds[trNum][i].style.backgroundColor = 'black';
        that.tds[trNum][i].style.border = '3px solid black';
      }

      for(var t=29;t>-1;t= t-2){
        that.tds[tdNum][t].style.backgroundColor = 'black';
        that.tds[tdNum][t].style.border = '3px solid black';
      }
    }else {
      window.clearInterval(upDownInter);
      that.leftRightAnimation(callback);
    }
  },50);
}

// 游戏开场的左右动画
Snake.prototype.leftRightAnimation = function(callback){
  var that = this,
    leftRightTdStart = -1,
    leftRightTdEnd = 30;

  // 左右动画
  var leftRightInter = window.setInterval(function () {
    leftRightTdStart += 1;
    leftRightTdEnd -= 1;

    if(leftRightTdStart < 30){
      for(var i=0;i<29;i= i+2){
        that.tds[i][leftRightTdStart].style.backgroundColor = 'rgb(88, 104, 88)';
        that.tds[i][leftRightTdStart].style.border = '3px solid rgb(88, 104, 88)';
      }

      for(var t=29;t>-1;t= t-2){
        that.tds[t][leftRightTdEnd].style.backgroundColor = 'rgb(88, 104, 88)';
        that.tds[t][leftRightTdEnd].style.border = '3px solid rgb(88, 104, 88)';
      }
    }else {
      window.clearInterval(leftRightInter);
      callback();
    }
  },50);
}

Snake.prototype.beginGame = function (){
  var that = this;
  that.timer = window.setInterval(function () {
    that.turn(that.direction);
  }, that.gameSpeed);
}


