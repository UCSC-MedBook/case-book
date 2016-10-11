Template.inviteModal.onRendered(function () {
  let instance = this
  //console.log('invite2', instance)

  instance.$('.ui.dropdown.project_type').dropdown({
    onChange: function (value, text, $selectedItem) {
      console.log('value:', value)
      console.log('text:', text)
      console.log('$selectedItem:', $selectedItem)
    }
  })

  $inviteForm = instance.$('.invite2.ui.form')

  // set up the form in the create-case modal
  $inviteForm.form({
    fields: {}
  });

  instance.$('.ui.checkbox').checkbox()

  // set up the modal but don't show it just yet
  instance.$('.invite.ui.modal').modal({
    dimmerSettings: {opacity: 0.5},
    onApprove(clickedElement) {
      // if the form isn't valid, return false to not hide the modal
      //if (!$inviteForm.form('validate form')) {
      //  return false
      //}

      var form_vals = $inviteForm.form('get values')
      // temporary *** FIX until we add share button
      console.log('form_vals', form_vals)

      Meteor.call('invite', form_vals)
    }
  }); // .modal("show")
})

Template.inviteModal.helpers({
  getCase() {
    var c = Cases.findOne({})
    return c
  },
  getMyContacts() {
    var c = [
      {name: 'Dr. Phil', email: 'drphil@yalu.edu'},
      {name: 'Dr. Johns', email: 'dr.jones@harvard.edu'}
    ]
    return c
  },
  getRecommendedContacts() {
    var c = [
      {name: 'Dr. Blankenstein', email: 'drBlankenstein@hospital.edu'},
      {name: 'Dr. Lung', email: 'dr.Lung@instiute.edu'}
    ]
    return c
  }
})
