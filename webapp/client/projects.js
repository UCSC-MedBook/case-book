Template.projects.onRendered(function () {
  $(".ui.dropdown").dropdown();
});
Template.projects.events({
  "click .go-to-project-page"(event, instance) {
    FlowRouter.go("showProject");
  },
});
