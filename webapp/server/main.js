Meteor.startup(function()  {
  // code to run on server at startup
  console.log('start');
  Meteor.publish('cases.list', function() {
    var cnt = Cases.find().count();
    console.log('publish ',cnt, 'cases');
    return Cases.find({});
});
  Cases.deny({
  insert:function() { return false; },
  update:function() { return true; },
  remove:function() { return true; }
  });
  Cases.allow({
  insert:function() { return true; },
  update:function() { return false; },
  remove:function() { return false; },
  });
});
