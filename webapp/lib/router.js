function defaultAction(templateName, params) {
  // renders appBody with templateName inside
  console.log('default action params', params);
  BlazeLayout.render("appBody", { content: templateName, params });
}

function sameNameAndAction(name) {
  return { name, action: _.partial(defaultAction, name) };
}

FlowRouter.route("/", sameNameAndAction("home"));

FlowRouter.route("/projects", sameNameAndAction("projects"));

FlowRouter.route("/cases", sameNameAndAction("cases"));

FlowRouter.route("/cases/:caseId", {
    name: "showCase",
    subscriptions: function(params, queryParams) {
      this.register('showCase', Meteor.subscribe('singleCase', params.caseId));
  },
    action: function(params ) {
        BlazeLayout.render("appBody", { content: "showCase", params });
    }}
);

FlowRouter.route("/projects/:projectId", {
    name: "showProject",
    subscriptions: function(params, queryParams) {
      this.register('showProject', Meteor.subscribe('singleProject', params.projectId));
  },
    action: function(params ) {
        BlazeLayout.render("appBody", { content: "showProject", params });
    }}
);

//FlowRouter.route("/projects/showProject", sameNameAndAction("showProject"));

FlowRouter.route("/apps", sameNameAndAction("apps"));
FlowRouter.route("/apps/MaastroLungSurvival", {
  action: function(params, queryParams) {
      BlazeLayout.render( 'apps', { content: 'MaastroLungSurvival', data: queryParams } );
  },
  name: 'MaastroLungSurvival'
});
FlowRouter.route("/apps/PatientsLikeMe", {
  action: function(params, queryParams) {
      BlazeLayout.render( 'apps', { content: 'PatientsLikeMe', data: queryParams } );
  },
  name: 'PatientsLikeMe'
});

FlowRouter.route( "/apps/MaastroRectalModel", {
  action: function() {
    BlazeLayout.render( 'apps', { content: 'MaastroRectalModel' } );
  },
  name: 'MaastroRectalModel'
});
FlowRouter.route( "/apps/PathologyStains", {
  action: function() {
    BlazeLayout.render( 'apps', { content: 'PathologyStains' } );
  },
  name: 'PathologyStains'
});
FlowRouter.route( "/apps/OrderIHC", {
  action: function() {
    BlazeLayout.render( 'apps', { content: 'OrderIHC' } );
  },
  name: 'OrderIHC'
});

FlowRouter.route("/insights", sameNameAndAction("insights"));
