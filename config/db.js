require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
function connectDB() {
    // Database connection 🥳
    mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true });
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Database connected 🥳🥳🥳🥳');
    }).on('error', function(err){
        console.log('Connection failed ☹️☹️☹️☹️' +err);
    });
}

// mIAY0a6u1ByJsWWZ

module.exports = connectDB;
