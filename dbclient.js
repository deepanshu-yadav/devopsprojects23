
const mongoose = require('mongoose')

var config = require('./configure');
conn_string = config.mongo_db.connection_string
console.log("Connecting to %s", conn_string)
mongoose.set("strictQuery", false)

var connect_mongo = async function(){
    await mongoose.connect(conn_string);
    console.log("MongoDB Connected...");
    //mongoose.connect(conn_string).then(() => console.log("MongoDB Connected..."))
    //.catch((err) => console.log(err));
}

module.exports = connect_mongo;


