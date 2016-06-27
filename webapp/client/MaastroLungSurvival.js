
Template.MaastroLungSurvival.onCreated(function() {
    let instance = this;
    console.log('created lung',instance);
    Session.set('risk', '');
    Session.set('probability', '');
    instance.risk = new ReactiveVar('');
    instance.probability = new ReactiveVar('');
});

Template.MaastroLungSurvival.events({
  "click .calcModel"(event, instance) {
    createModelForm = instance.$(".new-model.ui.form");
    var f = instance.$(".new-model.ui.form").form("get values");
    var risk = lung_survival(f.Gender, f.WHO, f.FEV, f.GTV, f.LymphNod);
    Session.set('risk', risk.risk) ;
    Session.set('probability', risk.probability) ;
    console.log('calc',  'form', f, 'returns ', risk);
  },
});
Template.MaastroLungSurvival.helpers({
  getGender: function(){
    var current = FlowRouter.current();
    console.log('current', current);
    console.log('route g', current.queryParams.g);
    return current.queryParams.g;
  },
  getFev: function(){
    var current = FlowRouter.current();
    console.log('current', current);
    return current.queryParams.f;
  },
  checkIfMale: function(){
    var current = FlowRouter.current();
    console.log('check if male', current.queryParams.g);
    if (current.queryParams.g == "male") {
      return "checked";
    }
  },
  checkIffemale: function(){
    var current = FlowRouter.current();
    if (current.queryParams.g == "female") {
      return "checked";
    }
  },
  risk: function () {
    return Session.get('risk');
  },
  prob: function () {
    return Session.get('probability') + ' %';
  }
});
