/*引入模块*/
var mongoose=require('mongoose');
var schema=mongoose.Schema;
var category=new schema({
	name:String,
});
module.exports=category;/*导出模块*/