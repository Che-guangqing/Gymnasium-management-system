// 模型
const mongoose = require('mongoose');
var  QcSchema = new mongoose.Schema({
    qcName:{type:String},
    qcNum:{type:Number},
    getTime:{type: String},
});

var Qc = mongoose.model('Qc',QcSchema)
module.exports = Qc