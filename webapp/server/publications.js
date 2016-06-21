Meteor.publish("allCases", function() {
  return Cases.find({});
});
Meteor.publish("singleCase", function(cid) {
  var c = Cases.find({_id:cid});
  var p = Posts.find({caseId:cid});
  return [ c, p ];
});
Meteor.publish("searchCase", function(cancer_type, gender, age1, age2) {
  check(gender, String);
  //check(cancer_type, [String]);
  check(age1, Number);
  check(age2, Number);
  console.log('cancer_type', cancer_type);
  Cases.findWithFacets({gender: gender, age: { $gt: age1, $lt: age2 }, cancer_type: {$in: cancer_type}});
});
