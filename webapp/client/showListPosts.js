Template.showListPosts.onCreated(function () {
  const post_instance = this;
});

Template.showListPosts.onRendered(function () {
  let instance = this;
  console.log('showListPosts.onRendered', Template.showListPosts)
  //if (Template.showListPosts.subscriptionsReady) {
    console.log('showListPosts.draggable')
  //if (Session.get('DATA_LOADED'))

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
        drag: function (event, ui) {
          console.log('drag')
        }
      });
      $( ".ccard" ).on( "dragstart", function( event, ui ) {
          var movingItem = Blaze.getData(this)._id;
          Session.set('movingItem', movingItem);
          console.log('dragstart moving ' + movingItem);

      } );
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
          })
        },
      });


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
Template.showListPosts.helpers({
  getPosts: function () {
    var p = Posts.find({caseId: this._id},{sort:{createdAt:-1}}).fetch();
    return p;
  },
  getFiles: function () {
    var p = Posts.find({caseId: this._id},{sort:{createdAt:-1}}).fetch();
    console.log('getFiles for:',this._id, p)
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
      console.log('get insight status',post.insightStatus);
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

Template.showListPosts.events({
  'focus .ccard'( event, instance) {
    console.log('showListPosts focus')
  },
  'change .ccard'(event, instance) {
    console.log('showListPosts change')
  },
  'mouseenter .ccard'(event, instance) {
    console.log('showListPosts mouseenter')
  },
});
