Template.insightEditModal.onRendered(function() {
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

  $annotateInsightForm = instance.$(".annotate-insight.ui.modal");

  // set up the form in the annotate-insight modal
  $annotateInsightForm.form({
    fields: {
      note: {
        rules: [
          { type: "empty", prompt: "Please enter a note " }
        ],
      },
    }
  });
  //instance.$(".ui.checkbox").checkbox();
  console.log('Edit insight modal');
  // set up the modal but don't show it just yet
  instance.$('.annotate-insight.ui.modal').modal({
    onDeny(clickedElement) {
    },
    onApprove(clickedElement) {
      console.log("onApprove", clickedElement);
      if (clickedElement[0].className.indexOf("createCaseAndSearch") !== -1) {
        console.log("need to also do case search");
      }

      // if the form isn't valid, return false to not hide the modal
      if (!$annotateInsightForm.form("validate form")) {
        return false;
      }

      var form_vals = $annotateInsightForm.form("get values");
      if (form_vals.note === 'unk') {
        delete form_vals.note;
      }

      function madlib () {
        // generates CNL
          return(JSON.stringify(values));
      }


      //var parsed = Meteor.call("parseCase", form_vals.fullNarrative);
      console.log('form',form_vals);
      Meteor.call("updateInsight", "nFGQ2CWE79y6LeTB7", form_vals);
    }
  }); //.modal("show");
});
