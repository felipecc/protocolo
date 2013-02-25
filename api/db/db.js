'use strict'


var mongoose = require('mongoose')
  ,	config = load('config')
  , db
;

function Connection(){

  var conn = mongoose.createConnection(config.mongoose.url);

  conn.on('error', console.error.bind(console, 'connection error :-('));

  this.getConnection = function(){
  	return conn;
  };
};


//Singleton pattern
function Db(){

  this._instance = null;

};

Db.prototype.getInstance = function(){

  if(!this._instance) this._instance = new Connection();

  return this._instance;

};

db = new Db();

module.exports = db.getInstance();