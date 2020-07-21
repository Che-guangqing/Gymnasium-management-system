var express = require('express');
var router =express.Router();
const Course = require('../db/model/CourseModel')

// 课程列表
router.get('/list', async (req, res) => {
    const data = await Course.find()
    .populate('teachers').lean()
    // 查询这个课程是哪些老师上的
    .sort({
        _id: -1
    })
    // console.log(data[0].teachers, data[1].teachers)
    // console.log(JSON.stringify(data))
    res.send(data)
})


/**
 * @api {post} /course/add  课程添加
 * @apiName 课程添加
 * @apiGroup Course
 *
 * @apiParam {String} courseName  课程名称
 * @apiParam {String} courseAddress 上课地址.
 * @apiParam {String} courseDes 课程描述.
 * @apiParam {String} courseImg 课程照片.
 * @apiParam {String} couseType 课程类型
 * @apiParam {Number} typeId    课程类型id
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/add',async (req, res) => {
    //  let data = {
    //     courseName:"增肌课1",
    //     courseAddress:"202",
    //     // courseTeacher:{type:String},
    //     courseDes:"体重减轻",
    //     // courseImg:{type:String},
    //     couseType:"私教课",
    //     typeId:2
    //  }
    // let data = req.body
    // User.insertMany(data)
    //     .then((data) => {
    //         res.send({
    //             err: 0,
    //             msg: "添加成功"
    //         })
    //     })
    //     .catch(() => {
    //         res.send({
    //             err: -1,
    //             msg: "添加失败"
    //         })
    //     })

    const data = req.body
    //req.body客户端用post提交过来的数据
    const courses = await Course.create(data)
    //把数据添加到数据库
    res.send(courses)
    //返回到客户端
})





/**
 * @api {post} /course/del  课程删除
 * @apiName 课程删除
 * @apiGroup Course
 *
 * @apiParam {String} courseName  课程名称
 * @apiParam {String} courseAddress 上课地址.
 * @apiParam {String} courseDes 课程描述.
 * @apiParam {String} courseImg 课程照片.
 * @apiParam {String} couseType 课程类型
 * @apiParam {Number} typeId    课程类型id
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
// 删除
router.delete('/del/:id',async (req,res) => {
    const courses = await Course.findById(req.params.id);
    await courses.remove()
    res.send({err:0,msg:"删除成功"})
})
// router.post('/del', (req, res) => {
//     let {_id} = req.body
//     Course.remove({_id})
//         .then((data) => {
//             res.send({
//                 err: 0,
//                 msg: "删除成功"
//             })
//         })
//         .catch(() => {
//             res.send({
//                 err: -1,
//                 msg: "删除失败"
//             })
//         })
// })


/**
 * @api {post} /course/edit  课程修改
 * @apiName 课程修改
 * @apiGroup Course
 *
 * @apiParam {String} courseName  课程名称
 * @apiParam {String} courseAddress 上课地址.
 * @apiParam {String} courseDes 课程描述.
 * @apiParam {String} courseImg 课程照片.
 * @apiParam {String} couseType 课程类型
 * @apiParam {Number} typeId    课程类型id
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.put('/edit/:id',async (req, res) => {
    const courses = await Course.findByIdAndUpdate(req.params.id,req.body)
    res.send(courses)
})


// 根据时间查询
router.post('/getInfoByCourseTime',(req,res) => {
    let {courseTime} = req.body
    Course.findOne({courseTime:courseTime})
    .then((data) => {res.send(data)})
    .catch((data) => {res.send({err:-1,msg:'查询失败'})})
})

/**
 * @api {post} /course/getInfoByType  根据课程分类查询
 * @apiName getInfoByType
 * @apiGroup Course
 *
 * @apiParam {Number} typeId  课程名称
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getInfoByType',(req,res) => {
    let {typeId} = req.body
    Course.find({typeId:typeId})
    .then((data) => {res.send({err:0,msg:'查询成功',list:data})})
    .catch((data) => {res.send({err:-1,msg:'查询失败'})})
})

/**
 * @api {post} /course/getPage  分页查询
 * @apiName 分页查询
 * @apiGroup course
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
    Course.find().populate('teachers').lean().sort({_id:-1}).then((data => {
        let total = data.length;
        // console.log(total)
        Course.find().populate('teachers').lean().sort({_id:-1}).limit(Number(pageSize)).skip(Number((currentPage-1)*pageSize)).then((data => {
            // console.log(data)
            res.send({err:0,mag:'查询成功',total,data})
        }))
    }))
    .catch(() => {
       res.send({err:-1,msg:'查询失败'})
    })
})




module.exports = router;