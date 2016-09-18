Template.insightModal.onRendered(function() {
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

  $createInsightForm = instance.$(".create-insight.ui.form");

  // set up the form in the create-insight modal
  $createInsightForm.form({
    fields: {
      note: {
        rules: [
          { type: "empty", prompt: "Please enter a note: " }
        ],
      },
    }
  });
  //instance.$(".ui.checkbox").checkbox();
  console.log('create insight modal');
  // set up the modal but don't show it just yet
  instance.$('.create-insight.ui.modal').modal({
    onDeny(clickedElement) {
      console.log("deny", clickedElement);
    },
    onApprove(clickedElement) {
      console.log("onApprove", clickedElement, 'instance.data', instance.data);
      if (clickedElement[0].className.indexOf("createCaseAndSearch") !== -1) {
        console.log("need to also do case search");
      }

      // if the form isn't valid, return false to not hide the modal
      if (!$createInsightForm.form("validate form")) {
        return false;
      }

      var form_vals = $createInsightForm.form("get values");
      console.log('form vals',form_vals)
      if (form_vals.note === 'unk') {
        delete form_vals.note;
      }

      function madlib () {
        // generates CNL
          return(JSON.stringify(values));
      }


      //var parsed = Meteor.call("parseCase", form_vals.fullNarrative);
      console.log('form',form_vals);
      if (typeof post_id === 'undefined') {
        Meteor.call("createInsight", instance.data._id, null, form_vals);
      }
      else {
        Meteor.call("createInsight", instance.data._id, post_id, form_vals);
      }
    }
  }); //.modal("show");
});
