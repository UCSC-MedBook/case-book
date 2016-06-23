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

FlowRouter.route("/projects/showProject", sameNameAndAction("showProject"));

FlowRouter.route("/apps", sameNameAndAction("apps"));
FlowRouter.route("/apps/MaastroLungSurvival", {
  action: function() {
    BlazeLayout.render( 'apps', { content: 'MaastroLungSurvival' } );
  },
  name: 'MaastroLungSurvival'
});

FlowRouter.route( "/apps/MaastroRectalModel", {
  action: function() {
    BlazeLayout.render( 'apps', { content: 'MaastroRectalModel' } );
  },
  name: 'MaastroRectalModel'
});

FlowRouter.route("/insights", sameNameAndAction("insights"));
