
Redisc = {
  Posts: null,
  Consensus: null,
  configure: function( name, o ){
    
    var self = this;
    
    this.Consensus = new Meteor.Collection('Consensus');
    
    this.Posts = new Meteor.Collection( name , {
      schema: new SimpleSchema({
      title: {
        type: String,
        label: "Title",
        max: 200,
        optional: true
      },
      parent: {
        type: String,
        label: "Parent Node",
        optional: true
      },
      root: {
        type: String,
      label: "Root Post",
      optional: true
      },
      data: {
        type: String,
      label: "Data"
      },
      createdOn: {
        type: Date,
        label: "Creation Date"
      },
      updatedOn: {
        type: Date,
        label: "Updated On",
        optional: true
      },
      userId: {
        type: "String" ,
        label: "User ID"
      },
      userName: {
        type: "String",
        label: "User Name"
      },
      score: {
        type: Number,
        label: 'overall Score'
      },
      upvotes: {
        type: [String],
        label: "Upvoters",
        optional: true
      },
      downvotes: {
        type: [String],
        label: "Downvoters",
        optional: true
      },
      tags: {
        type: [String],
        label: "tags",
        optional: true
      },
      comments: {
        type: Number,
        label: "number of comments"
      },
      code: {
        type: [Object],
        optional: true,
      },
      'code.$': {
        type: Object,
        blackbox: true
      }
    })
    });
    
    if ( Meteor.isClient ) {
      Meteor.subscribe('Consensus');
    }
    
    if( Meteor.isServer ) {
      Meteor.publish('Consensus', function(){
        return self.Consensus.find();
      });
      
      Meteor.publish('Redisc.Posts', function( tags ){
        var q = tags && tags.length>0 && { tags:{ $in: tags }, parent: null } || { parent: null };
        return self.Posts.find( q );
      });
      
      Meteor.publish('Redisc.Post', function( _id ){
        return self.Posts.find({ $or: [ { _id: _id }, { root: _id } ] });
      });
      
      self.Posts.allow({
        insert: function (userId, doc) {
          return true;
        },

        update: function (userId, doc, fieldNames, modifier) {
          return true;
        },

        remove: function (userId, doc) {
          return true;
        }
      });

      self.Posts.deny({
        insert: function (userId, doc) {
          return false;
        },

        update: function (userId, doc, fieldNames, modifier) {
          return false;
        },

        remove: function (userId, doc) {
          return false;
        }
      });
    }
    
    
  },
  map: function( f ){
    var ctx = function( key, o ){
      
    }
    f();
  }
}
