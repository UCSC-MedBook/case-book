Template.cases.onCreated(function() {
  let instance = this;
  console.log("onCreated cases")
  var query = {};
  instance.subscribe("searchCase", query);
});

Template.cases.onRendered(function () {
  $(".ui.dropdown").dropdown();
});

Template.cases.events({
  "click .go-to-case-page"(event, instance) {
    var c = instance.$(".caseid .selected");
    console.log('show case',c);
    console.log('show case',event, instance);
    //console.log('current target', event.currentTarget );
    FlowRouter.go("showCase");
  },
});
Template.caseSearchFields.events({
  "change .cancer_type"(event, instance) {
    var val = $('.cancer_type')
      .dropdown('get value')
    ;
    if (val === null) {
      console.log('subscribe caseSearch all cases');
      Meteor.subscribe('searchCase', {});
    }
    else {
      var query = {'cancerType': {$in : val}};
      console.log('subscribe caseSearch drop down', query);
      Meteor.subscribe('searchCase', query);
    }
  }
});

Template.cases.helpers({
  getCases() {
    return Cases.find({});
  },
});
