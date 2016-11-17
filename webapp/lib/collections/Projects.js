Projects = new Mongo.Collection("projects");
Projects.attachSchema({
  name: { type: String, optional: true },
  project_label: { type: String, optional: true },
  description: {type: String, optional: true},
  project_type: {
    type: String,
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
  collaborations: {
    type: [String]
  },

});
