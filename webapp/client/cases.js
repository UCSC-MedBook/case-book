Template.cases.onCreated(function() {
  let instance = this;

  instance.subscribe("allCases");
});

Template.cases.onRendered(function () {
  $(".ui.dropdown").dropdown();
});

Template.cases.events({
  "click .go-to-case-page"(event, instance) {
    FlowRouter.go("showCase");
  },
});

Template.cases.helpers({
  getCases() {
    return Cases.find({});
  },
});
