Meteor.publish("singleCase", function(cid) {
  var c = Cases.find({_id:cid});
  var p = Posts.find({caseId:cid});
  //user.ensureAccess(c); // throws "permission-denied" if no access
  return [ c, p ];
});

Meteor.publish("searchCase", function(query) {
  let user = MedBook.ensureUser(this.userId);
  console.log('user',user);
  if (!query) query = {};

  console.log("query:", query);
  var cases = Cases.find(query, { limit: 20 });
  //user.ensureAccess(cases); // throws "permission-denied" if no access
  return cases;
});
