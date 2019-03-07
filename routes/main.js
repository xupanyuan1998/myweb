var express=require('express');
var category=require('../models/category');
var router=express.Router();/*引用中间件路由*/
var article=require('../models/article');
var moment = require('moment');

//router.get() 路由的方法 get和post
/*router.get('/',function (req,res) {/!*当访问根目录的时候*!/
	//res.render();是res的方法 第一个参数是要渲染的模板的路径，第二个参数是数据
	/!*console.log('eeeee: ' + JSON.stringify(req.usersinfo) );*!/
	res.render('main/boke1.ejs',{usersinfo:req.usersinfo});
	/!*res.send('main');
	res.end;*!/
});*/
router.get('/index',function (req,res) {
	var page=Number(req.query.page)||1;
	category.find().then(function (info) {
		article.count().then(function (count) {
			var limit=5;
			var pages=Math.ceil(count/limit);
			var skip=(page-1)*limit;
			if (page<0)page=1;
			if (page>pages)page=pages;
			article.find().limit(limit).skip(skip).then(function (info2) {
				res.render('main/boke1.ejs',{name:info,usersinfo:req.usersinfo,info2:info2,pages:pages,page:page});
			})

		})
	})
});
/*router.get('/index',function (req,res) {
	console.log(req.query)
	var page=req.query.page;
	article.count().then(function (count) {

	})
})*/
module.exports=router;