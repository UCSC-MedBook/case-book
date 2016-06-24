Meteor.publish("singleCase", function(cid) {
  var c = Cases.find({_id:cid});
  var p = Posts.find({caseId:cid});
  return [ c, p ];
});

Meteor.publish("searchCase", function(query) {
  if (!query) query = {};

  console.log("query:", query);
  return Cases.find(query, { limit: 20 });
});
