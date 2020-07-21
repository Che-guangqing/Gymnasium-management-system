// 模型
const mongoose = require('mongoose');
var  CourseSchema = new mongoose.Schema({
    courseName:{type:String},
    courseAddress:{type:String},
    courseTime: {type:String}, 
    startTime: {type:String},          
    endTime:{type:String}, 
    userNum:{type:Number},
    courseDes:{type:String},
    courseImg:{type:String},
    // couseType:{type:String},
    typeId:{type:Number},
},{toJSON:{virtuals:true}});

//通过课程查询老师 在分类中设置虚拟字段
CourseSchema.virtual('teachers',{
    localField: '_id', //本地键    
    ref: 'Teacher',    //参考模型
    foreignField: 'courses', //外键
    // justOne: false, //不是一个
})
var Course = mongoose.model('Course',CourseSchema)

module.exports = Course
