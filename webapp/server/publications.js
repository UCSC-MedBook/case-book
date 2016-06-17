Meteor.publish("allCases", function() {
  return Cases.find({});
});
Meteor.publish("singleCase", function(cid) {
  var c = Cases.find({_id:cid});
  var p = Posts.find({caseId:cid});
  return [ c, p ];
});
