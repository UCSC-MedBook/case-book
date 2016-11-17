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
  ratings: {
    type: [
      new SimpleSchema({
        author: { type: String },
        applicability: { type: Number},
        importance: { type: Number},
        evidenceStrength: { type: Number},
        })
    ],
    optional: true
  },
  note: { type: String , optional: true},
  cnl: { type: String, optional:true },
  url: { type: String, optional: true },
});
