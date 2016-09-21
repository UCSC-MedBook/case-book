Meteor.methods({
  createCase(newCase) {
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
    newPost.postedAt = new Date();
    newPost.caseId = caseId;
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
  }
});
