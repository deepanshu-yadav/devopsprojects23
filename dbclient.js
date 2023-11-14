
const mongoose = require('mongoose')

var config = require('./configure');
conn_string = config.mongo_db.connection_string
console.log("Connecting to %s", conn_string)
mongoose.set("strictQuery", false)

var connect_mongo = async function(){
    try{
        return await mongoose.connect(conn_string);
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
module.exports = connect_mongo;
