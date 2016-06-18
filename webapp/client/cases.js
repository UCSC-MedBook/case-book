Template.cases.onCreated(function() {
  let instance = this;

  instance.subscribe("allCases");
});

Template.cases.onRendered(function () {
  $(".ui.dropdown").dropdown();
});

Template.cases.events({
  "click .go-to-case-page"(event, instance) {
    console.log('show case',event, instance);
    console.log('current target', event.currentTarget );
    FlowRouter.go("showCase");
  },
});
Template.caseSearchFields.events({
  "change .cancer_type"(event, instance) {
    console.log('search ',event, instance, event.currentTarget);
    console.log('event.target.value', event.target.value)
    //var x = instance.$('.cancer_type:selected');
    var x = Template.instance().findAll();
    console.log('selected ', x);
  }
});

Template.cases.helpers({
  getCases() {
    return Cases.find({});
  },
});
