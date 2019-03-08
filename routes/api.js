//引用中间件
var express=require('express');

var api=express.Router();
/*引用创建的数据库*/
var userTable=require('../models/User');
/*声明一个空对象*/
var reponsetext={};
/*想后台发送请求 并接收后台返回的，next接收到之后执行的函数*/
api.use(function (req,res,next) {
	reponsetext={

		code : 0 ,

		msg :'success'
	};
	next();
});
//注册
/*当访问的目录中带有/user/res，打印一下给后台的请求     req.body：请求方式为post的时候获取前端请求的数据的方法*/
api.post('/user/res',function (req,res) {
	/*console.log(req.body)*/
	;/*{ username: 'qqq', password: '111', repassword: '1111' }*/
	var username=req.body.username;
	var password=req.body.password;
	var repassword=req.body.repassword;
	//判断输入username是否为空，返回用户名不能为空
	if (username==''){
		reponsetext.code=1;
		reponsetext.msg='用户名不能为空';
		res.send(reponsetext);
		return;
	};/*判断输入的密码是否为空 如果为空返回密码不能为空*/
	if(password==''){
		reponsetext.code=2;
		reponsetext.msg='密码不能为空';
		res.send(reponsetext);
		return;
	};
	/*判断第二次输入的密码是否和第一次收入的密码相等；不相等就返回两次密码不一致请重新输入*/
	if (repassword!=password){
		reponsetext.code=3;
		reponsetext.msg='两次密码不一致请重新输入';
		res.send(reponsetext);
		return;
	}
	/*在数据库中查找*/
	userTable.findOne({
		username:username/*对比前端发送的username和数据库里面的username*/
	}).then(function (info) {/*之后要做的事*/
		/*console.log('info:'+info);*/
		if (info){/*判断有没有info的值，如果有的话就返回用户已存在*/
			reponsetext.code=6;
			reponsetext.msg='用户已存在';
			res.send(reponsetext);
			return;
		} else{/*如果没有就往数据库里面写入一条新的数据*/
			var user=new userTable({
				username: username,
				password:password
			});
			return user.save();/*写入之后就往数据库里提交*/
		}
	}).then(function (newInfo) {/*然后返回给前端注册成功*/
		/*console.log(newInfo+1);*/
		reponsetext.code=7;
		reponsetext.msg='注册成功';
		res.send(reponsetext);
	})
});
//登录
api.post('/user/login',function (req,res) {
	var username=req.body.username;
	var password=req.body.password;
	if (username==''){

		reponsetext.code=4;

		reponsetext.msg='用户名不能为空';

		res.send(reponsetext);

		return;
	};
	if(password==''){
		reponsetext.code=5;
		reponsetext.msg='密码不能为空';
		res.send(reponsetext);
		return;
	};
	userTable.findOne({/*判断数据库中的用户名和密码*/
		username:username,
		password:password
	}).then(function (info) {
		if (!info){
			reponsetext.code=7;
			reponsetext.msg='用户名不存在';
			res.send(reponsetext);
			return;
		}
			req.cookie.set('users',JSON.stringify({/*设置cookie的名字   user：要设置的cookie的名字  JSON.stringify；将json格式的数据转化为字符串格式 */
				_id:info._id,
				username:info.username
			}));
			res.send(reponsetext);
			res.end();
	})
});
//退出
api.get('/' + 'user/loginout',function (req,res) {
		req.cookie.set('users',null);
		reponsetext.code=8;
		reponsetext.msg='退出成功';
		res.send(reponsetext);
		res.end();

});
module.exports=api;/*将module导出*/