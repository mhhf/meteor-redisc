var tags = [];

Template.PostNew.events({
  'click button[type=submit]': function(e,t){
    e.preventDefault();
    // title, data, tags
    var title = t.find('input[name=title]').value;
    var data = t.find('textarea[name=data]').value;
    var self = this;
    tags.push(this.ctx);
    
    Meteor.call('post.new',{
      title: title,
      data: data,
      tags: tags
    }, function(err){
      if(!err) self.onSuccess();
    });
    
    
  }
});

Template.PostNew.rendered = function () {
 $('select').selectize({
   create: true, 
   onChange: function(t){
     tags = t;
   }}) 
};
