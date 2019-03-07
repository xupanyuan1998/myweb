/*引入mongoose模块*/
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
/*创建一个新的数据库*/
var user = new Schema({

	username: String,/*设置数据库的字段*/

	password: String,

	isAdmin:{
		default:false,
		type:Boolean
	}

});

module.exports = user;/*导出模块*/