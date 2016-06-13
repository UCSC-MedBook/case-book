Meteor.publish("allCases", function() {
  return Cases.find({});
});
