Posts = new Mongo.Collection("posts");
Posts.attachSchema({
  title: { type: String },
  body: { type: String, optional: true },
  sticky: { type: Boolean, optional: true },
  supporting_cards: {
    type: [
      new SimpleSchema({
        post_id: { type: String },
        description: { type: String, optional: true},
      })
    ],
    optional: true
  },
  status: {
    type: Number,
    optional: true,
    autoValue: function() {
      if (!this.isSet) {
        return 2;
      }
    }
  },
  insight: {
    type: String,
    optional: true,
  },
  insightStatus: {
    type: String ,
    allowedValues: [ "pending", "approved", "disapproved" ],
    optional: true,
  },
  inactive: {
    type: Boolean,
    optional: true,
    autoValue: function() {
      if (!this.isSet) {
        return false;
      }
    }
  },
  url: { type: String, optional: true },
  categories: { type: [String], optional: true },
  collaborations: {
    type: [String]
  },
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
  author: {
     type: String,
     autoValue: function() {
       if (!this.isSet && this.insert) {
         //console.log('author', Meteor.user());
         var randomString = parseInt(Math.random(8).toString())
         return 'Clinician'+randomString;
       }
     }
   },
  commenters: { type: [String], optional: true },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    },
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
        return new Date();
    }
  },
  postedAt: { type: Date, optional: true },
  htmlBody: { type: String, optional: true },
  scheduledAt: { type: Date, optional: true },
  caseId: {type: String, optional: true }
});
Posts.allow({
  insert: function (userId, submission) {
    var user = MedBook.ensureUser(userId);
    user.ensureAccess(submission);

    return submission.status === "editing";
  },
  update: function (userId, submission, fields, modifier) {
    console.log('checking post access user:',userId, ' submission',submission)
    var user = MedBook.ensureUser(userId);
    user.ensureAccess(submission);

    return true;
  },
  remove: function (userId, docs){
    return _.all(docs, function(doc) {
      console.log('checking post delete access user:',userId, ' owner',doc.userId)
      return doc.userId === userId;
    });
  }
});
