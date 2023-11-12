
const mongoose = require('mongoose')

var config = require('./configure');
conn_string = config.mongo_db.connection_string
console.log("Connecting to %s", conn_string)
mongoose.set("strictQuery", false)

module.exports = function (connect_mongo) {
mongoose.connect(conn_string).then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
};


