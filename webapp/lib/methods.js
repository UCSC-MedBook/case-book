Meteor.methods({
  createCase(newCase) {
    newCase.createdAt = new Date();
    if ( typeof Meteor.userId === "function") {
      newCase.userId = Meteor.userId();
    }
    newCase.createdAt = new Date();
    Cases.insert(newCase);
  },
  createPost(newPost) {
    newPost.title = newPost.body.substring(0, 80);
    if ( typeof Meteor.userId === "function") {
      newPost.userId = this.userId;
    }
    newPost.createdAt = new Date();
    newPost.postedAt = new Date();
    Posts.insert(newPost);
  }
});
