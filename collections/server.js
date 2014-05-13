Meteor.publish('tags', function () {
  // you can remove this if you return a cursor
  return Tags.find();
});

Meteor.publish('posts', function ( tag ) {
  if( !tag ) {
    return Posts.find({parent: null});
  } else {
    return Posts.find({tags:{$in:[tag]}});
  }
});

Meteor.publish('post', function (_id) {
  return Posts.find({ $or: [ { _id: _id }, { root: _id } ] });
});


Tags.allow({
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

Tags.deny({
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

Posts.allow({
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

Posts.deny({
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
