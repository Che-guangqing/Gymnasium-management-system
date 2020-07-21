// 封装邮箱验证码

"use strict"
const nodemailer = require("nodemailer");

// 创建发送邮件对象
let transporter = nodemailer.createTransport({
    host:"smtp.qq.com",
    port:456,
    secure:true,
    auth:{
        user:'352186537@qq.com',
        pass:'kxlfqavqcooabgfd'
    }
});



function send(mail,code){
    let mailObj = {
        form:'"啦啦啦啦"<2307713472@qq.com>',
        mto:mail,
        subject:"1902",
        text:`您的验证码是:${code},有效期五分钟`
    }
    transporter.sendMail(mailObj),(err,data) => {
        console.log(err)
        console.log(data)
    }

}
module.exports = {send}