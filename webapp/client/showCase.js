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
        selection.toString() !== '' && alert(' Insignt created: "' + selection.toString() + '"       at ' + event.pageX + '/' + event.pageY);
        parent.style.backgroundColor = 'yellow';
        //var affordance = '<button class="ui icon button"> <i class="cloud icon"></i> </button>';
        Blaze.render(Template.affordance, parent);
        //, Template.showCase);
    }
  });
