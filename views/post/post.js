/*****************************************************************************/
/* Post: Event Handlers and Helpers */
/*****************************************************************************/
var commentId = null;
var commentIdDep = new Deps.Dependency;
var getcommentId = function(){
  commentIdDep.depend();
  return commentId;
  
}
var setcommentId = function( val ){
  commentId = val;
  commentIdDep.changed();
}
var editId = null;
var editIdDep = new Deps.Dependency;
var geteditId = function(){
  editIdDep.depend();
  return editId;
  
}
var seteditId = function( val ){
  editId = val;
  editIdDep.changed();
}

Template.PostContent.events = {
  "click a.btn-edit": function(e){
    e.preventDefault();
    seteditId(e.currentTarget.dataset.target);
  },
  "click a.btn-comment": function(e){
    e.preventDefault();
    setcommentId(e.currentTarget.dataset.target);
  },
  "click a.edit.submit": function(e,t){
    var data = t.find('textarea').value;
    Meteor.call('updatePost',{
      data: data,
      _id: this._id
    });
    seteditId(null);
  },
  "click a.comment.submit": function(e,t){
    var comment = t.find('textarea').value;
    var parent = getcommentId();
    Meteor.call('post.comment', {
      parent: parent,
      data: comment,
      root: this.root || this._id
    });
    seteditId(null);
    setcommentId(null);
  },
  "click a.cancel": function(e,t){
    e.preventDefault();
    setcommentId(null);
    seteditId(null);
  }
}

Template.Post.helpers({
  initComments: function(){
    return { parent: this._id };
  },
});

Template.PostContent.helpers({
  isEdit: function(){
    return geteditId() === this._id;
  },
  userOwn: function(){
    return Meteor.userId() === this.userId;
  },
  isComment: function(){
    return getcommentId() === this._id;
  }
});

Template.Comments.helpers({
  getComments: function(){
    return Redisc.Posts.find({parent: this.parent },{sort:{score: -2, updatedOn: -1, createdOn: -1 }});
  },
  hasComments: function(){
    return Redisc.Posts.find({parent: this._id}).count()>-1;
  }
});

/*****************************************************************************/
/* Post: Lifecycle Hooks */
/*****************************************************************************/
Template.Post.created = function () {
};

Template.Post.rendered = function () {
};

Template.Post.destroyed = function () {
};
