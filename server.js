'use strict'

var express = require('express')
	, path = require('path')
	, mongoose = require('mongoose')
	, http = require('http')
	, config = require('./config')
	, clc = require('cli-color')
	, colorize = require('colorize')
	, application_root = __dirname
;


global.load = function(requirePath){
	return require(path.join(__dirname, requirePath));
};

var app = module.exports = express()
	, server = http.createServer(app)
;


//Configuration
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(application_root, "public")));
app.use(express.logger());


//Controllers for bootstrap
require('./api/controllers/boot').init(app);


app.listen(config.serverPort);

var cconsole = colorize.console;

cconsole.log(" => Application starting in #magenta[%s] on #magenta[http://0.0.0.0:%d]" ,config.env, config.serverPort);



// is necessary start mongod whith command: mongod --dbpath=db_tmp


