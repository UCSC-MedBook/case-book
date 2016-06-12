Template.cases.onRendered(function () {
  $(".ui.dropdown").dropdown();
});

Template.cases.events({
  "click .go-to-case-page"(event, instance) {
    FlowRouter.go("showCase");
  },
});

Template.cases.helpers({
  cases: function() {
    c = Cases.find({});
    return c;
  }
});
