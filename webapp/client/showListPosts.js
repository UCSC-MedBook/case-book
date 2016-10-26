Template.showListEvidence.onCreated(function () {
  const post_instance = this;
});

Meteor.startup(() => {
  //AutoForm.setDefaultTemplate("semanticUI");
  // This assigns a file upload drop zone to some DOM node
  //myFiles.resumable.assignDrop($(".fileDrop"));

  // This assigns a browse action to a DOM node
  //myFiles.resumable.assignBrowse($(".fileBrowse"));
})
Template.showListEvidence.onRendered(function () {
  let instance = this;
  console.log("RENDERED");
  var content = Posts.find().fetch()
  $('.ui.search')
  .search({
    source : content,
    searchFields   : [
      'title',
      'body',
      'url'
    ],
    searchFullText: true
  });

  // When a file is added via drag and drop
  //myFiles.resumable.on('fileAdded', function (file) {
  //  debugger
  //  console.log('fileadded',file)

    // Create a new file in the file collection to upload
  //  myFiles.insert({
  //    _id: file.uniqueIdentifier,  // This is the ID resumable will use
  //    filename: file.fileName,
  //    contentType: file.file.type
  //    },
  //    function (err, _id) {  // Callback to .insert
  //      if (err) { return console.error("File creation failed!", err); }
  //      // Once the file exists on the server, start uploading
  //      myFiles.resumable.upload();
  //    }
  //  );
  //});
})
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
Template.showListEvidence.helpers({
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

Template.postCard.events({

  "mouseup .textNorm"(event, instance) {
    var selection;

      if (window.getSelection) {
        selection = window.getSelection();
      } else if (document.selection) {
        selection = document.selection.createRange();
      }
      console.log('mouseUp',selection)
      $('.ui.star.rating').rating()
      $('.ui.heart.rating').rating()
      $('.ui.radio.rating').rating()
      var postId = this._id;
      console.log('show insight create', selection.toString(), 'postID:' , postId);
      //instance.text = selection.toString()
      $('#text')[0].value = selection.toString();
      $('.create-insight.ui.modal')
          // .modal({detachable: false})
          .modal('show');
      var parent = selection.anchorNode.parentNode;
      console.log('parent',parent)
  }
});

Template.showListEvidence.events({
  'focus .ccard'( event, instance) {
    console.log('showListEvidence focus')
  },
  'change .ccard'(event, instance) {
    console.log('showListEvidence change')
  },
});

// Template.evidenceCard

Template.postCard.onRendered(function () {
  let instance = this;
  $('.ui.dropdown').dropdown({on: 'hover'})
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
       console.log('update.Post{_id:'+target+'},{$addToSet:{supporting_cards:'+movingItem+'}}')
       Posts.update({
         _id:target
       },{
         $addToSet:{
           supporting_cards:{post_id:movingItem}
         },
         updatedAt: new Date,
       function (err, _id) {  // Callback to .insert
         if (err) { return console.error("Post update failed!", err); }
       }
       })
     }
   });
});
Template.evidenceCard.onRendered(function () {
  let instance = this;

  $(".ccard").draggable({
    revert: true,
    helper:'clone' ,
    //scrollSensitivity: 100,
    scroll: false,
    start: function (event, ui) {
      var movingItem = Blaze.getData(this)._id;
      Session.set('movingItem', movingItem);
    },
    drag: function (event, ui) {
    }
  });
  $(".ccard").on( "dragstart", function( event, ui ) {
    var movingItem = Blaze.getData(this)._id;
    Session.set('movingItem', movingItem);
    console.log('dragstart moving ' + movingItem);
  });
});

Template.postCard.helpers({
  getSupportingEvidence: function() {
    var list = []
    var index;
    var arr = this.supporting_cards;
    if (arr) {
      for (index = 0; index < arr.length; ++index) {
        var pid = arr[index];
        var p = Posts.findOne({_id: pid.post_id},{sort:{updatedAt:-1}});
        list.push(p)
      }
    }
    return list
  }
});
Template.evidenceCard.helpers({
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
});
