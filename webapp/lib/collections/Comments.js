Comments = new Mongo.Collection("comments");
Comments.attachSchema({
  body: { type: String, optional: true },
  postId : { type: String },
  userId: {
    type: String, optional: true,
    autoValue: function() {
      if (!this.isSet) {
        if ( typeof Meteor.userId === "function") {
          //console.log('user set by meteor', Meteor.userId());
          return Meteor.userId();
        }
      }
    }
  },
  createdAt: { type: Date },
  updatedAt: { type: Date, optional: true },
  postedAt: { type: Date, optional: true },
  htmlBody: { type: String, optional: true },
  upvotes : {type: Number, optional: true},
  downvotes : {type: Number, optional: true},
  baseScore : {type: Number, optional: true},
  score : {type: Number, decimal: true, optional: true},
  author: {
     type: String,
     autoValue: function() {
       if (!this.isSet) {
         //console.log('author', Meteor.user());
         var randomString = parseInt(Math.random(8).toString())
         return 'Clinician'+randomString;
       }
     }
   },
  parentCommentId: { type: String, optional: true },
  inactive : {
    type: Boolean, autoValue: function() {
      return false;
    }
  }
});
