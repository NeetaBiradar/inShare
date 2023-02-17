const File=require('./models/file');
const fs=require('fs');
const connect=require('./config/db');
connect();



async  function  fetchData(){
    const pastDate= new Date(Date.now() - 24 * 60 * 60 * 1000);
    const files= await File.find({createdAt : { $lt: pastDate}});
    if(files.length)
    {
        for (const file of files){
            try{
                fs.unlinkSync(file.path);
                await file.remove();
                console.log(`Successfully deleted file ${file.filename}`);
            }
            catch(err){
                console.log(`error in deleting file ${err}`);
            }


        }

    }    

}

fetchData().then(()=>{
    console.log("Job done");
    process.exit();
})