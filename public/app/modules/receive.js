// Receive module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Receive = app.module();

  // Default Model.
  Receive.Model = Backbone.Model.extend({
      idAttribute: "_id"
    , url: "/api/protocol"
    , defaults: {
        status: "pending"
      } 
  
  });

  // Default Collection.
  Receive.Collection = Backbone.Collection.extend({
     model: Receive.Model
   , url: "/api/protocol"
  });

  // Default View.
  Receive.Views.Layout = Backbone.Layout.extend({
    template: "receiveEdit"

  });


  Receive.Views.Edit = Backbone.View.extend({

     template: "receiveEdit"

    ,events: {
        "click #save":   "save"
       ,"click #cancel": "cancel"
     }

     ,initialize: function(model){
        (model)? this.model = model : this.model = new Receive.Model(); 
      }

    ,save: function(event){

      var protocol = {
         local: $("#local").val()
        ,description: $("textarea#description").val()
      };

      event.preventDefault();

      this.model.save(protocol,{
        success: function(model, response){
          if(response && response.errors) console.log(response.erros)
          else console.log(response);
        },
        error: function(model, response){
          if(response && response.errors) console.log(response.erros);
        }

      });

    }

    ,cancel: function(event){

       event.preventDefault();

     }

  });

  Receive.Views.ItemList = Backbone.View.extend({
     template: "receiveItem"

    ,tagName: "tr"

    ,data: function(){
       return {
          local: this.model.get("local")
         ,description: this.model.get("description")
         ,status: this.model.get("status")
         ,dateSend: this.model.get("dateSend")
       }

       }
    
  });

  Receive.Views.List = Backbone.View.extend({

     template: "receiveList"
    
    ,tagName: "table"

    ,className: "table table-striped"

    ,initialize: function(){

      this.collection = new Receive.Collection();

      this.collection.on('reset', this.render, this);

      this.collection.fetch();

     }

     ,beforeRender: function(){

        this.$el.children().remove();

        this.collection.each(function(model){
          this.insertView(new Receive.Views.ItemList({model: model}));
        },this);
      }

      ,cleanup: function(){
         this.collection.off(null, null, this);
       }
  });





  // Return the module for AMD compliance.
  return Receive;

});
