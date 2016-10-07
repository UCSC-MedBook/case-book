Cases = new Mongo.Collection("cases");
Cases.attachSchema({
  // NOTE: fullNarrative, firstName, lastName, publishToNanopub
  // only optional so that we can insert seed data

  // private organization information
  firstName: { type: String, optional: true },
  lastName: { type: String, optional: true },
  caseLabel: { type: String, optional: true },
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

  // public information
  fullNarrative: { type: String, optional: true },
  summary: {
    type: String,
    optional: true,
    autoValue() {
      if (!this.isSet) {
        let summary = "";

        let gleasonScore = this.field("gleasonScore").value;
        if (gleasonScore) {
          summary += `Gleason score: ${gleasonScore}; `;
        }

        let drugs = this.field("drugs").value;
        if (drugs && drugs.length) {
          let uniqueDrugs = _.uniq(drugs);

          summary += `Treated with ${drugs.join(", ")}; `;
        }

        // if no fields filled in return the full narrative
        if (summary === "") {
          return this.field("fullNarrative").value.slice(0,80);
        }

        return summary;
      }
    },
  },
  publishToNanopub: { type: Boolean, defaultValue: false, optional: true },

  // normalized text fields
  age: {
    type: Number,
    optional: true,
  },
  gender: {
    type: String,
    allowedValues: [ "male", "female" ],
    optional: true,
  },
  fev: {
    type: Number,
    optional: true
  },
  cancer_type: {
    type: String,
    optional: true
  },
  stage: {
    type: String,
    optional: true
  },
  mutations: {
    type: [String],
    optional: true
  },
  gleasonScore: {
    type: Number,
    optional: true
  },
  drugs: {
    type: [String],
    optional: true
  },
});

Projects = new Mongo.Collection("projects");
Projects.attachSchema({
  projectName: { type: String, optional: true },
  projectLabel: { type: String, optional: true },
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

  // public information
  projectDescription: { type: String, optional: true },
});
Insights = new Mongo.Collection("insights")
Insights.attachSchema({
  caseId: { type: String },
  postId: { type: String , optional: true},
  insightText: { type: String },
  insightStatus: {
    type: String ,
    allowedValues: [ "pending", "approved", "disapproved", "pending-peer-review","public" ],
    optional: true,
  },
  note: { type: String , optional: true},
  cnl: { type: String, optional:true },
  url: { type: String, optional: true },
});
Posts = new Mongo.Collection("posts");
Posts.attachSchema({
  title: { type: String },
  body: { type: String, optional: true },
  sticky: { type: Boolean, optional: true },
  //supports: {
  //    type: Array,
  //    optional: true
  //},
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
  collaboration: { type: [String], optional: true },
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
       if (!this.isSet) {
         //console.log('author', Meteor.user());
         return 'anonymous';
       }
     }
   },
  commenters: { type: [String], optional: true },
  createdAt: { type: Date },
  updatedAt: { type: Date, optional: true },
  postedAt: { type: Date, optional: true },
  htmlBody: { type: String, optional: true },
  scheduledAt: { type: Date, optional: true },
  caseId: {type: String, optional: true }
});
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
         return 'anonymous';
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
CaseSaveSearch = new Mongo.Collection("caseSaveSearch");
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
Expression = new Mongo.Collection("expression");
CaseSavedSearches = new Mongo.Collection("case_saved_searches");
Points = new Meteor.Collection("Points");
Files = new FileCollection('fs',  // base name of collection
  { resumable: false,          // Disable resumable.js upload support
    resumableIndexName: undefined,    // Not used when resumable is false
    chunkSize: 2*1024*1024 - 1024,    // Use 2MB chunks for gridFS and resumable
    baseURL: '\gridfs\fs',     // Default base URL for all HTTP methods
    locks: {                   // Parameters for gridfs-locks
      timeOut: 360,            // Seconds to wait for an unavailable lock
      pollingInterval: 5,      // Seconds to wait between lock attempts
      lockExpiration: 90       // Seconds until a lock expires
    },
    http: []    // HTTP method definitions, none by default
  }
);
