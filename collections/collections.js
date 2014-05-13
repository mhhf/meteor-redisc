Tags = new Meteor.Collection('tags', {
  schema: new SimpleSchema({
    name: {
      type: String,
      label: "Name"
    },
    counter: {
      type: Number,
      label: "Counter"
    }
  })
});


extendTags = function(t){
  var tag,tagO;
  for(var i in t) {
    tag = t[i];
    tagO = Tags.findOne({ name: tag });
      
    if( tagO ) {
      Tags.update({ _id: tagO._id },{ $inc: { counter: 1 } });
    } else {
      Tags.insert({ name: tag, counter: 0 });
    }
    
  }
  return true;
}

Posts = new Meteor.Collection("posts", {
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
        }
    })
});
