var config = {};

config.mongo_db = {};

if(process.env.MONGO_HOST) { 
    config.mongo_db.connection_string = "mongodb://" + process.env.MONGO_HOST +":" + process.env.MONGO_PORT;
}
else { 
    config.mongo_db.connection_string = "mongodb://127.0.0.1:27017";
}
console.log("The string is \n");
console.log(config.mongo_db.connection_string);

module.exports = config;
