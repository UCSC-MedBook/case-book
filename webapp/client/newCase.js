Template.newCaseModal.onRendered(function() {
  let instance = this;

  instance.$(".ui.checkbox").checkbox();
  instance.$(".ui.dropdown.cancer_type").dropdown({
    onChange: function(value, text, $selectedItem) {
      console.log("value:", value);
      console.log("text:", text);
      console.log("$selectedItem:", $selectedItem);
    }
  });

  $createCaseForm = instance.$(".new-case.ui.form");

  // set up the form in the create-case modal
  $createCaseForm.form({
    fields: {
      caseLabel: {
        rules: [
          { type: "empty", prompt: "Please enter the case ID" }
        ],
      },
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
      console.log("onApprove", clickedElement);
      if (clickedElement[0].className.indexOf("createCaseAndSearch") !== -1) {
        console.log("need to also do case search");
      }

      // if the form isn't valid, return false to not hide the modal
      if (!$createCaseForm.form("validate form")) {
        return false;
      }

      var form_vals = $createCaseForm.form("get values");
      Meteor.call("createCase", form_vals);

      var ctype = "nsclc"; // Will get set by a pulldown to one of the ctype template keys.
      var values = {}; // Will eventually have the entered values, or NOT_ENTERED
      var NOT_ENTERED = "*AS_DEFAULT*"; // Symbol meaning that the value was left as default.
      var default_vals = {}; // Holds defaults to check if a change was made

      function initx() {
          var txt = "";
          // Add the standard keys which are the same for every cancer.
          for (var key in standard_keys) {
          	txt = txt + "[" + key + ":" + standard_keys[key] + "]\n"
          	default_vals[key]=standard_keys[key];
          }
          // Now add the ctype-specific keys. Note that these can OVERRIDE the standard ones!
          for (var vtkey in ctype_templates[ctype]) {
          	var dict = subtemplates[vtkey];
          	for (var key in dict) {
        	    txt = txt + "[" + key + ":" + dict[key] + "] ";
        	    default_vals[key]=dict[key];
          	}
          }
          // Finally, put this into the text block.
          //(document.getElementById("text1")).value=txt;
          //console.log(default_vals);

          //this should go in the textarea
          return txt;
      }

      var standard_keys = {"age": "age in month (as 25mo) or years (25yo)",
      		      "height":"As 72in, 6-6, 6'6\", etc."};

      // Each of these is an array of names of subtemplates.
      var ctype_templates = {
          "nsclc": ["Lung", "NSCLC"],
          "Melanoma": ["Race"]
      }

      // Note that these can OVERRIDE the standard keys!
      var subtemplates = {
          "Lung": {
            "lobes":"l/r/both",
        	  "fev": "volume in ml (200ml)"
          },
          "NSCLC": {
            "field1":"field1_description",
            "field2":"field2_description",
          },
          "Race": {
            "race:":"White",
          }
      }

      function xlate(intext) {
          //var intext = (document.getElementById("text1")).value
          var form_values = scrape(intext);
          //(document.getElementById("text1")).value = madlib()+"\n-----------------------\nRaw input:\n"+intext;
          return madlib(form_values);
      }

      // Take the input extracted from the textarea and find all the
      // expected values. (WWW: This does NOT extract the UNEXPECTED
      // values. That has to be in another pass.) This populates the values
      // table by side-effect. Note that it's quite brittle, esp. in terms
      // of erroneous edits or extra spaces, etc.

      function scrape (intext) {
          var values = {};
          for (var key in default_vals) {
          	console.log("key:" + key);
          	var pos = intext.indexOf("["+key+"\:");
          	console.log("pos:" + pos);
          	if (pos > -1) {
          	    var endpos = intext.indexOf("]",pos+1);
          	    console.log("endpos:" + endpos);
          	    if (endpos > -1) { // If we got here we had both a beginning and an end [].
              		var value=intext.substring(2 + key.length + pos,endpos);
              		// console.log("value:" + value);
              		// console.log(key + " = " + pos + ":" + endpos  + "=>" + value);
              		// If the value is NOT the same as the default, set it, otherwise, make it NOT_ENTERED.
              		if (value != default_vals[key]) {
              		    values[key] = value; // Matched! Save the new value.
              		}
              		else {
              		    values[key] = NOT_ENTERED; // NOT Matched! Save our indicator string.
              		}
          	    }
            	}
            }
          return values;
      } //end of scrape function

      function madlib () {
        // generates CNL
          return(JSON.stringify(values));
      }


      //var parsed = Meteor.call("parseCase", form_vals.fullNarrative);
      //console.log('form',form_vals, 'parsed',parsed);
      Meteor.call("createCase", form_vals);
    }
  });
});
