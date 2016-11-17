Meteor.methods({
  createCase(newCase) {
    var user = MedBook.ensureUser(Meteor.userId());
    newCase.createdAt = new Date();
    if ( typeof Meteor.userId === "function") {
      newCase.userId = Meteor.userId();
    }
    newCase.createdAt = new Date();
    var rx = /\[([^\[\]]*)\]/g;
    var m, parse = [];
    while((m = rx.exec(newCase.fullNarrative)))
      parse.push(m[1]);
    parse.map(function(x) {
      var arr = x.split(':');
      console.log("adding key:",arr[0], "val:" ,arr[1]);
      if (arr[0] == 'mutations') {
        console.log('mutations len:',arr[1].split(",").length, arr[1].split(","));
        newCase[arr[0]] = arr[1].split(',');
      }
      else {
        newCase[arr[0]] = arr[1];
      }
    });
    console.log('parsed text',JSON.stringify(newCase));
    Cases.insert(newCase);
  },
  createProject(newProject) {
    newProject.createdAt = new Date();
    if ( typeof Meteor.userId === "function") {
      newProject.userId = Meteor.userId();
    }
    newProject.createdAt = new Date();
    console.log('project ',JSON.stringify(newProject));
    Projects.insert(newProject);
  },
  createPost(newPost, caseId) {
    //newPost.title = newPost.title;
    if (newPost.title === 'undefined') {
      newPost.title = newPost.body.substring(0, 80);
    }
    //if ( typeof this.userId === "function") {
    //  newPost.userId = this.userId;
    //}
    newPost.createdAt = new Date();
    newPost.updatedAt = newPost.createdAt ;
    newPost.postedAt = newPost.createdAt;
    newPost.caseId = caseId;
    console.log('insert post',newPost)
    Posts.insert(newPost);
  },
  createReply(newReply) {
    //if ( typeof this.userId === "function") {
    //  newPost.userId = this.userId;
    //}
    newReply.createdAt = new Date();
    newReply.postedAt = new Date();
    console.log("new reply", newReply)
    Comments.insert(newReply);
  },
  createInsight(caseId, postId, formObj) {
    var caseObj = Cases.findOne({_id:caseId});
    if (!caseObj) {
      return;
    }
    console.log('create Insight: ',formObj.text);
    //Posts.update({_id:postId},{$set:{insight:text, insightStatus:"pending"}});
    if (postId) {
      Insights.insert({caseId:caseId, postId: postId, insightText:formObj.text, note:formObj.note, insightStatus:"pending"})
    }
    else {
      Insights.insert({caseId:caseId, insightText:formObj.text, note: formObj.note, insightStatus:"pending"})
    }
  },
  updateInsight(insightId, formObj) {
    var insight = Insights.findOne({_id:insightId});
    console.log('update Insight ',insight, formObj.text);
    //Posts.update({_id:postId},{$set:{insight:text, insightStatus:"pending"}});
    Insights.update({_id:insightId},{$set:{insightText:formObj.text, insightStatus:"pending"}});
  },
  approveInsight(insightId, text) {
    var insight = Insights.findOne({_id:insightId});
    //var newPost = Posts.findOne({_id:postId});
    if (insight.insightStatus) {
      console.log('approve Insight ',insightId);
      Insights.update({_id:insightId},{$set:{insight:text, insightStatus:"approved"}});
    }
  },
  deletePost(id) {
    var user = MedBook.ensureUser(Meteor.userId());
    var post = Posts.findOne({_id:id});
    console.log('user', user._id ,'trying to delete',post)
  },
  invite(newInvite) {
    console.log('invite', newInvite);
  },
  createSavedSearch(query) {
    var newSearch = {};
    newSearch.query = JSON.stringify(query);
    if ( typeof Meteor.userId === "function") {
      newSearch.userId = Meteor.userId();
    }
    console.log("inserting saved search", newSearch);
    CaseSavedSearches.insert(newSearch);
  },
  parseCase(text) {
    //var text = "[gender:Male] [age:30][cancer_type:Lung]";
    var rx = /\[([^\[\]]*)\]/g;
    var m, parse = [];
    var cases = {};
  	while((m = rx.exec(text)))
    	parse.push(m[1]);
    parse.map(function(x) {
      var arr = x.split(':');
      cases[arr[0]] = arr[1];
    console.log('parsed text',JSON.stringify(cases));
    return JSON.stringify(cases);
    });
  },
  newSampleLabel(sampleDefinition) {
    check(sampleDefinition, new SimpleSchema({
      study_label: { type: String },
      uq_sample_label: { type: String },
    }));

    let { uq_sample_label, study_label } = sampleDefinition;

    let user = MedBook.ensureUser(Meteor.userId());
    user.ensureAccess(Studies.findOne({ study_label }));

    let sample_label = study_label + "/" + uq_sample_label;
    if (!sample_label.match(MedBook.sampleLabelRegex)) {
      throw new Meteor.Error("invalid-sample-label");
    }

    Studies.update({ study_label }, {
      $addToSet: {
        sample_labels: sample_label
      }
    });
  },

  studyLabelTaken(study_label) {
    check(study_label, String);

    let user = MedBook.ensureUser(Meteor.userId());

    return !!Studies.findOne({ study_label });
  },
  insertStudy(newStudy) {
    check(newStudy, Studies.simpleSchema().pick([
      "name",
      "description",
      "study_label",
    ]));

    let user = MedBook.ensureUser(Meteor.userId());

    newStudy.collaborations = [ user.personalCollaboration() ];

    // must be unique
    if (Meteor.call("studyLabelTaken", newStudy.study_label)) {
      console.log("throw it out");
      throw new Meteor.Error("study-label-not-unique");
    }

    return Studies.insert(newStudy);
  },
  newProjectLabel(projectDefinition) {
    check(caseDefinition, new SimpleSchema({
      project_label: { type: String },
      uq_case_label: { type: String },
    }));

    let { uq_case_label, project_label } = caseDefinition;

    let user = MedBook.ensureUser(Meteor.userId());
    user.ensureAccess(Projects.findOne({ project_label }));

    let case_label = project_label + "/" + uq_case_label;
    if (!case_label.match(MedBook.sampleLabelRegex)) {
      throw new Meteor.Error("invalid-case-label");
    }

    Projects.update({ case_label }, {
      $addToSet: {
        case_labels: case_label
      }
    });
  },

  projectLabelTaken(project_label) {
    check(project_label, String);

    let user = MedBook.ensureUser(Meteor.userId());

    return !!Projects.findOne({ project_label });
  },
  insertProject(newProject) {
    check(newProject, Projects.simpleSchema().pick([
      "name",
      "description",
      "project_label",
    ]));

    let user = MedBook.ensureUser(Meteor.userId());

    newProject.collaborations = [ user.personalCollaboration() ];

    // must be unique
    if (Meteor.call("projectLabelTaken", newProject.project_label)) {
      console.log("throw it out");
      throw new Meteor.Error("project-label-not-unique");
    }

    return Projects.insert(newProject);
  },
  // shareAndDeleteButtons
removeObject(collection_name, mongo_id) {
  check([collection_name, mongo_id], [String]);

  let user = MedBook.ensureUser(Meteor.userId());
  let object = MedBook.collections[collection_name].findOne(mongo_id);
  user.ensureAccess(object);

  let removeAllowedCollections = [
    "Jobs",
    "DataSets",
    "SampleGroups",
    "Forms",
    "GeneSets",
    "GeneSetGroups",
    "Studies",
  ];
  if (removeAllowedCollections.indexOf(collection_name) === -1) {
    throw new Meteor.Error("permission-denied");
  }

  // do some collection-specific checking before actually removing the object
  if (collection_name === "Jobs") {
    let deleteableJobs = [
      "RunLimmaGSEA",
      "TumorMapOverlay",
      "UpDownGenes",
    ];

    if (deleteableJobs.indexOf(object.name) === -1) {
      throw new Meteor.Error("permission-denied");
    }
  }

  // remove original object
  MedBook.collections[collection_name].remove(mongo_id);
}
});
