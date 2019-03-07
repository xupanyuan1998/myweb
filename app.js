//引入中间件
var express=require('express');
//创建服务器
var app=express();
//引入ejs中间件
var ejs=require('ejs');
//引入自己写的路由文件
var router=require('./routes/router');
var api=require('./routes/api');
var main=require('./routes/main');
//引入mongoose 数据库的模块
var mongoose=require('mongoose');
//文件解析
var parse=require('body-parser');
//引用ckkoies模块
var cookie=require('cookies');

var userTable=require('./models/User');

var moment = require('moment');

//使用ejs的方法渲染页面
app.set('html','view engine');

app.set('views','./tpl');

app.engine('html',ejs.renderFile);

//cookie
app.use(function (req,res,next) {
	req.cookie=new cookie(req,res);/*望后台发送请求的时候加上cookie*/

	req.usersinfo={};
	/*console.log('bbb:' + req.usersinfo);
	console.log('aaa:'+req.cookie.get('users'));*/
	if (req.cookie.get('users')){
		try{
			req.usersinfo=JSON.parse(req.cookie.get('users'));
			userTable.findById(req.usersinfo._id).then(function (eee) {
				req.usersinfo.isAdmin=eee.isAdmin;
				/*console.log('你好管理员：'+JSON.stringify( req.usersinfo));*/
				next();
			})
		}catch(e){
			console.log(e);
		}
	}else {
		next();
	}
});
//设置发送的文件的内容
app.use(parse.urlencoded({extended:true}));
//设置静态页面渲染的路径 第一个参数需要托管的文件夹，express.static(__dirname+'/public' 表示要要渲染的那个目录下的所有文件
app.use('/public',express.static(__dirname+'/public'));

/*app.get('/',function (req,res) {
	res.render('main/boke1.ejs',{name:'jack'});
});*/
app.use('/admin',router);/*前端路由模块*/

app.use('/api',api);/*逻辑路由模块*/

app.use('/',main);
/*连接数据库       第一个参数：数据库的端口地址  第二个参数 {useNewUrlParser:true} 固定  如果连不上就把把错误信息打印出来*/
mongoose.connect('mongodb://localhost:27018/blog',{useNewUrlParser:true},function (err) {

	err?console.log(err):app.listen(8083);

})