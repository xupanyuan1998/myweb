var express = require('express');
var app = express();
var router = express.Router();
var userdate = require('../models/User');
var category = require('../models/category');
var article = require('../models/article');

var jsonadd = {};

router.use(function (req,res,next) {
	if (!req.usersinfo.isAdmin) {
		res.send('!404')
		res.end();
	}
	next()
})
router.use(function (req, res, next) {
	jsonadd = {
		code: 1,
		msg: '添加成功'
	}
	next();
});
//创建用户管理的页面
router.get('/userslist', function (req, res) {
	var limit = 4;
	var page = Number(req.query.page) || 1;//当前在第几页
	userdate.count().then(function (count) {
		var pages = Math.ceil(count / limit);
		var skips = (page - 1) * limit;
		userdate.find().limit(limit).skip(skips).then(function (data) {
			res.render('./admin/admin.ejs', {data: data, limit: limit, count: count, pages: pages, page: page});
		})
	})
});
//创建分类列表的页面
router.get('/category', function (req, res) {
	category.find().then(function (info) {
		res.render('./admin/category.ejs', {data: info})
	})
});
//创建添加分类列表的页面
router.get('/category-add', function (req, res) {
	res.render('./admin/category-add.ejs', {})
});
//添加分类列表
router.post('/category-add', function (req, res) {
	var name = req.body.name;
	category.findOne({
		name: name
	}).then(function (info) {
		if (info) {
			jsonadd.code = 2;
			jsonadd.msg = '分类名重复';
			res.send(jsonadd);
			return;
		}
		var categorys = new category({
			name: name
		});
		return categorys.save();
		res.end();
	}).then(function (newinfo) {
		jsonadd.msg = '添加成功';
		res.send(jsonadd)
	});
});
/*删除分类列表*/
router.get('/category/del', function (req, res) {
	var id = req.query.id;
	category.remove({_id: id}).then(function (info) {
		jsonadd.code = 0;
		jsonadd.msg = '删除成功';
		res.send(jsonadd);
	})
});
/*修改分类列表*/
router.get('/category/modify', function (req, res) {
	var id = req.query.id;
	var name = req.query.name;
	category.findOne({
		_id: {$ne: id},
		name: name
	}).then(function (info) {
		if (info) {
			jsonadd.code = 3;
			jsonadd.msg = '您修改的分类名已存在 请重新输入';
			res.send(jsonadd)
			return;
		} else {
			return category.update({_id: id}, {name: name});
		}
	}).then(function (newinfo) {
		jsonadd.code = 4;
		jsonadd.msg = '修改成功';
		res.send(jsonadd)
	})
});
//文章列表
router.get('/article', function (req, res) {
	article.find().then(function (info) {
		res.render('./admin/article.ejs', {name: info})
	})

});
//文章添加
router.get('/articleadd', function (req, res) {
	category.find().then(function (info) {
		res.render('./admin/articleadd.ejs', {data: info})
	});
});
router.post('/articleadd', function (req, res) {
	/*var title = req.query.title,
		int = req.query.int,
		content = req.query.content,
		leibie = req.query.sel,
		names = req.query.names;*/
	var title = req.body.title,
		int = req.body.int,
		content = req.body.content,
		leibie = req.body.sel,
		names = req.body.names;
	new article({
		title: title,
		int: int,
		content: content,
		leibie: leibie,
		names: names
	}).save().then(function (info) {
		res.send('添加成功');
	});
});
//文章删除
router.get('/article/del',function (req,res) {
	var id=req.query.id
	article.remove({
		_id:id
	}).then(function (info) {
		res.redirect('/admin/article');
	})
});
//文章修改
router.get('/article/xiugai', function (req, res) {
	var id = req.query.id;
	category.find().then(function (info) {
		article.findOne({_id: id}).then(function (info2) {
			res.render('./admin/xiugai.ejs', {data: info, info2: info2})
		})

	})
});
router.post('/article/xiugai', function (req, res) {
	var title = req.body.title,
		int = req.body.int,
		concent = req.body.concent,
		sel = req.body.sel,
		names = req.body.names,
		id = req.body.id
	article.update({_id: id}, {
		title: title,
		int: int,
		content: concent,
		sel: sel,
		names: names
	}).then(function (newinfo) {
		res.redirect('/admin/article');
	})
})
module.exports = router;