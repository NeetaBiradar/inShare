const nodemailer=require('nodemailer');

 async function sendEmail({from,to,subject,text,html}){
    let transpoter= nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        },
    });

    let info= await transpoter.sendMail({
        from: `inShare <${from}>`,
        to,
        subject,
        text,
        html
    })

    console.log(info);



}

module.exports=sendEmail;