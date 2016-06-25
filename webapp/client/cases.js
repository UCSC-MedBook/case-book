Template.cases.onCreated(function() {
  let instance = this;

  instance.casesQuery = new ReactiveVar({});
  Session.set('caseQuery', '');

  instance.autorun(() => {
    //let query = JSON.parse(JSON.stringify(instance.casesQuery.get()));
    let query = JSON.parse(JSON.stringify(Session.get('caseQuery')));
    instance.subscribe("searchCase", query);
  });
});

Template.cases.onRendered(function () {
  $(".ui.dropdown").dropdown();
});

Template.cases.helpers({
  getCases() {
    //let query = Template.instance().casesQuery.get();
    let query = JSON.parse(JSON.stringify(Session.get('caseQuery')));
    if (!query) {
      query = {};
    }
    console.log("query:", query);
    //console.log("query.onStop:", query.onStop);
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
    console.log('search ',val);

    //let query = instance.casesQuery.get();
    let query = JSON.parse(JSON.stringify(Session.get('caseQuery')));

    if (!val) {
      delete query.cancer_type;
    } else {
      //query.cancer_type = val;
      if (!query) {
        query = {}
      }
      query = {cancer_type: {$in: val}};
    }

    console.log("setting query:", query);
    // HERE you're going to have to not refer to instance but Template.instance().parent()
    Session.set('caseQuery',query);
    //instance.casesQuery.set(query);
  },
  "change .stage"(event, instance) {
    var val = $('.stage').dropdown('get value');
    let query = JSON.parse(JSON.stringify(Session.get('caseQuery')));
    if (!val) {
      delete query.stage;
    } else {
      //query.cancer_type = val;
      if (!query) {
        query = {}
      }
      query.stage = {$in: val};
    }
    console.log("setting query:", query);
    Session.set('caseQuery',query);
  }
});
