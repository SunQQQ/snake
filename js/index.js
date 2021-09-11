var messageBox = new MessageBox();

// messageBox.init();

// 游戏结束后的处理逻辑
var OverDeal = function (gameData) {
    var userName = localStorage.getItem('snakeUserName'),
        currentTime = (new Date).toLocaleString();

    var para = JSON.stringify({
        userName: userName,
        score: gameData.score - 10,
        gameTime: gameData.time,
        createTime: currentTime
    });

    messageBox.reloadGame(gameData.score - 10,gameData.overReason);
};

var snakeObject = new Snake({
    gameSpeed: 200,
    gameOver: OverDeal
});

snakeObject.drawChessBoard();// 画棋盘

snakeObject.upDownAnimation(function () {   // 欢迎动画

    messageBox.getUserInfo(function () {
      snakeObject.beginGame();
    });

    snakeObject.listenKeyDown(); //监听上下左右按钮
    var firstBody = snakeObject.createRandomBlock('black');// 随机上色一个方块
    snakeObject.headerTr = firstBody.horizon;// 初始化蛇头位置
    snakeObject.headertd = firstBody.vertical;
    snakeObject.snakeBody.push(snakeObject.tds[snakeObject.headerTr][snakeObject.headertd]);//将蛇头放入蛇身
    snakeObject.createEgg();// 创建一个蛋

    snakeObject.updateTime(true);
});
