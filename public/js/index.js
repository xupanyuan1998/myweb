

$(function () {
	//admin=马上注册  #login=登录框 #zhuce=注册部分 #login1=登录按钮
	$('#admin1').on('click',function () {/*在注册上面点击的时候让登录部分隐藏 注册部分显示*/
		$('#login').hide();
		$('#zhuce').show();
	});
	$('#login1').on('click',function () {/*在登录上点击的时候让登录部分显示 注册部分隐藏*/
		$('#login').show();
		$('#zhuce').hide();
	});
	//注册
	//reg  注册
	$('#reg').on('click',function () {
		//在注册上面点击的时候 向后台发送ajax请求
		$.ajax({
			type:'post',/*请求的类型*/
			dataType:'json',/*发送请求的格式*/
			url:'/api/user/res',/*发送请求的路径*/
			data:{/*数据*/
				username:$('#user').val(),
				password:$('#pass').val(),
				repassword:$('#repass').val()
			},
			success:function (json) {/*发送成功，将后台返回的数据打印出来*/
				console.log(json);/*{code: 7, msg: "注册成功"}*/
				if(json.code===7){/*判断后台返回的状态码 等于7的话就说明注册成功*/
					$('#codeshow').show();/*显示注册成功*/
					$('#codeshow').html(json.msg);
					setTimeout(function () {
						$('#login').show();
						$('#zhuce').hide();
						$('#codeshow').hide();
					},3000)/*3秒之后让管理员的页面显示 登录页面隐藏*/
				}
			},
			error:function (err) {/*失败就将原因打印出来*/
				console.log(err);
			}
		});
	});

	//登录
	$('#logino').on('click',function () {
		$.ajax({
			type:'post',
			dataType: 'json',
			url:'api/user/login',
			data: {
				username:$('#inputEmail3').val(),
				password: $('#inputPassword3').val()
			},
			success:function (json) {
				console.log(json);
				if (json.code!=0) {
					alert(json.msg)
				}else{
					window.location.reload();
					/*$('#codeshow').show();
					$('#codeshow').html(json.msg);
					setTimeout(function () {
						$('#admin').fadeIn();
						$('#login').fadeOut();
						$('#codeshow').hide();
					},2000);*/
				}
			},
			error:function (err) {
				console.log(err);
			}
		})
	});
	//退出
	$('#logout').on('click',function () {
		$.ajax({
			url:'api/user/loginout',
			success:function (json) {
				if (json.code===8){
					window.location.reload();
				}
			}
		})


	})

});
