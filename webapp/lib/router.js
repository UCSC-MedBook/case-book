function defaultAction(templateName, params) {
  // renders appBody with templateName inside
  BlazeLayout.render("appBody", { content: templateName, params });
}

function sameNameAndAction(name) {
  return { name, action: _.partial(defaultAction, name) };
}

FlowRouter.route("/", sameNameAndAction("home"));

FlowRouter.route("/projects", sameNameAndAction("projects"));

FlowRouter.route("/cases", sameNameAndAction("cases"));

FlowRouter.route("/showCase", sameNameAndAction("showCase"));

FlowRouter.route("/projects/showProject", sameNameAndAction("showProject"));

FlowRouter.route("/apps", sameNameAndAction("apps"));

FlowRouter.route("/insights", sameNameAndAction("insights"));
