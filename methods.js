Meteor.methods({
  'post.vote': function(o){
    var p = Redisc.Posts.findOne({_id: o._id});
    var b = 0;
    if(p.upvotes.indexOf(this.userId)>-1) b = -1;
    if(p.downvotes.indexOf(this.userId)>-1) b = 1;
    
    
    // if already voted
    if( b === -1 && o.value === 1 ) return false;
    if( b === 1 && o.value === -1 ) return false; 
    
    var score = p.upvotes.length - p.downvotes.length + o.value + b;
    
    
    if( o.value === -1 ) {
      
      Redisc.Posts.update( {_id: o._id}, {
        $pull: { upvotes: this.userId },
        $addToSet: { downvotes: this.userId },
        $set: {score: score} 
      }); 
      
    } else if( o.value === 1 ) {
      
      Redisc.Posts.update( {_id: o._id}, {
          $pull: { downvotes: this.userId },
          $addToSet: { upvotes: this.userId},
        $set: {score: score}
      });
      
    }
    
  },
  updatePost: function(o){
     
    // check parameters
    if( ( o && o._id && o.data ) == null ) return false;
    
    // check id and acl
    var p = Redisc.Posts.findOne({_id: o._id });
    if( !( p && p.userId === this.userId) ) return false;
    
    Redisc.Posts.update({_id: o._id},{ $set: { 
      data: o.data,
      updatedOn: new Date()
    } });
  },
  'post.new': function (o) {
    
    Redisc.Posts.insert({
      title: o.title,
      data: o.data,
      parent: null,
      root: null,
      createdOn: new Date(),
      comments: 0,
      userId: this.userId,
      userName: Meteor.user().username || 'anonym',
      upvotes: [],
      downvotes: [],
      tags: o.tags || [],
      comments: 0,
      score: 0
    });
    
    Tags.extend(o.tags);
    
    return true;
  },
  'post.comment': function (o) {
    
    Redisc.Posts.insert({
      title: null,
      data: o.data,
      parent: o.parent,
      root: o.root,
      createdOn: new Date(),
      comments: 0,
      userId: this.userId,
      userName: Meteor.user().username || 'anonym',
      upvotes: [],
      downvotes: [],
      tags: [],
      comments: 0,
      score: 0
    });
    
    Redisc.Posts.update({_id: o.root},{ 
      $inc: {comments:1},
      $set: {updatedOn: new Date()}
    });
    
    return true;
  }
});
