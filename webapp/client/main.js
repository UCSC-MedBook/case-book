import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.body.onRendered(function () {
  $(".ui.dropdown").dropdown();

  // make the dropdowns in the menu work on hover
  $(".ui.menu .ui.dropdown").dropdown({ on: "hover" });
});

Template.body.events({
  'click .createCase'(event, instance) {
    $('.ui.modal').modal('show');
  }
});
