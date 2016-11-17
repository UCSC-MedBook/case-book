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
  status: {
    type: String,
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
