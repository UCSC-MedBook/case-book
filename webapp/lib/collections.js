Cases = new Mongo.Collection("cases");
Cases.attachSchema({
  // NOTE: fullNarrative, firstName, lastName, publishToNanopub
  // only optional so that we can insert seed data

  // private organization information
  firstName: { type: String, optional: true },
  lastName: { type: String, optional: true },
  caseLabel: { type: String, optional: true },

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
          return this.field("fullNarrative").value;
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
// Posts.attachSchema({
//   title: { type: String },
//   body: { type: String, optional: true },
//   sticky: { type: Boolean, optional: true },
//   status: { type: Number, optional: true },
//   url: { type: String, optional: true },
//   categories: { type: [String], optional: true },
//   collaboration: { type: [String], optional: true },
//   userId: { type: String, optional: true },
//   createdAt: { type: Date },
//   updatedAt: { type: Date, optional: true },
//   postedAt: { type: Date, optional: true },
//   htmlBody: { type: String, optional: true },
//   scheduledAt: { type: Date, optional: true }
// });
