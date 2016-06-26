Expression = new Mongo.Collection("expression");
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
    autoValue() {
      // numbers between 20 and 80
      return Math.floor(Math.random()*60+20);
    },
  },
  gender: {
    type: String,
    allowedValues: [ "male", "female" ],
    optional: true,
    autoValue() {
      if (Math.random() < .5) {
        return "male";
      } else {
        return "female";
      }
    },
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

Posts = new Mongo.Collection("posts");
Posts.attachSchema({
  title: { type: String },
  body: { type: String, optional: true },
  sticky: { type: Boolean, optional: true },
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
          console.log('user set by meteor', Meteor.userId());
          return Meteor.userId();
        }
      }
    }
  },
  author: {
     type: String,
     autoValue: function() {
       if (!this.isSet) {
         console.log('author', Meteor.user());
         return 'anonymous';
       }
     }
   },
  createdAt: { type: Date },
  updatedAt: { type: Date, optional: true },
  postedAt: { type: Date, optional: true },
  htmlBody: { type: String, optional: true },
  scheduledAt: { type: Date, optional: true },
  caseId: {type: String, optional: true }
});
