$(function() {
    $('#link_reg').on('click',function(){
        $('.ligin-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click',function(){
        $('.reg-box').hide();
        $('.ligin-box').show();
    })
    var form = layui.form;
form.verify({
   pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
      repwd:function(value){
var pwd =$('.reg-box [name=password]').val();
if (pwd!==value){
    return'两次密码不一致'
}
      }
})
// $('#form_reg').on('submit',function(e){
//     e.preventDefault();
//     $.post('http://ajax.frontend.itheima.net/api/reguser',{username:$('#form-reg[name=username]').val(),password:$('#form-reg[name=password]').val()},function(res){
//         if(res.status!==0){
//             return console.log(res.message);
//         }
//         console.log('注册成功');
//     })
// })
// 监听注册表单的提交事件
$('#form_reg').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function(res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
   layer.msg('注册成功，请登录！')
      // 模拟人的点击行为
      $('#link_login').click()
    })
  })
  $('#form_login').submit(function(e){
e.preventDefault();
$.ajax({
    url:'/api/login',
    method:'POST',
    data:$(this).serialize(),
    success:function(res){
if (res.status !== 0){
    return layer.msg('登陆失败!')
}
layer.msg('登陆成功!')
localStorage.setItem('token',res.token)
location.href='/index.html'
    }
})
  })
})
