var express = require('express');
var router = express.Router();
const Article = require('../db/model/ArticleModel')

/**
 * @api {get} /article/list  文章列表查询
 * @apiName 文章列表查询
 * @apiGroup Article
 * @apiParam {String} title  文章标题
 * @apiParam {Number} author 作者.
 * @apiParam {String} time 发表时间.
 * @apiParam {String} desc 摘要
 * @apiParam {String} content 文章内容
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/list', async (req, res) => {
    const data = await Article.find().sort({
        _id: -1
    })
    res.send(data)
})


/**
 * @api {post} /article/add 文章添加
 * @apiName 文章添加
 * @apiGroup Article
 * @apiParam {String} title  文章标题
 * @apiParam {Number} author 作者.
 * @apiParam {String} time 发表时间.
 * @apiParam {String} desc 摘要
 *  @apiParam {String} content 文章内容
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/add', async (req, res) => {
    // let data = {
    //     title: "蜜桃臀",
    //     author: "cc",
    //     desc:"女生如何练成蜜桃臀",
    //     content:"啦啦啦",
    //     time:"",
    // }
    const data = req.body
    const articles = await Article.create(data)
    res.send(articles);
})


/**
 * @api {post} /article/edit/id  文章修改
 * @apiName 文章修改
 * @apiGroup Articles
 * @apiParam {String} title  文章标题
 * @apiParam {Number} author 作者.
 * @apiParam {String} time 发表时间.
 * @apiParam {String} desc 摘要
 * @apiParam {String} content 文章内容
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.put('/edit/:id', async (req, res) => {
    const articles = await Article.findByIdAndUpdate(req.params.id, req.body);

    res.send(articles)
})


/**
 * @api {post} /article/del/id  文章删除
 * @apiName 文章删除
 * @apiGroup article
 * @apiParam {String} title  文章标题
 * @apiParam {Number} author 作者.
 * @apiParam {String} time 发表时间.
 * @apiParam {String} desc 摘要
 * @apiParam {String} content 文章内容
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.delete('/del/:id', async (req, res) => {
    const articles = await Article.findById(req.params.id);
    await articles.remove()
    res.send({
        err: 0,
        msg: "删除成功"
    })
})

/**
 * @api {post} /article/getPage  分页查询
 * @apiName 分页查询
 * @apiGroup article
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
    Article.find().sort({_id:-1}).then((data => {
        let total = data.length;
        // console.log(total)
        Article.find().sort({_id:-1}).limit(Number(pageSize)).skip(Number((currentPage-1)*pageSize)).then((data => {
            // console.log(data)
            res.send({err:0,mag:'查询成功',total,data})
        }))
    }))
    .catch(() => {
       res.send({err:-1,msg:'查询失败'})
    })
})

// 取最新的10条数据
router.get('/limitTen', async (req, res) => {
    const data = await Article.find().sort({
        _id: -1
    }).limit(10)
    // console.log(data.length)
    res.send(data)
})

// router.post('/getPage',(req,res) => {
//     let pageSize = req.body.pageSize || 4
//     let page = req.body.page || 1
//     article.find().limit(Number(pageSize)).skip(Number((page-1)*pageSize))
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
// }) article
module.exports = router;