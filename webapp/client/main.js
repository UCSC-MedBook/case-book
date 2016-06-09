import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
Template.body.onRendered(function () {
  $(".ui.dropdown").dropdown();
});
Template.body.events({
  'click .createCase': function (event, instance) {
    $('.ui.modal')
      .modal('show')
    ;
  }
});
