Meteor.methods({
  createCase(newCase) {
    newCase.createdAt = new Date();
    newCase.userId = Meteor.userId();
    Cases.insert(newCase);
  },
  createPost(newPost) {
    newPost.userId = this.userId;
    newPost.createdAt = new Date();
    newPost.postedAt = new Date();
    Posts.insert(newPost);
  }
});
