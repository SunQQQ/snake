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
  console.log(userName);

  // 在localstorage里存下用户输入，或默认生成的昵称
  localStorage.setItem('snakeUserName',userName);
};

MessageBox.prototype.openMessageBox = function () {
  document.getElementsByClassName('wrapper')[0].style.display = 'flex';

  // 请求成绩列表接口，获取游戏记录条数。

  // 根据返回数据，拼接成默认用户名：比如 游客1

  // input填入默认用户名
  document.getElementsByTagName('input')[0].value = '游客1';
};

// 封装请求数据的方法，实现重用
MessageBox.prototype.getData = function (para,callback) {
  //创建异步对象
  var xhr = new XMLHttpRequest();
  //设置请求的类型及url
  //post请求一定要添加请求头才行不然会报错
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.open('post', '02.php' );
  //发送请求
  xhr.send('name=fox&age=18');
  xhr.onreadystatechange = function () {
    // 这步为判断服务器是否正确响应
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText);
      callback(xhr.responseText);
    }
  };

};

MessageBox.prototype.updateScore = function () {
  // 访问成绩列表接口，获取成绩数组

  // 将数组渲染成列表
};