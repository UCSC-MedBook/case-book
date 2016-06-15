Meteor.methods({
  createCase(newCase) {
    Cases.insert(newCase);
  },
  createPost(newPost) {
    Posts.insert(newPost);
  }
});
