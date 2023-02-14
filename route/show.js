const router=require('express').Router();
const File=require('../models/file');


router.get('/:uuid', async (req, res)=>{

    try{
    const file= await File.findOne({ uuid: req.params.uuid});
    console.log(file);

    if(!file)
    {
        return res.render('download', {error : 'Link has expired'});
    }

    return res.render('download', {
        uuid: file.uuid,
        fileName: file.filename,
        size: file.size,
        downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
    })

    }catch(err){

        return res.render('download', {error: 'Something Went Wrong'});
    }

})


module.exports=router;







