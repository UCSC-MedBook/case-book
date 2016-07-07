Meteor.startup(function() {
  if (Cases.find().count() === 0) {
    let newCases = [
      {"age":71,"gender":"male","gleasonScore":8,"mutations":['PTEN','TP53'],"cancer_type":"Lung","stage":"IV","caseLabel":"random-001"},
    ];

    _.each(newCases, (c) => { Cases.insert(c); });
  };
  Accounts.config({
    forbidClientAccountCreation : false
  });
});
