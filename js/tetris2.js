/**
 * Created by OnlyMid_sq on 2017/3/9.
 */
var tds = [],
    egg,
    eggNum=0,
    timer,
    gameSpeed = 200,
    
    headerTr=0,
    headertd=0;


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
        clearInterval(timer);

        headertd-=1;

        if(headertd>29||headerTr>29||headertd<0||headerTr<0){
            clearInterval(timer);
            alert("已撞晕，game over");
            window.location.reload();
        }else {
            this.snakeBody[0].style.backgroundColor = "white";

            if(snake.snakeBody[snake.snakeBody.length-1]==egg){
                makeEgg();
            }else {
                this.snakeBody.shift();
            }

            this.snakeBody.push(tds[headerTr][headertd]);

            for(var b=0;b<this.snakeBody.length;b++){
                this.snakeBody[b].style.backgroundColor = "black";
                if(tds[headerTr][headertd]==this.snakeBody[b]&&tds[headerTr][headertd]!=this.snakeBody[this.snakeBody.length-1]){
                    alert("jj");
                }
            }


        }

        timer = setInterval(function () {
            snake.turnLeft();
        },gameSpeed);
    },
    turnRight:function () {
        clearInterval(timer);

        headertd+=1;

        if(headertd>29||headerTr>29||headertd<0||headerTr<0){
            clearInterval(timer);
            alert("已撞晕，game over");
            window.location.reload();
        }else {
            this.snakeBody[0].style.backgroundColor = "white";

            if(snake.snakeBody[snake.snakeBody.length-1]==egg){
                makeEgg();
            }else {
                this.snakeBody.shift();
            }

            this.snakeBody.push(tds[headerTr][headertd]);
            for(var b=0;b<this.snakeBody.length;b++){
                this.snakeBody[b].style.backgroundColor = "black";
                if(tds[headerTr][headertd]==this.snakeBody[b]&&tds[headerTr][headertd]!=this.snakeBody[this.snakeBody.length-1]){
                    alert("jj");
                }
            }
        }

        timer = setInterval(function () {
            snake.turnRight();
        },gameSpeed);
    },
    turnDown:function () {
        clearInterval(timer);

        headerTr+=1;

        if(headertd>29||headerTr>29||headertd<0||headerTr<0){
            alert("已撞晕，game over");
            window.location.reload();
        }else {
            this.snakeBody[0].style.backgroundColor = "white";

            if(snake.snakeBody[snake.snakeBody.length-1]==egg){
                makeEgg();
            }else {
                this.snakeBody.shift();
            }

            this.snakeBody.push(tds[headerTr][headertd]);

            for(var b=0;b<this.snakeBody.length;b++){
                this.snakeBody[b].style.backgroundColor = "black";
                if(tds[headerTr][headertd]==this.snakeBody[b]&&tds[headerTr][headertd]!=this.snakeBody[this.snakeBody.length-1]){
                    alert("jj");
                }
            }
        }


        timer = setInterval(function () {
            snake.turnDown();
        },gameSpeed);
    },
    turnTop:function () {
        clearInterval(timer);

        headerTr-=1;
        if(headertd>29||headerTr>29||headertd<0||headerTr<0){
            clearInterval(timer);
            alert("已撞晕，game over");
            window.location.reload();
        }else {
            this.snakeBody[0].style.backgroundColor = "white";

            if(snake.snakeBody[snake.snakeBody.length-1]==egg){
                makeEgg();
            }else {
                this.snakeBody.shift();
            }

            this.snakeBody.push(tds[headerTr][headertd]);

            for(var b=0;b<this.snakeBody.length;b++){
                this.snakeBody[b].style.backgroundColor = "black";
                if(tds[headerTr][headertd]==this.snakeBody[b]&&tds[headerTr][headertd]!=this.snakeBody[this.snakeBody.length-1]){
                    alert("jj");
                }
            }
        }

        timer = setInterval(function () {
            snake.turnTop();
        },gameSpeed);
    }
}
var snake = new Snake();
snake.snakeBody.push(tds[headerTr][headertd]);
for(var a=0;a<snake.snakeBody.length;a++){
    snake.snakeBody[a].style.backgroundColor = "black";
}
makeEgg();

window.addEventListener("keydown",function (e) {
    if(e.keyCode=="40"){
        snake.turnDown();
    }else if(e.keyCode=="37"){
        snake.turnLeft();
    }else if(e.keyCode=="39"){
        snake.turnRight();
    }else if(e.keyCode=="38"){
        snake.turnTop();
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
