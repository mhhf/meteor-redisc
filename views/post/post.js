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


var codeId = {
  dep:	new Deps.Dependency,
  val: null,
  get: function(){
    this.dep.depend();
    return this.val;
  },
  set: function( val ){
    this.dep.changed();
    this.val = val;
  }
}

var editor;

Template.PostContent.rendered = function(){
  var self = this;
  var _id = this.data._id;
  
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
  "click a.btn-code": function(e,t){
    e.preventDefault();
    codeId.set(e.currentTarget.dataset.target);
  },
  "click a.edit.submit": function(e,t){
    var data = t.find('textarea').value;
    var code = editor.getValue();
    Meteor.call('updatePost',{
      data: data,
      code: code,
      _id: this._id
    });
    seteditId(null);
    codeId.set(null);
  },
  "click a.comment.submit": function(e,t){
    var comment = t.find('textarea').value;
    var code = editor.getValue();
    
    var parent = getcommentId();
    Meteor.call('post.comment', {
      parent: parent,
      data: comment,
      code: {code: code},
      root: this.root || this._id
    });
    seteditId(null);
    codeId.set(null);
    setcommentId(null);
  },
  "click a.cancel": function(e,t){
    e.preventDefault();
    setcommentId(null);
    seteditId(null);
    codeId.set(null);
  }
}

Template.Post.helpers({
  initComments: function(){
    return { parent: this._id };
  },
});

Template.PostContent.helpers({
  getData: function(){
    var data = this.data;;
    var vars = data.match(/\$([\w\.]+)/g);
    if( vars )
  
    vars.forEach( function( variable ){
      var v = variable.slice(1);
      var consens = Redisc.Consensus.findOne({key:v});
      if( consens ) {
        data = data.replace(variable,"<span class=\"label label-primary\">"+consens.value+"</span>");
      }
    });
    
    return data;
  },
  getCode: function(){
    return this.code;
  },
  getExpr: function(){
    if(this.name == 'question') {
      return '?'+this.key;
    } else if( this.name == 'expr') {
      return this.key +' = '+this.value;
    }
  },
  getExprClass: function(){
    return this.name == 'question'?'primary':'success';
  },
  isEdit: function(){
    return geteditId() === this._id;
  },
  isEditClass: function(){
    return (geteditId() === this._id)?'edit':'';
  },
  isCode: function(){
    return this.code || this._id === codeId.get();
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

Template.CodeEditor.rendered = function(){
  var code = this.data.code;
  editor = CodeMirror(this.find('.codeEditorWrapper'),{
     lineNumbers: true,
     theme: 'monokai',
     value: code && Rlog.stringify( code ) || ''
  });
}
