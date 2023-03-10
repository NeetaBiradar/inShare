const router=require('express').Router();
const multer=require('multer');
const path=require('path');
const File=require('../models/file');
const {v4:uuidv4}=require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'upload/') ,
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
              cb(null, uniqueName)
    } ,
});

let upload=multer({
    storage,
    limits: { fileSize: 100000*100 },
}).single('myFile');

router.post('/', (req,res)=>{
  
    //store file
    upload(req, res, async (err)=>{
         //Validate request
        if(!req.file){
            return res.json({ error: "all fields required" });
        }

        if(err)
        {
            return res.status(500).send({ error: err.message });
        }

        //upload file to database
        const file=new File({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
            
        });

        const response= await file.save();
        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });



    });
  
});

router.post('/send', async(req,res)=>{
     const{uuid, emailTo, emailFrom} =req.body;
     console.log(req.body);
     if(!uuid || !emailTo || !emailFrom ){
        return res.status(442).send({error: 'All fields are required.'});
     }

     const file= await File.findOne({ uuid: uuid});
     
    
     if(file.sender){
        return res.status(442).send({error: 'Email already sent'});
     }

     file.sender=emailFrom;
     file.reciver=emailTo;

     console.log(file)

     const response= await file.save();

     //send email
     const sendMail=require('../services/emailService');
     sendMail({
        from: emailFrom,
        to: emailTo,
        subject:'innshare file sharing',
        text: `${emailFrom} sent a file to you`,
        html: require('../services/emailTemplate')({
            emailFrom: emailFrom,
            downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size: parseInt(file.size/1000) + 'KB',
            expires: ' 24 hours '
        })
     });

     return res.send({succes: true});
});


module.exports=router;