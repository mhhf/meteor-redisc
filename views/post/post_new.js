/*****************************************************************************/
/* PostNew: Event Handlers and Helpers */
/*****************************************************************************/
Template.PostNew.events({
  'click button[type=submit]': function(e,t){
    e.preventDefault();
    // title, data, tags
    var title = t.find('input[name=title]').value;
    var data = t.find('textarea[name=data]').value;
    
    Meteor.call('post.new',{
      title: title,
      data: data,
      tags: tags
    }, function(){
      Router.go('all');
    });
    
    
  }
});

Template.PostNew.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* PostNew: Lifecycle Hooks */
/*****************************************************************************/
Template.PostNew.created = function () {
};
var tags = [];

Template.PostNew.rendered = function () {
 $('select').selectize({
   create: true, 
   onChange: function(t){
     tags = t;
   }}) 
};

Template.PostNew.destroyed = function () {
};
