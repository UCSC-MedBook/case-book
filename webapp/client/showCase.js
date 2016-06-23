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
  },
  insightStatus: function() {
    var post = this;
    if (post.insightStatus) {
      console.log('post insight',post.insightStatus);
      if (post.insightStatus === 'pending') {
        return "pendingInsight";
      }
      else {
        return "approvedInsight";
      }
    }
    return;
  },
  isApproved: function (post) {
    if (post.insightStatus) {
      console.log('approved',post, post.insightStatus== 'approved' );
      return post.insightStatus === 'approved';
    }
  },
  isPending: function (post) {
    if (post.insightStatus) {
      console.log('pending',post, post.insightStatus == 'pending' );
      return post.insightStatus === 'pending';
    }
  },

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
    var f = instance.$(".new-notebook.ui.form").form("get values");
    console.log(f);
    f.caseId = instance.data.caseId;
    Meteor.call("createPost", f);
  },
});
Template.showCaseDetails.events({
  "click .lightbulb"(event, instance) {
    var post = this;
    //console.log('click light', event, post, post._id);
    Meteor.call("createInsight", post._id, post.title);
  }
});
