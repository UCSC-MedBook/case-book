Template.showCase.onCreated(function () {
  const case_instance = this;
  //console.log('onCreated', instance.data);
  //console.log('onCreated id=', instance.data.caseId);
  //instance.subscribe("showCase", instance.data.caseId);
});

Template.showCase.onRendered(function () {
  // $(".ui.dropdown").dropdown();
  $('.open-in-new-window').popup();
  $('.tabular.menu .item').tab();
  let instance = this;
  $createPostForm = instance.$(".new-notebook.ui.form");

});
Template.showCase.helpers({
  getCase: function () {
    return Cases.findOne(this.caseId);
  },
  createDate: function () {
    console.log('helper this',this.createdAt);
    return moment(this.createdAt).format('MMM D, YYYY h:mm a');
  }
});

Template.showCase.events({
  "mouseup .textNorm"(event, instance) {
        var selection;

        if (window.getSelection) {
          selection = window.getSelection();
        } else if (document.selection) {
          selection = document.selection.createRange();
        }
        console.log('selection', selection);
        var parent = selection.anchorNode.parentNode;
        console.log('parentNode', parent);
        //parent.style.backgroundColor = 'yellow';
        //Blaze.render(Template.affordance, parent);
    },
  "click .createPost"(event, instance) {
    var f = $createPostForm.form("get values");
    f.caseId = instance.data.caseId;
    Meteor.call("createPost", f);
    //Meteor.call("createPost", { hi: "yop" });
  }
});
