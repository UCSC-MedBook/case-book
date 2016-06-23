Meteor.publish("allCases", function() {
  return Cases.find({});
});
Meteor.publish("singleCase", function(cid) {
  var c = Cases.find({_id:cid});
  var p = Posts.find({caseId:cid});
  return [ c, p ];
});
Meteor.publish("searchCase", function(cancer_type) {
  //check(gender, String);
  //check(cancer_type, [String]);
  //jcheck(age1, Number);
  //jcheck(age2, Number);
  console.log('cancer_type', cancer_type);
  //Cases.findWithFacets({gender: gender, age: { $gt: age1, $lt: age2 }, cancer_type: {$in: cancer_type}});
  if (cancer_type === null) {
    console.log('pub all cases', cancer_type);
    return Cases.find({});
  }
  else {
    console.log('pub cancer_type', cancer_type);
    return Cases.find({});
    //return Cases.findWithFacets({cancer_type: cancer_type});
  }
});
