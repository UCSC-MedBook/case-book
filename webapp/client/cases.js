Template.cases.onCreated(function() {
  let instance = this;

  instance.casesQuery = new ReactiveVar({});

  instance.autorun(() => {
    let query = JSON.parse(JSON.stringify(instance.casesQuery.get()));
    instance.subscribe("searchCase", query);
  });
});

Template.cases.onRendered(function () {
  $(".ui.dropdown").dropdown();
});

Template.cases.helpers({
  getCases() {
    let query = Template.instance().casesQuery.get();
    console.log("query:", query);
    console.log("query.onStop:", query.onStop);
    return Cases.find(query);
  },
});

Template.cases.events({
  "click .go-to-case-page"(event, instance) {
    var c = instance.$(".caseid .selected");
    console.log('show case',c);

    FlowRouter.go("showCase");
  },
});

Template.caseSearchFields.events({
  "change .cancer_type"(event, instance) {
    var val = $('.cancer_type').dropdown('get value');

    let query = instance.casesQuery.get();

    if (!val) {
      delete query.cancer_type;
    } else {
      query.cancer_type = val;
    }

    console.log("setting query:", query);
    // HERE you're going to have to not refer to instance but Template.instance().parent()
    instance.casesQuery.set(query);
  }
});
