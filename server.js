const express=require('express');
const app=express();
const path=require('path');


const PORT=process.env.PORT || 3000;
//Middlewears
app.use(express.static("public"));
app.use(express.json());


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