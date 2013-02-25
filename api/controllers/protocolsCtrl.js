'use strict'

var ProtocolsCtrl = {}
  , ProtocolSchema = load('api/models/protocol').Schema
  , Db = load('api/db/db').getConnection()
  , Protocol = Db.model('protocols',ProtocolSchema)
;


ProtocolsCtrl.get = function get(req, res, next){

  Protocol.find(function(err, protocols){
  	res.json(200, protocols)
  });
};

ProtocolsCtrl.one = function get(req, res, next){

  console.log(req.params.id);

  Protocol.findById(req.params.id,function(err, protocol){
    res.json(200,protocol);
  });
};



ProtocolsCtrl.post = function post(req, res, next){
  var protocol
  	, body = {
  	     userSend: 'Batman'
//  	    ,dateSend: req.body.
//  	    ,userReceive:
//  	    ,dateReceive:
  	    ,description: req.body.description
  	    ,local: req.body.local
  	    ,status: req.body.status
  	  }
  ;

  console.log(body);

  protocol = new Protocol(body);

  protocol.save(function(err){
  	if(err) return handleError(err);
  	res.send(protocol);
  });

};


ProtocolsCtrl.put = function put(req, res, next){

  var  body = {
         description: req.body.description
        ,local: req.body.local
      }
  ;


  Protocol.update({_id: req.params.id},body,function(err, affected){
    console.log(affected);
  });

};

ProtocolsCtrl.del = function del(req, res, next){
    Protocol.remove({_id: req.params.id}, function(err){
                      if(!err) res.json(200,'Removed');
                    }
  );  

};


module.exports = {
  init: function(app){
    app.get('/api/protocol',      ProtocolsCtrl.get);
    app.get('/api/protocol/:id',  ProtocolsCtrl.one);    
    app.post('/api/protocol', 	ProtocolsCtrl.post);
    app.put('/api/protocol/:id',	ProtocolsCtrl.put);
    app.del('/api/protocol/:id',  ProtocolsCtrl.del);	
  }

};

//curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"description":"You are", "local":"fake","status":"pending"}' http://localhost:1234/api/protocol



