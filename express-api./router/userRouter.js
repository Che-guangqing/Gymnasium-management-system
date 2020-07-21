var express = require('express');
var router = express.Router();
const User = require("../db/model/UserModel")
const jwt = require('jsonwebtoken')
// const assert = require('http-assert')


const SECRET = "sjdnvfinv"


/**
 * @api {post} /user/reg  用户注册
 * @apiName 用户注册
 * @apiGroup User
 *
 * @apiParam {String} us 用户名.
 * @apiParam {String} password 用户密码.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.post('/reg', async (req, res) => {
    const user = await User.create({
        loginName: req.body.loginName,
        password: req.body.password
    })
    // 返回出去
    res.send({
        msg: "注册成功",
        data: user,
    })
})




// 登陆
router.post('/login', async (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    const {
        loginName,
        password,
    } = data
    // console.log(`前端请求登陆的账户：${req.body}`)
    console.log(JSON.parse(JSON.stringify(req.body)))

    // 1.根据用户名找用户   
    const user = await User.findOne({
        loginName: loginName
    }).select('+password')
    if (!user) {
        return res.send({
            status:422,
            message: '用户不存在'
        })
    }
    // // 用http-assert包
    // assert(user, '422', '用户不存在')
    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
        return res.send({
            status:422,
            message: '密码错误'
        })
    }
    // assert(isValid, '422', '密码错误')
    // 3.返回token
    // npm i jsonwebtoken
    const token = jwt.sign({
        id: user._id
    }, SECRET)
    res.send({
        // SECRET,
        token,
        user
    })

})




/**
 * @api {get} /user/list  用户列表查询
 * @apiName 用户列表查询
 * @apiGroup User
 * @apiParam {String} us 用户名.
 * @apiParam {String} password 用户密码.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/list', async (req, res) => {
    const data = await User.find()
    .populate('myTeacher').lean()
    .populate('myCourse').lean()
    .sort({
        _id: -1
    })
    res.send(data)

})

// router.put('/findById/:id', async (req, res) => {
//     let {
//         _id
//     } = req.params._id
//     const users = await User.findById({_id:_id});
//     res.send(users)
// })

router.post('/findById', (req, res) => {
    let {
        _id
    } = req.body
    // console.log(req.body)
    User.findOne({
            _id: _id
        })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send({
                err: -1,
                msg: '查询失败'
            })
        })
})


/**
 * @api {post} /user/add  用户添加
 * @apiName 用户添加
 * @apiGroup User
 *
 * @apiParam {String} us 用户名.
 * @apiParam {String} password 用户密码.
 * @apiParam {Number} u_id 用户名.
 * @apiParam {String} password 用户密码.
 * @apiParam {String} us 用户名.
 * @apiParam {String} name 户密码.
 * @apiParam {String} us 用户名.
 * @apiParam {String} password 用户密码.
 * @apiParam {String} us 用户名.
 * @apiParam {String} password 用户密码.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/add', async (req, res) => {
    // let data = {
    //     loginName: '我是用户',
    //     password: '123',
    //     name: 'hh',
    //     sex: 2,
    //     userTel: 123456,
    //     address: '西安',
    //     // startTime: '',
    //     // cardNum: 3234,
    //     // endTime: '2020/4/5',
    //     avatar: '/public/img/1.jpg',
    //     role:["user"]
    // }
    const data = req.body
    const users = await User.create(data)
    res.send(users)
})


//用戶修改接口(put:完全覆盖，patch:部分修改)
router.put('/edit/:id', async (req, res) => {
    const users = await User.findByIdAndUpdate(req.params.id, req.body);
    // 根据客户端传递的id 找到具体修改的用戶
    // users.title = req.body.title;
    // 提取用戶对象中的title属性赋值给数据库中的title
    // await users.save();
    // 保存到数据库
    res.send(users)
})

//删除用戶接口
router.delete('/del/:id', async (req, res) => {
    const users = await User.findById(req.params.id);
    //通过请求中的id找出具体要删除的用戶
    await users.remove()
    // 删除用戶
    res.send({
        err: 0,
        msg: '刪除成功'
    })
})


// const authMiddleware = require('../middleware/auth')

/**
 * @api {post} /user/getInfoByloginName  根据用户姓名查询
 * @apiName getInfoByloginName
 * @apiGroup User
 *
 * @apiParam {Number} typeId  课程名称
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getInfoByName', (req, res) => {
    let {
        name
    } = req.body
    console.log(req.body)
    User.findOne({
            name: name
        })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send({
                err: -1,
                msg: '查询失败'
            })
        })
})




// // 登陆校验中间件
// const auth =  async (req, res, next) => {
//     // 中间件 限制用户只能在登陆之后访问这个路由
//     // 获取前端传的请求头authorization中的token
//     const token = String(req.headers.authorization || '').split(' ').pop()
//     // console.log(token)
//     if(!token) {
//         return res.status(401).send({
//             message:'请提供jwt token'
//         })
//     }

//     // verify方法 解密token 得到token中存储的用户信息的id
//     const {id} = jwt.verify(token, SECRET)
//     // console.log(tokenData)
//     if(!id) {
//         return res.status(401).send({
//             message:'无效的jwt token'
//         })
//     }

//     // 通过id找用户信息 挂在到req中让后续使用
//     req.user = await User.findById(id)
//     console.log(req.user)
//     // //确保用户信息验证正确
//     if(!req.user) {
//         return res.status(401).send({
//             message:'请先登陆'
//         })
//     }
//     await next()
// }




/**
 * @api {post} /user/getPage  分页查询
 * @apiName 分页查询
 * @apiGroup user
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
    let {
        pageSize,
        currentPage
    } = req.query;
    // 默认值
    pageSize = pageSize ? pageSize : 2;
    currentPage = currentPage ? currentPage : 1;
    // 查询所有数据
    User.find().populate('myCourse').populate('myTeacher').sort({
            _id: -1
        }).then((data => {
            let total = data.length;
            // console.log(total)
            User.find().sort({
                _id: -1
            }).limit(Number(pageSize)).skip(Number((currentPage - 1) * pageSize)).then((data => {
                // console.log(data)
                res.send({
                    err: 0,
                    mag: '查询成功',
                    total,
                    data
                })
            }))
        }))
        .catch(() => {
            res.send({
                err: -1,
                msg: '查询失败'
            })
        })
})

// // npm i http-assert
// // assert(满足条件,'状态码','消息提示')
// // 错误处理函数
// router.use(async (err, req, res, next) => {
//     res.status(err.statusCode || 500).send({
//         message: err.message
//     })
// })


router.get('/getUserByToken', (req, res) => {
    let {
        token
    } = req.params
    User.findOne({
            token
        })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            console.log(err)
            res.send({
                err: -1,
                msg: '查询失败'
            })
        })
})


module.exports = router