Meteor.startup(() => {
  //AutoForm.setDefaultTemplate("semanticUI");
  // This assigns a file upload drop zone to some DOM node
  Files.resumable.assignDrop($(".fileDrop"));

  // This assigns a browse action to a DOM node
  Files.resumable.assignBrowse($(".fileBrowse"));

  // When a file is added via drag and drop
  Files.resumable.on('fileAdded', function (file) {

    // Create a new file in the file collection to upload
    Files.insert({
      _id: file.uniqueIdentifier,  // This is the ID resumable will use
      filename: file.fileName,
      contentType: file.file.type
      },
      function (err, _id) {  // Callback to .insert
        if (err) { return console.error("File creation failed!", err); }
        // Once the file exists on the server, start uploading
        Files.resumable.upload();
      }
    );
  });

  // This autorun keeps a cookie up-to-date with the Meteor Auth token
  // of the logged-in user. This is needed so that the read/write allow
  // rules on the server can verify the userId of each HTTP request.
  Deps.autorun(function () {
    // Sending userId prevents a race condition
    Meteor.subscribe('blobs', Meteor.userId());
    // $.cookie() assumes use of "jquery-cookie" Atmosphere package.
    // You can use any other cookie package you may prefer...
    $.cookie('X-Auth-Token', Accounts._storedLoginToken(), { path: '/' });
  });
});

Template.registerHelper("firstGreater", function (first, second) {
  return first > second;
});

Template.registerHelper("concat", function (first, second) {
  return first + second;
});

Template.registerHelper("or", function (first, second) {
  return first || second;
});

Template.registerHelper("threeOr", function (first, second, third) {
  return first || second || third;
});
