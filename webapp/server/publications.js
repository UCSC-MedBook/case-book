Meteor.publish("allCases", function() {
  return Cases.find({});
});
Meteor.publish("singleCase", function(cid) {
  return Cases.find({_id:cid});
});
