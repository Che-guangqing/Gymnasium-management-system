// 模型
const mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    loginName: {
        type: String,
        unique: true //字段是否唯一
    },
    password: {
        type: String,
        select: false, //查询时不要查出密码 否则会在编辑页面再次散列加密
        set(val) {
            // npm i bcrypt 对密码进行加密
            // 通过bcryptjs对密码加密返回值 第一个值返回值， 第二个密码强度
            return require('bcrypt').hashSync(val, 10)
        }
    },
    // name: {
    //     type: String
    // },
    userTel: Number,
    sex: {
        type: Number,
        default: 0
    },
    address: {
        type: String
    },
    // startTime:{type: String,  default:Date.now},
    // endTime:{type: String},
    // cardNum:Array,


    role: [{
        type: String,
    }],
    avatar: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    introduction: {
        type: String,
        default: ""
    },
    myCourse:{
        // 一个学生选择多个课程
        //规定好的mongodb当中的ObjectId字段的数据类型
        type: mongoose.SchemaTypes.ObjectId,
        //关联的属性,在ref里边填写要关联的集合名称
        ref: 'Course',
        // default:null,
    },
    myTeacher: {
        // 一个学生选择多个课程
        //规定好的mongodb当中的ObjectId字段的数据类型
        type: mongoose.SchemaTypes.ObjectId,
        //关联的属性,在ref里边填写要关联的集合名称
        ref: 'Teacher',
        // default:null,
    },
});

var User = mongoose.model('user', UserSchema)

module.exports = User