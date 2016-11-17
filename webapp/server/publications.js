var allowedCollections = [
  //"DataSets",
  //"SampleGroups",
  //"GeneSets",
  //"GeneSetGroups",
  //"Forms",
  "Studies",
  "Cases",
  "Projects",
  "Insights",
  "Posts",
];
Meteor.publish("allOfCollectionOnlyMetadata", function(collectionName) {
  check(collectionName, String);
  let user = MedBook.ensureUser(this.userId);

  if (allowedCollections.indexOf(collectionName) === -1) return [];
  console.log('publish:', collectionName)

  return MedBook.collections[collectionName].find({
    collaborations: { $in: user.getCollaborations() },
  }, { fields: { name: 1, version: 1 } });
});

Meteor.publish("objectFromCollection", function(collectionName, objectId) {
  check([collectionName, objectId], [String]);
  let user = MedBook.ensureUser(this.userId);

  if (allowedCollections.indexOf(collectionName)  === -1) return [];

  return MedBook.collections[collectionName].find({
    _id: objectId,
    collaborations: { $in: user.getCollaborations() },
  });
});


Meteor.publish("singleCase", function(cid) {
  check(cid, String);

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

  // default to search all
  if (!query) query = {};

  query.collaborations = { $in: user.getCollaborations() };

  console.log("query:", query);
  var cases = Cases.find(query, { limit: 100 });

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
Meteor.publish("genes", function(query) {
  if (!query) query = {};
  var genes = Genes.find(query,
    { fields: { gene_label: 1 }}, { limit: 100 }
  );
  return genes;
});
Meteor.publish("points", function(query) {
  let user = MedBook.ensureUser(this.userId);
  if (!query) query = {};
  var points = Points.find(query, { limit: 2000 });
  console.log("points query:", query, "count",points.count());
  return points;
});
