Template.newPostModal.onRendered(function() {
  let instance = this;

  instance.$(".mutations").dropdown({
    onChange: function(value, text, $selectedItem) {
      console.log("mut", value, text, $selectedItem);
      //var $genelist = $('.genelist2')
      //var mutations = $genelist.select2('val')
      if (value)  {
        instance.mutations = value
      }
      //console.log('mut:', mutations)
    }
  });

  $newPostForm = instance.$(".new-post.ui.form");

  // set up the form in the create-insight modal
  $newPostForm.form({
    fields: {
      body: {
        rules: [
          { type: "empty", prompt: "Please enter a note: " }
        ],
      },
    }
  });
  //instance.$(".ui.checkbox").checkbox();
  console.log('new Post form', $newPostForm);
  // set up the modal but don't show it just yet
  instance.$('.create-post.ui.modal').modal({
    onApprove(clickedElement) {
      console.log("onApprove", clickedElement, 'instance.data', instance.data);

      // if the form isn't valid, return false to not hide the modal
      if (!$newPostForm.form("validate form")) {
        return false;
      }

      var form_vals = $newPostForm.form("get values");
      console.log('form vals',form_vals)
      if (form_vals.note === 'unk') {
        delete form_vals.note;
      }

      function madlib () {
        // generates CNL
          return(JSON.stringify(values));
      }


      //var parsed = Meteor.call("parseCase", form_vals.fullNarrative);
      console.log('case',instance.data._id,'form',form_vals);
      Meteor.call("createPost",form_vals, instance.data._id);
    },
    onDeny(clickedElement) {
      console.log("deny", clickedElement);
    }
  }); //.modal("show");
});

Template.newPostModal.helpers({
  getType: function () {
    $newPostForm = instance.$(".new-post.ui.form");
    var form_vals = $newPostForm.form("get values");

    console.log('getType form:',form_vals)
    return form_vals.title
  }
})
