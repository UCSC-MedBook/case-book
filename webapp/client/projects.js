Template.projects.onRendered(function () {
  $(".ui.dropdown").dropdown();
});
Template.projects.events({
  "click .go-to-case-page"(event, instance) {
    FlowRouter.go("showProject");
  },
});
