// 模型
const mongoose = require('mongoose');

// var Schema = mongoose.Schema;

var TeacherSchema = new mongoose.Schema({
    // loginName:{type:String},
    // loginPassword:{type:String},
    teacherName:{type:String},
    teacherTel:Number,
    sex:{type:Number,default:1},
    address:{type:String},
    teacherImg:{type:String},
    teacherDes:String,
    startTime:{type:String},
    kinds:{type:Number,default:1},
    courses:{
        // 一个老师设置多个课程
        //规定好的mongodb当中的ObjectId字段的数据类型
        type: mongoose.SchemaTypes.ObjectId,
        //关联的属性,在ref里边填写要关联的集合名称
        ref: 'Course'
    },
    workTime:{type:String},
    // 0 : 未被预约  1：已被预约
    one:{type:Boolean,default:false},   // 9 - 1false
    two:{type:Boolean,default:false},   // 11 - 12
    three:{type:Boolean,default:false},   // 2 - 3
    fore:{type:Boolean,default:false},   // 4 - 5
    five:{type:Boolean,default:false},   // 6 - 7
});

var Teacher = mongoose.model('Teacher',TeacherSchema)

module.exports = Teacher