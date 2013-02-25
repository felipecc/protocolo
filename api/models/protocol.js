'use strict'

var mongoose = require('mongoose');

var protocolSchema = new mongoose.Schema({
	 local: 	  String
	,description: String
	,dateSend: 	  {type: Date, default: Date.now}
	,dateReceive: Date
	,userSend:    String
	,userReceive: String
	,status: 	  String
 }
 ,{strict: true});


module.exports = {

  Schema: protocolSchema

};