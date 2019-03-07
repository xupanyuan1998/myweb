var mongoose=require('mongoose');

var article=require('../schemas/article');

module.exports=mongoose.model('article',article);