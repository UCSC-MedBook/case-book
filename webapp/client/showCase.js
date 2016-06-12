Template.showCase.onRendered(function () {
  // $(".ui.dropdown").dropdown();
  $('.open-in-new-window').popup();
  $('.tabular.menu .item').tab();
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
        parent.style.backgroundColor = 'yellow';
        Blaze.render(Template.affordance, parent);
    }
  });
