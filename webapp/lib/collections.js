Cases = new Mongo.Collection("cases");
Cases.attachSchema({
  // private organization information
  firstName: { type: String },
  lastName: { type: String },
  caseLabel: { type: String, optional: true },

  // public information
  fullNarrative: { type: String },
  summary: { type: String, optional: true },
  publishToNanopub: { type: Boolean, defaultValue: false },

  // normalized text fields
  Age: {
    type: Number,
    optional: true,
    autoValue() {
      // numbers between 20 and 80
      return Math.floor(Math.random()*60+20);
    },
  },
  Gender: {
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
});
