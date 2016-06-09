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
Template.mainPage.onCreated(function() {
  let instance = this;

  instance.subscribe("Cases", ""); // subscribe immidiately

  function resubscribe(searchString) {
    // currently we load all the Cases :)
    // instance.subscribe("Cases", searchString);
  }
  let debouncedResubscribe = _.debounce(resubscribe);

  instance.searchString = new ReactiveVar("");
  instance.autorun((computation) => {
    let searchString = instance.searchString.get();

    // subscribe immidiately the first time and then debounced resubscribes
    if (computation.firstRun) {
      resubscribe(searchString);
    } else {
      debouncedResubscribe(searchString);
    }
  });
});

Template.mainPage.helpers({
  getCases() {
    let searchString = Template.instance().searchString.get();

    return Cases.find({
      case_ID: { $regex: new RegExp(searchString) }
    }, { sort: { case_ID: 1 } });
  },
});

Template.searchFields.events({
  "keyup .search-Cases"(event, instance) {
    instance.searchString.set(event.target.value);
  },
});
