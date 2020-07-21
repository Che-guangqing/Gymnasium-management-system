const express = require('express')
const router = express.Router()
const multer = require('multer')

var storage = multer.diskStorage({
    destination:function(req,file,cb) {
        // 指定文件路径
        cb(null,'./uploads/img')
    },
    filename:function(req,file,cb) {
        // 指定文件名
        // console.log(file)
        let exts = file.originalname.split('.')
        let ext = exts[exts.length-1] //后缀名
        let tempname = new Date().getTime()+parseInt(Math.random()*9999)
        cb(null,`${tempname}.${ext}`);
    }
});
var upload = multer({
    storage:storage
})
router.post('/upload',upload.single('file'),(req,res)=>　{
    // 'hh' 要上传图片数据的key     必须和前端统一
    // {'hh':图片数据}
    // console.log(req.file)

    let {size,mimetype,path} = req.file
    let types = ['jpg','jpeg','png','gif'] //允许上传的数据类型
    let temType = mimetype.split('/')[1]
    if(size>=500000){ 
        return res.send({err:-1,msg:'尺寸过大'})
    }else if(types.indexOf(temType)==-1){
        return res.send({err:-2,msg:'媒体类型错误'})
    }else{
        // 需要把上传的图片地址放到静态目录中传给前端地址，让前端展示
        // http://localhost:3000/public/img/1586759936224.jpg
        let url = `/public/img/${req.file.filename}`
        res.send({err:0,msg:"上传成功",img:url})
    }
})



module.exports = router