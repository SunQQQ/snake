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

  // 绑定点击方法
  document.getElementsByClassName('head-button')[0].onclick = this.closeMessageBox;
  document.getElementsByClassName('skip')[0].onclick = this.closeMessageBox;
};


MessageBox.prototype.closeMessageBox = function () {
  document.getElementsByClassName('wrapper')[0].style.display = 'none';

  // 收集用户输入的昵称，或默认生成的昵称

  // 在localstorage里存下用户输入，或默认生成的昵称

};

MessageBox.prototype.openMessageBox = function () {
  document.getElementsByClassName('wrapper')[0].style.display = 'flex';

  // 设计默认的昵称

};

MessageBox.prototype.sendScore = function () {

};

MessageBox.prototype.updateScore = function () {

};