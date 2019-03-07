/*引入mongoose模块*/
var mongoose=require('mongoose');
/*引入创建的数据库模块*/
var user=require('../schemas/users');
/*导出*//*mongoose.model(第一个参数是数据库的名字可以自定义,创建的数据库的内容)*/
module.exports=mongoose.model('users',user);