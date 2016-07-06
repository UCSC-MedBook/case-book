Template.appBody.onRendered(function () {
  // make the dropdowns in the menu work on hover
  $(".ui.menu .ui.dropdown"); //.dropdown({ on: "hover" });
});

Template.appBody.events({
  "click .ui.menu .createCase"(event, instance) {
    $('.create-case.ui.modal').modal({detachable: false});
    $('.create-case.ui.modal').modal('show');
    //var modal_template = Template[instance.data.template];
    //console.log('model', modal_template);
    //var container = $(".app-dimmer").get(0);
    //var parent_view = instance.parent().view;
    //if (container)
    // Blaze.renderWithData(modal_template, this, container, parent_view);
  },
  "change"(event, instance){
    console.log('change fired in appBody event',event);
  }
});
