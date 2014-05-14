Template.Stats.hasTags = function(){
  return this.tags.length > 0;
}

Template.Stats.lastChange = function(){
  return this.updatedOn || this.createdOn;
}

Template.Score.events({
  "click [name=up]": function(e,t){
    e.preventDefault();
    var _id = e.currentTarget.dataset.target;
    vote(_id, 1);
  },
  "click [name=down]": function(e,t){
    var _id = e.currentTarget.dataset.target;
    vote(_id, -1);
  }
});

var vote = function(_id, value){
  Meteor.call('post.vote',{
    _id: _id,
    value: value
  });
}

Template.Score.helpers({
  voted: function(c){
    if(c === 'up') {
      return this.upvotes.indexOf(Meteor.userId())>-1?'active':'';
    } else if (c === 'down') {
      return this.downvotes.indexOf(Meteor.userId())>-1?'active':'';
    }
  }
});
