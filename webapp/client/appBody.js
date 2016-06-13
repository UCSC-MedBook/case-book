Template.appBody.onRendered(function () {
  // make the dropdowns in the menu work on hover
  $(".ui.menu .ui.dropdown"); //.dropdown({ on: "hover" });
});

Template.appBody.events({
  "click .ui.menu .createCase"(event, instance) {
    $('.create-case.ui.modal').modal('show');
  },
});
