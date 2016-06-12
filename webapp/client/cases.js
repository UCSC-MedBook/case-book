Template.cases.onRendered(function () {
  $(".ui.dropdown").dropdown();
});

Template.cases.events({
  "click .go-to-case-page"(event, instance) {
    console.log('event',event);
    console.log('instance',instance);
    FlowRouter.go("showCase");
  },
});

Template.cases.helpers({
  cases: function() {
    c = Cases.find({});
    return c;
  }
});
