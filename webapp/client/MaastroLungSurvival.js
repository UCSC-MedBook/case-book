
Template.MaastroLungSurvival.onCreated(function() {
    Session.set('risk', '');
    Session.set('probability', '');
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
  risk: function () {
    return Session.get('risk');
  },
  prob: function () {
    return Session.get('probability') + ' %';
  }
});
