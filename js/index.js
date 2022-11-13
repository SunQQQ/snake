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

    messageBox.myAjax({
        url: 'http://39.104.22.73:8081/ScoreCreate/foreend',
        data: para,
        success: function (data) {
            // 重载英雄榜
            messageBox.reloadScoreList();
            // 弹出游戏结束弹框
            messageBox.reloadGame(gameData.score - 10,gameData.overReason);
        }
    });
};

var snakeObject = new Snake({
    gameSpeed: 500,
    gameOver: OverDeal
});

snakeObject.drawChessBoard();// 画棋盘

messageBox.reloadScoreList(); // 渲染榜单记录

snakeObject.upDownAnimation(function () {   // 欢迎动画

    // messageBox.getUserInfo(function () {
    //   snakeObject.beginGame();
    // });

    // 开始游戏
    snakeObject.beginGame();

    snakeObject.listenKeyDown(); //监听上下左右按钮
    var firstBody = snakeObject.createRandomBlock('black',true);// 创建蛇身

    snakeObject.headerTr = firstBody.horizon;// 初始化蛇头位置
    snakeObject.headertd = firstBody.vertical;
    snakeObject.snakeBody.push(snakeObject.tds[snakeObject.headerTr][snakeObject.headertd]);//将蛇头放入蛇身

    snakeObject.createEgg(true);// 创建一个蛋
    // snakeObject.createRandomBlock('white',true);

    // snakeObject.updateTime(true);
});
