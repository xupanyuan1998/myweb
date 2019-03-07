var mongoose=require('mongoose');
var schema=mongoose.Schema;
var article=new schema({
	//标题
	title:{
		type:String,
		default:''
	},
	//时间
	data:{
		type:Date,
		default: new Date()
	},
	//评论
	comments:{
		type: Array,
		default:[]
	},
	//阅读
	read:{
		type:Number,
		default:0
	},
	//简介
	int:{
		type:String,
		default:''
	},
	//内容
	content :{
		type:String,
		default:''
	},
	//类别
	leibie:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'catergory'
	},
	//类别名称
	names:{
		type:String,
		default:''
	}
});
module.exports=article;