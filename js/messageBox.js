/**
* author:sunquan 2021/8/29
* 实现一个排名类，从弹框收集数据开始，到排名展示
*/
function MessageBox() {
  
}

MessageBox.prototype.init = function(){
  document.getElementsByClassName('conform')[0].onclick = function () {
    alert('conform');

  };

  // 按钮绑定点击方法
  document.getElementsByClassName('head-button')[0].onclick = this.closeMessageBox;
  document.getElementsByClassName('skip')[0].onclick = this.closeMessageBox;
};

// 关闭弹框
MessageBox.prototype.closeMessageBox = function () {
  document.getElementsByClassName('wrapper')[0].style.display = 'none';

  // 收集用户输入的昵称，或默认生成的昵称
  var userName = document.getElementsByTagName('input')[0].value;

  // 在localstorage里存下用户输入，或默认生成的昵称
  localStorage.setItem('snakeUserName',userName);
};

MessageBox.prototype.openMessageBox = function () {
  // 弹出输入框
  document.getElementsByClassName('wrapper')[0].style.display = 'flex';

  // 请求成绩列表接口，获取游戏记录条数。
  this.myAjax({
    url:'http://39.104.22.73:8081/ScoreRead/foreend',
    success:function (data){
      var data = JSON.parse(data),
      scoreList = data.data.scores,
      num = data.data.num,
      rankString = '';

      // input填入默认用户名
      document.getElementsByTagName('input')[0].value = '游客' + num;

      for(var i=0;i<scoreList.length;i++){
        rankString += ('<p>' + scoreList[i].userName + ': ' + scoreList[i].score + '分</p>');
      }

      // 更新榜单内容
      document.getElementsByClassName('ranking')[0].innerHTML = rankString;
    }
  });
};

// 封装请求数据的方法，实现重用
MessageBox.prototype.myAjax = function (para) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", para.url, true);
  
  // 添加http头，发送信息至服务器时内容编码类型
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(para.data ? para.data : '');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
      para.success(xhr.responseText);
    }
  };
};

MessageBox.prototype.updateScore = function () {
  // 访问成绩列表接口，获取成绩数组

  // 将数组渲染成列表
};