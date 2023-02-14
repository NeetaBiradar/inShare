const mangoose=require('mongoose');
const schema=mangoose.Schema;


const fileSchema=new schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    uuid: { type: String, required: true },
    sender: { type: String, required: false },
    reciver: { type: String, required: false },
},{ timestamps: true });

module.exports= mangoose.model('File', fileSchema);