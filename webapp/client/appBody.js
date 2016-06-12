Template.appBody.onRendered(function () {
  $(".ui.dropdown").dropdown();

  // make the dropdowns in the menu work on hover
  $(".ui.menu .ui.dropdown").dropdown({ on: "hover" });
});

Meteor.startup(function() {
  console.log('suscribe case.list');
  Meteor.subscribe('cases.list');
});


Template.appBody.events({
  "click .createCase"(event, instance) {
    $(".ui.modal").modal("show");
  },
});
