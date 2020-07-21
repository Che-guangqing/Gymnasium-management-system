var express = require('express');
var router = express.Router();
const Teacher = require("../db/model/TeacherModel")


// 查询
router.get('/list',async (req,res) => {
    const teachers = await Teacher.find()
    .populate('courses')
    .sort({
        _id:-1
    })
    res.send(teachers)
})

// 添加
router.post('/add',async (req, res) => {
    // let data = {
    //     teacherName: '啦啦啦',
    //     teacherTel: 34567,
    //     sex: 1,
    //     address: '西安-灞桥区',
    //     teacherDes:'三级营养师',
    //     times:[{
    //         startTime:"10:00",
    //         endTime:"11:00",
    //     }],
    // }
 
    const data = req.body
    // req.body客户端用post提交过来的数据
    const teachers = await Teacher.create(data)
    //把数据添加到数据库
    res.send(teachers)
    //返回到客户端
})

// 修改
router.put('/edit/:id',async (req,res) => {
    const teachers = await Teacher.findByIdAndUpdate(req.params.id,req.body);
    res.send(teachers)
})

// 删除
router.delete('/del/:id',async (req,res) => {
    const teachers = await Teacher.findById(req.params.id);
    await teachers.remove()
    res.send({err:0,msg:"删除成功"})
})

// 分配课程
router.put('/chooseCourse/:id',async (req,res) => {
    // console.log(req.params.id,req.body)
    const teachers = await Teacher.findByIdAndUpdate(req.params.id,req.body);
    res.send(teachers)
})


/**
 * @api {post} /user/getInfoByteacherName  根据教练姓名查询
 * @apiName getInfoByteacherName
 * @apiGroup Teacher
 *
 * @apiParam {Number} typeId  课程名称
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getInfoByteacherName',(req,res) => {
    let {teacherName} = req.body
    Teacher.findOne({teacherName:teacherName})
    .then((data) => {res.send(data)})
    .catch((data) => {res.send({err:-1,msg:'查询失败'})})
})

// 根据时间
router.post('/getInfoByteacherTime',(req,res) => {
    let {workTime} = req.body
    Teacher.findOne({workTime:workTime})
    .then((data) => {res.send(data)})
    .catch((data) => {res.send({err:-1,msg:'查询失败'})})
})



// 查询所有私教
router.get('/getInfoByteacherKinds',async (req,res) => {
    const teachers = await Teacher.find({kinds : 1})
    .sort({
        _id:-1
    })
    res.send(teachers)
})

/**
 * @api {post} /teacher/getPage  分页查询
 * @apiName 分页查询
 * @apiGroup teacher
 *
 * @apiParam {Number} pageSize  每页数据条数
 * @apiParam {Number} currentPage 当前页
 * @apiParam {Number} total 总页数
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/getPage', (req, res) => {
    // 接收前端参数
    let {pageSize,currentPage} = req.query;
    // 默认值
    pageSize = pageSize ? pageSize:2;
    currentPage = currentPage ? currentPage:1;
    // 查询所有数据
    Teacher.find().populate('courses').sort({_id:-1}).then((data => {
        let total = data.length;
        // console.log(total)
        Teacher.find().populate('courses').sort({_id:-1}).limit(Number(pageSize)).skip(Number((currentPage-1)*pageSize)).then((data => {
            // console.log(data)
            res.send({err:0,mag:'查询成功',total,data})
        }))
    }))
    .catch(() => {
       res.send({err:-1,msg:'查询失败'})
    })
})

module.exports = router
