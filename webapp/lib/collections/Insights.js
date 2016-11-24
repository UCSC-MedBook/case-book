Insights = new Mongo.Collection("insights")
Insights.attachSchema({
  caseId: { type: String, optional:true },
  postId: { type: String , optional: true},
  insightLabel: { type: String, optional:true },
  insightText: { type: String },
  insightStatus: {
    type: String ,
    allowedValues: [ "pending", "approved", "disapproved", "pending-peer-review","public" ],
    optional: true,
    },
  molecule: {
    type: new SimpleSchema({
      name: { type: String },
      class: {
         type: String ,
         allowedValues: [ "DNA", "mRNA", "protien", "microRNA","small molecule" ],
      },
      alias: {type: String , optional: true},
    }),
    optional: true
  },
  relationshipTo: {
    type: String,
    allowedValues: ["sensitivity to", "resistant to", "no relationship with"],
    optional: true,
  },
  drug: {
    type: String,
    optional: true
  },
  model: {
    type: Number,
    optional: true
  },
  reference: {
    type: String,
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
  collaborations: {
    type: [String]
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
