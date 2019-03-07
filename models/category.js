var mongoose=require('mongoose');

var category=require('../schemas/catergory');

module.exports=mongoose.model('category',category);