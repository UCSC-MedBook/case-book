Template.appBody.onRendered(function () {
  // make the dropdowns in the menu work on hover
  $(".ui.menu .ui.dropdown").dropdown({ on: "hover" });
});

Template.appBody.events({
  "click .ui.menu .createCase"(event, instance) {
    console.log('create case');
    $('.create-case.ui.modal')
        // .modal({detachable: false})
        .modal('show');
    //var modal_template = Template[instance.data.template];
    //console.log('model', modal_template);
    //var container = $(".app-dimmer").get(0);
    //var parent_view = instance.parent().view;
    //if (container)
    // Blaze.renderWithData(modal_template, this, container, parent_view);
  },
  "click .ui.menu .createProject"(event, instance) {
    console.log('create Project');
    $('.create-project.ui.modal')
        // .modal({detachable: false})
        .modal('show');
  },
});
