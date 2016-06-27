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
  createPost(newPost) {
    newPost.title = newPost.body.substring(0, 80);
    //if ( typeof this.userId === "function") {
    //  newPost.userId = this.userId;
    //}
    newPost.createdAt = new Date();
    newPost.postedAt = new Date();
    Posts.insert(newPost);
  },
  createInsight(postId, text) {
    var newPost = Posts.findOne({_id:postId});
    if (newPost.insightStatus) {
      return;
    }
    console.log('update Insight ',postId);
    Posts.update({_id:postId},{$set:{insight:text, insightStatus:"pending"}});
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
