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
Template.showCaseDetails.onRendered(function () {
  $('.tabular.menu .item').tab();
});
Template.showCaseDetails.helpers({
  getPosts: function () {
    var p = Posts.find({caseId: this._id},{sort:{createdAt:-1}}).fetch();
    console.log('getPosts', p);
    return p;
  },
  createDate: function () {
    return moment(this.createdAt).format('MMM D, YYYY h:mm a');
  }
});
Template.showCase.helpers({
  getCase: function () {
    return Cases.findOne({_id:this.caseId});
  },
  createDate: function () {
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
  }
});
