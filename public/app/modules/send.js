// Send module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Send = app.module();

  // Default Model.
  Send.Model = Backbone.Model.extend({
  
  });

  // Default Collection.
  Send.Collection = Backbone.Collection.extend({
    model: Send.Model
  });

  // Default View.
  Send.Views.Layout = Backbone.Layout.extend({
    template: "send"
  });

  // Return the module for AMD compliance.
  return Send;

});
