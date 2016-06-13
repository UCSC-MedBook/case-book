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
    //$(".ui.modal").modal("show");
    $('.ui.modal')
  .modal({
    closable  : false,
    onDeny    : function(){
      window.alert('Wait not yet!');
      return false;
    },
    onApprove : function() {
      event.preventDefault();
      console.log('event', event, instance);
      console.log('target',event.target);
      console.log('first-name', instance.firstName);
      console.log('first-name value', instance.firstName.value);
    }
  })
  .modal('show')
;
  },
});
