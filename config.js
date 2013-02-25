var Config = {};

//Set current enviroment
var env = process.env["NODE_ENV"] || "development";


//Development enviroment
Config.development = {
    serverPort: 1234
  , mongo :{ url: 'localhost:27017/protocol_development?auto_reconnect=true&poolSize=5' }
  , mongoose :{ url: 'mongodb://localhost:27017/protocol_development?auto_reconnect=true&poolSize=5' }

};


// Test enviroment
Config.test = {
    serverPort: 4001
  , mongo : { url: "localhost:27017/protocol_development?auto_reconnect=true&poolSize=5"}
  , mongoose :{ url: 'mongodb://localhost:27017/protocol_testt?auto_reconnect=true&poolSize=5' }
};


																			 
var config = Config[env];

config.env = env;


module.exports = config;