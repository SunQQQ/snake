var messageBox = new MessageBox();

messageBox.init();

var snakeObject = new Snake({
  gameSpeed: 200
});

snakeObject.drawChessBoard();// 画棋盘

snakeObject.upDownAnimation(function (){   // 欢迎动画
  messageBox.openMessageBox();

  snakeObject.listenKeyDown(); //监听上下左右按钮
  var firstBody = snakeObject.createRandomBlock('black');// 随机上色一个方块
  snakeObject.headerTr = firstBody.horizon;// 初始化蛇头位置
  snakeObject.headertd = firstBody.vertical;
  snakeObject.snakeBody.push(snakeObject.tds[snakeObject.headerTr][snakeObject.headertd]);//将蛇头放入蛇身
  snakeObject.createEgg();// 创建一个蛋
});
