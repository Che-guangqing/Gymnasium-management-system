const express = require('express');
const db = require('./db/connect')
const bodyParser = require("body-parser");
const path = require('path')

const app = express();




// 引入各个Router
const userRouter = require("./router/userRouter")
const courseRouter = require("./router/courseRouter")
const qcRouter = require("./router/qcRouter")
const teacherRouter = require("./router/teacherRouter")
const pageRouter = require("./router/pageRouter")
const fileRouter = require("./router/fileRouter")
const articleRouter = require("./router/articleRouter")


//[npm i cors]  引入跨域包 执行cors 
app.use(require('cors')())

// 使用body-parser中间件
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//使用静态文件
app.use('/uploads', express.static(__dirname + './uploads'))


// 图片接口
// npm i multer  处理上传图片
const multer = require('multer')
const upload = multer({
    dest: __dirname + './uploads'
})
app.post('/admin/api/upload', upload.single('file'), (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
})



// 使用Router
// 相当于http://localhost:3000/user/add
app.use("/user", userRouter)
app.use("/course", courseRouter)
app.use("/qc", qcRouter)
app.use("/teacher", teacherRouter)
app.use("/page", pageRouter)
app.use("/file", fileRouter)
app.use("/article", articleRouter)


app.listen(3000, () => {
    console.log(`Server running on port 3000`)
})