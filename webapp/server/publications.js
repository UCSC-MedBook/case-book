Meteor.publish("singleCase", function(cid) {
  let user = MedBook.ensureUser(this.userId);

  // throws "permission-denied" if no access
  user.ensureAccess(Cases.findOne(cid));

  return [
    Cases.find(cid),
    Posts.find({caseId:cid})
  ];
});

Meteor.publish("searchCase", function(query) {
  let user = MedBook.ensureUser(this.userId);
  console.log('user',user);

  // default to search all
  if (!query) query = {};

  query.collaborations = { $in: user.getCollaborations() };

  console.log("query:", query);
  var cases = Cases.find(query, { limit: 20 });
  return cases;
});
