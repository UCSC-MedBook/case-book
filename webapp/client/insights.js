Template.insights.onRendered(function () {
  $(".ui.dropdown").dropdown();
});

Template.insights.events({
  "click .go-to-case-page"(event, instance) {
    console.log('event',event);
    console.log('instance',instance);
    FlowRouter.go("showCase");
  },
});

Template.insights.helpers({
  cases: function() {
    c = Cases.find({});
    return c;
  }
});
