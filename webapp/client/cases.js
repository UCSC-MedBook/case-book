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

Template.cases.helpers({
  getCases() {
    return Cases.find({});
  },
  pathForPost: function() {
    var caseObj = this;
    console.log('case', caseObj);
    var params = {
        caseId: caseObj._id
    };
    var queryParams = {id: caseObj._id};
    var routeName = "showCase";
    var path = FlowRouter.path(routeName, params, queryParams);

    return path;
  }
});
