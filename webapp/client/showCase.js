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
    // make the dropdowns in the menu work on hover
  $(".ui.menu .ui.dropdown"); //.dropdown({ on: "hover" });
  $(".ui.dropdown").dropdown({on:"hover"});
});
Template.showCaseDetails.helpers({
  getPosts: function () {
    var p = Posts.find({caseId: this._id},{sort:{createdAt:-1}}).fetch();
    console.log('getPosts', p);
    return p;
  },
  getStage: function () {
    if (this.stage) {
      return 'stage ' + this.stage;
    }
    return ;
  },
  getStageColor: function () {
    if (this.stage) {
      if (this.stage == 'IV')
        return 'red';
      if (this.stage == 'III')
        return 'yellow';
      if (this.stage == 'II')
        return 'blue';
      if (this.stage == 'I')
        return 'green';
    }
    return ;
  },
  getAge: function () {
    if (this.age) {
      return this.age + 'yo';
    }
    return;
  },
  getMutations: function () {
    if (this.mutations) {
      return 'Mutations: '+ this.mutations;
    }
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
  isNotInsight: function (post) {
    if (!post.insightStatus) {
      return true;
    }
  },
  isNotApproved: function(post) {
    console.log('insight status', this.insightStatus);
    if (post.insightStatus) {
      console.log('approved',post.insightStatus== 'approved' );
      return post.insightStatus != 'approved';
    }
    else {
      return true;
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
  "click .lung"(event, instance) {
    var cid = this;
    console.log('lung app clicked', cid._id, cid.fev, cid);
    var path="/apps/MaastroLungSurvival?"
    if (cid.gender) {
      var path=path+'g='+cid.gender+'&';
    }
    if (cid.fev) {
      path=path+'f='+cid.fev;
    }
    FlowRouter.go(path);
  },
  "click .rectal"(event, instance) {
    FlowRouter.go("/apps/MaastroRectalModel");
  },
  "click .PatientsLikeMe"(event, instance) {
    FlowRouter.go("/apps/PatientsLikeMe");
  },
  "click .OrderIHC"(event, instance) {
    console.log('event',event);
    FlowRouter.go("/apps/OrderIHC");
  },
  "click .invite"(event, instance) {
    console.log('invite');
    $('.invite.ui.modal')
        // .modal({detachable: false})
        .modal('show');
  }
});
Template.showCaseDetails.events({
  "click .lightswitch"(event, instance) {
    var post = this;
    //console.log('click light', event, post, post._id);
    Meteor.call("createInsight", post._id, post.title);
  },
  "click .lightbulb"(event, instance) {
      var post = this;
      //console.log('click light', event, post, post._id);
      Meteor.call("approveInsight", post._id, post.title);
  },
  "hover .app"(event, instance) {
    var cid = this;
    console.log('menu hover', cid);
  },
  "hover .contact"(event, instance) {
    var cid = this;
    console.log('menu hover', cid);
  }
});
