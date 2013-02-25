module.exports = {
  init: function(app){
    ['protocolsCtrl'].forEach(function(route){
    	var route = require('./' + route).init(app);
    });
  }

};