
// 模型
const mongoose = require('mongoose');
var  ArticleSchema = new mongoose.Schema({
    title: {type:String},
    author: {type:String},
    desc: {type:String},
    content:{type:String},
    time:{type: String},
});

var Article = mongoose.model('Article',ArticleSchema)
module.exports = Article
