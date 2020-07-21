var express = require('express');
var router = express.Router();

/**
 * @api {post} /course/getInfoByPage  分页查询
 * @apiName 分页查询
 * @apiGroup Course
 *
 * @apiParam {Number} pageSize  每页数据条数
 * @apiParam {Number} page 那一页.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getInfoByPage',(req,res) => {
    let pageSize = req.body.pageSize || 10
    let page = req.body.page || 1
    Course.find().limit(Number(pageSize)).skip(Number((page-1)*pageSize))
    .then((data) => {
        res.send({
            err: 0,
            msg: "查询成功",
            list:data,
        })
    })
    .catch(() => {
        res.send({
            err: -1,
            msg: "查询失败"
        })
    })
})

module.exports = router