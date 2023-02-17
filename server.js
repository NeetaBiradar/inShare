const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors');
require('dotenv').config();


const PORT=process.env.PORT || 3000;
const corsOption={
    origin: process.env.ALLOWED_CLIENTS.split(',')
}
//Middlewears
app.use(express.static("public"));
app.use(express.json());
app.use(cors(corsOption));


const connectDB=require("./config/db");
connectDB();
 
//template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


//routes

app.use('/api/files', require('./route/file'));
app.use('/files', require('./route/show'));
app.use('/files/download' , require('./route/download'));


app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
})