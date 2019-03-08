var express=require('express');
var category=require('../models/category');
var router=express.Router();/*引用中间件路由*/
var article=require('../models/article');
//router.get() 路由的方法 get和post
/*router.get('/',function (req,res) {/!*当访问根目录的时候*!/
	//res.render();是res的方法 第一个参数是要渲染的模板的路径，第二个参数是数据
	/!*console.log('eeeee: ' + JSON.stringify(req.usersinfo) );*!/
	res.render('main/boke1.ejs',{usersinfo:req.usersinfo});
	/!*res.send('main');
	res.end;*!/
});*/
/*router.use(function (req,res,next) {
	name=[];
	usersinfo={};
	info2=[];
	page=1;
	pages=0;
	next();
})*/
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
router.get('/content',function (req,res) {
	var id=req.query.id;
	category.find().then(function (info) {
		article.findOne({
			_id:id
		}).then(function (info2) {
			info2.read++;
			info2.save();
			res.render('main/content.ejs',{name:info,info2:info2,usersinfo:req.usersinfo})
		})
	})
})
module.exports=router;