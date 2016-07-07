Template.projects.onCreated(function() {
  let instance = this;

  var projectQuery = Session.get('projectQuery');
  if (projectQuery == null) {
    console.log('##onCreated, clearing projectQuery',projectQuery);
    Session.set('projectQuery', '');
  }
  else{
    if (projectQuery.project_type) {
      console.log('onCreated cancer type', projectQuery.project_type);
    }
  }

  instance.autorun(() => {
    //let query = JSON.parse(JSON.stringify(instance.casesQuery.get()));
    let query = JSON.parse(JSON.stringify(Session.get('projectQuery')));
    instance.subscribe("searchProject", query);
  });
});

Template.projects.onRendered(function () {
  let instance = this;

  $(".ui.dropdown").dropdown({on:"hover"});

  let query = JSON.parse(JSON.stringify(Session.get('projectQuery')));
  if (!query) {
    query = {};
  }
  //instance.$(".ui.dropdown.stage").dropdown("set exactly", ["II", "0"]);
  if (query.project_type) {
    instance.$(".ui.dropdown.project_type").dropdown("set exactly", query.project_type["$in"]);
  }
});

Template.projects.events({
  "click .go-to-project-page"(event, instance) {
    FlowRouter.go("showProject");
  },
  "click .go-to-project-page"(event, instance) {
  var p = instance.$(".projectid .selected");
  console.log('show project',p);

  FlowRouter.go("showProject");
},
});

Template.projects.helpers({
  getProjects() {
    //let query = Template.instance().casesQuery.get();
    let query = JSON.parse(JSON.stringify(Session.get('projectQuery')));
    if (!query) {
      query = {};
    }
    console.log('getProjects');
    return Projects.find(query);
  },
  createDate: function () {
    return moment(this.createdAt).format('MMM D, YYYY h:mm a');
  },
  updateDate: function () {
    return moment(this.updatedAt).format('MMM D, YYYY h:mm a');
  },
});
