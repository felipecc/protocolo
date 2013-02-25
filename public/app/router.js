define([
  // Application.
  "app",

  //Modules
  "modules/protocol",

],

function(app, Protocol) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      ""         : "index",
      "new"      : "new",
      "edit/:id" : "edit",
      "del/:id"  : "del"
    },


    initialize: function(){
      this.mainView = app.useLayout("main");
      this.mainView.render();
    },

    index: function() {
      this.setView("#content",Protocol,"Layout");
    },


    new: function(){

        var protocol = new Protocol.Model();

       this.mainView.setView("#content",new Protocol.Views.Edit({model: protocol})).render();
    },

    edit: function(id){

        var self = this 
          , protocol = new Protocol.Model({_id: id});

        protocol.fetch({
          success: function(model){
            self.mainView.setView("#content",new Protocol.Views.Edit({model: model})).render();
          }
        });
    },

    del: function(id){
        var  self = this
           , protocol = new Protocol.Model({_id: id});

        protocol.fetch();

        protocol.destroy();

        app.router.navigate('/',{trigger: true});
    },

    setView: function(selector,View,type,props){
      this.mainView.getViews(function(view){
        view.remove();
      });

      this.mainView.setView(selector,new View.Views[type](props)).render();
   }

  });

  return Router;

});
