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
  //console.log('user',user);

  // default to search all
  if (!query) query = {};

  query.collaborations = { $in: user.getCollaborations() };

  console.log("query:", query);
  var cases = Cases.find(query, { limit: 20 });
  return cases;
});

Meteor.publish("singleProject", function(pid) {
  let user = MedBook.ensureUser(this.userId);

  // throws "permission-denied" if no access
  user.ensureAccess(Projects.findOne(pid));

  return [
    Projects.find(pid),
    Posts.find({projectId:pid})
  ];
});

Meteor.publish("searchProject", function(query) {
  let user = MedBook.ensureUser(this.userId);
  //console.log('user',user);

  // default to search all
  if (!query) query = {};

  query.collaborations = { $in: user.getCollaborations() };

  var projects = Projects.find(query, { limit: 20 });
  console.log("query projects:", query, Projects.find(query).count());
  return projects;
});
Meteor.publish("points", function(query) {
  let user = MedBook.ensureUser(this.userId);
  if (!query) query = {};
  var points = Points.find(query, { limit: 2000 });
  console.log("points query:", query, "count",Points.find(query).count());
  return points;
});
