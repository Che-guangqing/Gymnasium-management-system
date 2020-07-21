var express = require('express');
var router = express.Router();
const Qc = require('../db/model/QcModel')

/**
 * @api {get} /qc/list  健身器材列表查询
 * @apiName 健身器材列表查询
 * @apiGroup Qc
 * @apiParam {String} qcName 器材名称.
 * @apiParam {Number} qcNum 器材数量.
 * @apiParam {String} getTime 购入时间.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/list', async (req, res) => {
    const data = await Qc.find().sort({
        _id: -1
    })
    res.send(data)
})


/**
 * @api {post} /qc/add  健身器材添加
 * @apiName 健身器材添加
 * @apiGroup Qc
 * @apiParam {String} qcName 器材名称.
 * @apiParam {Number} qcNum 器材数量.
 * @apiParam {String} getTime 购入时间.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/add', async (req, res) => {
    // let data = {
    //     qcName:"杠铃 ",
    //     qcNum:20,
    //     // getTime:,
    // }
    const data = req.body
    const qcs = await Qc.create(data)
    res.send(qcs);
})


/**
 * @api {post} /qc/edit/id  健身器材修改
 * @apiName 健身器材修改
 * @apiGroup Qc
 * @apiParam {String} qcName 器材名称.
 * @apiParam {Number} qcNum 器材数量.
 * @apiParam {String} getTime 购入时间.
 * @apiParam {String} id 器材id.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.put('/edit/:id', async (req, res) => {
    const qcs = await Qc.findByIdAndUpdate(req.params.id, req.body);

    res.send(qcs)
})


/**
 * @api {post} /qc/edit/id  健身器材删除
 * @apiName 健身器材删除
 * @apiGroup Qc
 * @apiParam {String} qcName 器材名称.
 * @apiParam {Number} qcNum 器材数量.
 * @apiParam {String} getTime 购入时间.
 * @apiParam {String} id 器材id.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.delete('/del/:id', async (req, res) => {
    const qcs = await Qc.findById(req.params.id);
    await qcs.remove()
    res.send({
        err: 0,
        msg: "删除成功"
    })
})

/**
 * @api {post} /qc/getPage  分页查询
 * @apiName 分页查询
 * @apiGroup qc
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
    Qc.find().sort({_id:-1}).then((data => {
        let total = data.length;
        // console.log(total)
        Qc.find().sort({_id:-1}).limit(Number(pageSize)).skip(Number((currentPage-1)*pageSize)).then((data => {
            // console.log(data)
            res.send({err:0,mag:'查询成功',total,data})
        }))
    }))
    .catch(() => {
       res.send({err:-1,msg:'查询失败'})
    })
})

// router.post('/getPage',(req,res) => {
//     let pageSize = req.body.pageSize || 4
//     let page = req.body.page || 1
//     Qc.find().limit(Number(pageSize)).skip(Number((page-1)*pageSize))
//     .then((data) => {
//         console.log(data)
//         res.send({
//             err: 0,
//             msg: "查询成功",
//             list:data,
//         })
//     })
//     .catch(() => {
//         res.send({
//             err: -1,
//             msg: "查询失败"
//         })
//     })
// })
module.exports = router;