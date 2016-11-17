CaseSaveSearch = new Mongo.Collection("caseSaveSearch");
CaseSavedSearches = new Mongo.Collection("case_saved_searches");
CaseSaveSearch.attachSchema({
// saved search on case query
  name: {
    type: String,
    optional:true
  },
  query: {
    type: String
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
  createdAt: {
    type: Date,
    autoValue: function() {
       if (this.isInsert) {
         return new Date();
       } else if (this.isUpsert) {
         return {$setOnInsert: new Date()};
       } else {
         this.unset();  // Prevent user from supplying their own value
       }
     }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
});
