// Protocol module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Protocol = app.module();

  // Default Model.
  Protocol.Model = Backbone.Model.extend({
      idAttribute: "_id"
    , urlRoot: "/api/protocol"
    , defaults: {
        status: "pending"
      } 
  
  });

  // Default Collection.
  Protocol.Collection = Backbone.Collection.extend({
     model: Protocol.Model
   , url: "/api/protocol"
  });

  // Default View.
  Protocol.Views.Layout = Backbone.Layout.extend({
     template: "sub"

    , beforeRender: function(){
        this.setView("#list", new Protocol.Views.List()).render();
      }

  });


  Protocol.Views.Edit = Backbone.View.extend({

     template: "ProtocolEdit"

    ,events: {
        "click #save":   "save"
       ,"click #cancel": "cancel"
     }
    ,data: function(){
       return {
          local: this.model.get("local")
         ,description: this.model.get("description")
       }

     }

    ,save: function(event){


      var self = this;


      var protocol = {
           local: $("#local").val()
           ,description: $("textarea#description").val()
          }
      ;

      event.preventDefault();


      this.model.save(protocol,{
        success: function(model, response){
          if(response && response.errors) console.log(response.erros)
          else console.log(response);

          console.log(app);

        },
        error: function(model, response){
          if(response && response.errors) console.log(response.erros);
        }

      });

      app.router.navigate('/',{trigger: true});

    }

    ,cancel: function(event){

       event.preventDefault();

     }

  });


  Protocol.Views.ItemList = Backbone.View.extend({
     template: "protocolItem"

    ,tagName: "tr"

    ,data: function(){
       return {
          local: this.model.get("local")
         ,_id: this.model.get("_id")
         ,description: this.model.get("description")
         ,status: this.model.get("status")
         ,dateSend: this.model.get("dateSend")
       }

       }
    
  });

  Protocol.Views.List = Backbone.View.extend({

     template: "protocolList"
    
    ,tagName: "table"

    ,className: "table table-hover"

    ,initialize: function(){

      this.collection = new Protocol.Collection();

      this.collection.on('reset', this.render, this);

      this.collection.fetch();

     }

     ,beforeRender: function(){

        this.$el.children().remove();

        this.collection.each(function(model){
          this.insertView(new Protocol.Views.ItemList({model: model}));
        },this);
      }

      ,cleanup: function(){
         this.collection.off(null, null, this);
       }
  });


  // Return the module for AMD compliance.
  return Protocol;

});
