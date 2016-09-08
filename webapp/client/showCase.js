Template.showCase.onCreated(function () {
  const case_instance = this;
});
Template.showCaseDetails.onCreated(function () {
  const post_instance = this;
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
  let instance = this;
  //var options = _.extend( {}, Meteor.Dropzone.options, this.data );
  //Meteor.Dropzone.autoDiscover = false;
  Dropzone.options.uploader = {
    init: function() {
      console.log('upload init');
      this.on("addedfile", function(file) { alert("Added file."); });
    },
    accept: function(file, done) {
      console.log('acccept',file)
    },
    addedfile: function(file) {
      console.log('added:',file)
    }
  };
  var uploader = $('#uploader'); //new Dropzone("#uploader");
  uploader.on("addedfile", function(file) {
    console.log('added 2',file)
    /* Maybe display some more file information on your page */
  });
  console.log('onRendered det', instance);
});
Template.showCaseDetails.helpers({
  getPosts: function () {
    var p = Posts.find({caseId: this._id},{sort:{createdAt:-1}}).fetch();
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
      return post.insightStatus === 'approved';
    }
  },
  isNotInsight: function (post) {
    if (!post.insightStatus) {
      return true;
    }
  },
  isNotApproved: function(post) {
    if (post.insightStatus) {
      return post.insightStatus != 'approved';
    }
    else {
      return true;
    }
  },
  isPending: function (post) {
    if (post.insightStatus) {
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
        //selection.toString() !== '' && alert(' calling modal Insight : "' + selection.toString() + '"       at ' + event.pageX + '/' + event.pageY);
        $('.ui.star.rating').rating()
        $('.ui.heart.rating').rating()
        $('.ui.radio.rating').rating()
        $('.annotate-insight.ui.modal')
            // .modal({detachable: false})
            .modal('show');
        var parent = selection.anchorNode.parentNode;
        parent.style.backgroundColor = 'yellow';
        Blaze.render(Template.affordance, parent);
    },
  "click .createPost"(event, instance) {
    var f = instance.$(".new-notebook.ui.form").form("get values");
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
  "click .createReply"(event, instance) {
    var f = instance.$(".new-reply.ui.form").form("get values");
    console.log("#reply2 detail",f,instance.data)

    f.caseId = instance.data.caseId;
    f.postId = instance.data.postId;
    for (var reply in f) {
      if (f[reply]) {
        if (f[reply].body) {
          console.log('#createReply',f[reply]);
          Meteor.call("createReply", f[reply]);
        }
      }
    }
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
