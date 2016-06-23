Meteor.publish("singleCase", function(cid) {
  var c = Cases.find({_id:cid});
  var p = Posts.find({caseId:cid});
  return [ c, p ];
});
Meteor.publish("searchCase", function(query) {
  //check(gender, String);
  //check(cancer_type, [String]);
  //jcheck(age1, Number);
  //jcheck(age2, Number);
  console.log('subscription query', query);
  //Cases.findWithFacets({gender: gender, age: { $gt: age1, $lt: age2 }, cancer_type: {$in: cancer_type}});
  if (query === undefined || query === null) {
    console.log('pub all cases');
    return Cases.find({});
  }
  else {
    var count = Cases.find(query).count();
    console.log('pub find', query, 'count', count);
    return Cases.find(query);
    //return Cases.findWithFacets({cancer_type: cancer_type});
  }
});
