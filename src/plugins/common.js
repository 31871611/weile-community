



var opModal = {
  toast:function(opt,callback){
    alert(opt.time);
    var opt = {
      icon: opt.icon || false,             // icon：成功success、错误error、警告warning、通知info、加载中loading
      txt: opt.txt || '提示',
      time: (opt.time === 0 || opt.time) || 2                 // time：传false一直显示
    };

    // 创建
    var div = document.createElement("div");
    var html = '';
    html += '<div class="opacity"></div>';
    html += '<div class="modalToast">';
    if(opt.icon){
      html += '<i class="'+ opt.icon +'"></i>';
    }
    html += '<span>'+ opt.txt +'</span>';
    html += '</div>';

    div.innerHTML = html;
    document.body.appendChild(div);
    alert(opt.time);
    if(opt.time){
      return false;
    }
    // 删除.3秒
    setTimeout(function(){
      div.parentNode.removeChild(div);
      callback && callback();
    },opt.time * 1000)

  },
  alert:function(opt){

    var opt = {
      title: opt.title || "标题",
      content: opt.content || "内容",
      ok: opt.ok || "确认",
      onOk: opt.onOk || false,
      cancel: opt.cancel || "取消",
      onCancel: opt.onCancel || false
    }

    // 创建
    var div = document.createElement("div");
    var html = '';
    html += '<div class="opacity"></div>';
    html += '<div class="modalAlert">';
    html += '<div class="alert">';
    html += '<div class="title">';
    html += '<h2>' + opt.title + '</h2>';
    html += '</div>';
    html += '<div class="content">';
    html += '<p>' + opt.content + '</p>';
    html += '</div>';
    html += '<div class="btns">';
    if(opt.onCancel){
      html += '<button class="cancel">' + opt.cancel + '</button>';
    }
    html += '<button class="ok">' + opt.ok + '</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    div.innerHTML = html;
    document.body.appendChild(div);

    // 事件
    var modalAlert = document.querySelector('.modalAlert');
    if(opt.onCancel){
      modalAlert.querySelector('.cancel').onclick=function(){
        opt.onCancel && opt.onCancel()
        // 关闭
        div.parentNode.removeChild(div);
      }
    }

    modalAlert.querySelector('.ok').onclick=function(){
      opt.onOk && opt.onOk()
      // 关闭
      div.parentNode.removeChild(div);
    }

  }
}

/*
opModal.alert({
  title:'这是标题',
  content:"这是内容",
  ok:"这是确认",
  onOk:function(){
    alert('点了确定')
  }
})
*/


