Meteor.methods({
  createCase(newCase) {
    Cases.insert(newCase);
  },
});
