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
  console.log('showCase.onRendered')
});
Template.showCaseDetails.onRendered(function () {
  //if (Template.showCaseDetails.subscriptionsReady) {
  //if (Session.get('DATA_LOADED')) {

      $(".ccard").draggable({
        revert: true,
        helper:'clone' ,
        //scrollSensitivity: 100,
        scroll: false,
        start: function (event, ui) {
          var movingItem = Blaze.getData(this)._id;
          Session.set('movingItem', movingItem);
          console.log('moving ' + movingItem);
        },
      });
      $(".postcard").droppable({
        stop: function (event, ui) {
          //var movingItem = Blaze.getData(this)._id;
          var movingItem = Session.get('movingItem');
          console.log('stop' +movingItem)
        },
        drop: function (event, ui) {
          var movingItem = Session.get('movingItem');
          var target = Blaze.getData(this)._id;
          console.log('drop ' +movingItem+' on to _id '+target)
          console.log('update.Post{_id:'+target+'},{$set:{url:'+movingItem+'}}')
          Posts.update({
            _id:target
          },{
            $set:{
              url:movingItem
            },
          function (err, _id) {  // Callback to .insert
            if (err) { return console.error("Post update failed!", err); }
          }
        });
        },
      });

    tinymce.init({
    selector: '.reply-fancy',
    skin_url: '/packages/teamon_tinymce/skins/lightgray',
    menubar: false,
    //plugins: 'image',
    toolbar: 'insertfile undo, redo | styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | outdent indent',
    //toolbar: 'undo redo | styleselect | bold italic | link image',
  });

  console.log('showCaseDetails.onRendered')
  $('.tabular.menu .item').tab();
    // make the dropdowns in the menu work on hover
  //$(".ui.dropdown"); //.dropdown({ on: "hover" });
  //$(".ui.dropdown").dropdown({on:"hover"});
  let instance = this;
  //var options = _.extend( {}, Meteor.Dropzone.options, this.data );
  //Meteor.Dropzone.autoDiscover = false;

  //Dropzone.options.uploader = {
  //  init: function() {
  //    console.log('upload init');
  //    this.on("addedfile", function(file) { alert("Added file."); });
  //  },
  //  accept: function(file, done) {
  //    console.log('accept',file)
  //  },
  //  addedfile: function(file) {
  //    console.log('added:',file)
  //  }
  //};
  //var uploader = $('#uploader'); //new Dropzone("#uploader");
  //uploader.on("addedfile", function(file) {
//    console.log('added 2',file)
    /* Maybe display some more file information on your page */
  //});
});
Template.showCaseDetails.helpers({
  getPosts: function () {
    var p = Posts.find({caseId: this._id},{sort:{createdAt:-1}}).fetch();
    return p;
  },
  getFiles: function () {
    var p = Posts.find({caseId: this._id},{sort:{createdAt:-1}}).fetch();
    return p;
  },
  getTitle: function() {
    return "Discussion From Tumor Board"
    //return this.body.substring(0,100)
  },
  getBody: function() {
    if (this.body && this.body.length > 2)
      return this.body;
    else
      return false;
  },
  getUrl: function() {
    if (this.url)
      return 'URL: '+this.url;
    else
      return false;
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
      return this.mutations;
    }
  },
  createDate: function () {
    return moment(this.createdAt).format('MMM D, YYYY h:mm a');
  },
  insightStatus: function() {
    var post = this;
    if (post.insightStatus) {
      //console.log('get insight status',post.insightStatus);
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
  //"mouseup .textNorm"(event, instance) {
  //      var selection;
//
//        if (window.getSelection) {
//          selection = window.getSelection();
//        } else if (document.selection) {
//          selection = document.selection.createRange();
//        }
//        //selection.toString() !== '' && alert(' calling modal Insight : "' + selection.toString() + '"       at ' + event.pageX + '/' + event.pageY);
//        $('.ui.star.rating').rating()
//        $('.ui.heart.rating').rating()
//        $('.ui.radio.rating').rating()
//        var postId = this._id;
//        //console.log('show insight create', selection.toString(), 'postID:' , postId);
//        //instance.text = selection.toString()
//        $('#text')[0].value = selection.toString();
//        //$('.create-insight.ui.modal')
//            // .modal({detachable: false})
//        //    .modal('show');
//        var parent = selection.anchorNode.parentNode;
//        console.log('parent',parent)
//        //parent.style.backgroundColor = 'yellow';
//        //Blaze.render(Template.affordance, parent);
//    },
  "click .blankPost"(event, instance) {
    console.log('blank Post');
    $('.create-post.ui.modal')  //.modal({
      //dimmerSettings: { opacity: 0.1 },
      //onApprove: this.ok,
      //closable: false,
      //position: 'bottom right',
      //detachable: false
    //})
    .modal('setting','closable', false).modal('show');
  },
  //"click .createPost"(event, instance) {
  //  var f = instance.$(".new-notebook.ui.form").form("get values");
  //  f.caseId = instance.data.caseId;
  //  Meteor.call("createPost", f);
  //},
  'change .search.posts'(event, instance) {
    var val = _.uniq($('.search.posts'))
    if (val) {
      console.log('search',val)
    }
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
    Meteor.call("createInsight", post.castId, post._id, post.title);
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
