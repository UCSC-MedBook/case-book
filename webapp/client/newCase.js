Template.newCaseModal.onRendered(function() {
  let instance = this;

  instance.$(".ui.checkbox").checkbox();

  $createCaseForm = instance.$(".new-case.ui.form")

  // set up the form in the create-case modal
  $createCaseForm.form({
    fields: {
      firstName: {
        rules: [
          { type: "empty", prompt: "Please enter the patient's first name" }
        ],
      },
      lastName: {
        rules: [
          { type: "empty", prompt: "Please enter the patient's last name" }
        ],
      },
      // caseLabel: {},
      fullNarrative: {
        rules: [
          { type: "empty", prompt: "Please fill in the narrative" },
          {
            type: "minLength[10]",
            prompt: "The case narrative must be at least 10 characters long",
          }
        ],
      }
    }
  });

  // set up the modal but don't show it just yet
  instance.$('.create-case.ui.modal').modal({
    onApprove(clickedElement) {
      if (clickedElement[0].className.indexOf("createCaseAndSearch") !== -1) {
        console.log("need to also do case search");
      }

      // if the form isn't valid, return false to not hide the modal
      if (!$createCaseForm.form("validate form")) {
        return false;
      }

      Meteor.call("createCase", $createCaseForm.form("get values"));
    }
  });
});