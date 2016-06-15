Template.showCase.onCreated(function () {
  const instance = this;
  console.log('created', instance.data);
});

Template.showCase.onRendered(function () {
  // $(".ui.dropdown").dropdown();
  $('.open-in-new-window').popup();
  $('.tabular.menu .item').tab();
  console.log('show case', this);
});

Template.showCase.events({
  "mouseup .textNorm"(event, instance) {
        var selection;

        if (window.getSelection) {
          selection = window.getSelection();
        } else if (document.selection) {
          selection = document.selection.createRange();
        }
        console.log('selection', selection);
        var parent = selection.anchorNode.parentNode;
        console.log('parentNode', parent);
        //parent.style.backgroundColor = 'yellow';
        //Blaze.render(Template.affordance, parent);
    },
  "click .createPost"(event, instance) {
    console.log('click', event);
    //Meteor.call("createPost", $createPostForm.form("get values"));
    Meteor.call("createPost", { hi: "yop" });
  }
});
