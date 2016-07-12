Template.cases.onCreated(function () {
  let instance = this

  instance.casesQuery = new ReactiveVar({})
  var caseQuery = Session.get('caseQuery')
  console.log('onCreated', caseQuery);
  if (caseQuery == null) {
    console.log('##onCreated, clearing caseQuery', caseQuery)
    Session.set('caseQuery', '')
  }else {
    if (caseQuery.cancer_type) {
      console.log('onCreated cancer type', caseQuery.cancer_type)
    }
  }

  instance.autorun(() => {
    // let query = JSON.parse(JSON.stringify(instance.casesQuery.get()))
    let query = JSON.parse(JSON.stringify(Session.get('caseQuery')))
    instance.subscribe('searchCase', query)
  })
})

Template.cases.onRendered(function () {
  let instance = this

  $('.ui.dropdown').dropdown({on: 'hover'})

  let query = JSON.parse(JSON.stringify(Session.get('caseQuery')))
  console.log('onRendered', query);
  if (!query) {
    query = {}
  }
  if (query.stage) {
    instance.$('.ui.dropdown.stage').dropdown('set exactly', query.stage['$in'])
  }
  // instance.$(".ui.dropdown.stage").dropdown("set exactly", ["II", "0"])
  if (query.cancer_type) {
    instance.$('.ui.dropdown.cancer_type').dropdown('set exactly', query.cancer_type['$in'])
  }
})

Template.cases.rendered = function () {
  var instance = this
  // var TheChart = CurrentChart()
  setTimeout(function () {
    // initializeHtmlElements(TheChart)
    // console.log('init genes', instance)
    initializeJQuerySelect2(instance)
  // initializeJQuerySortable(TheChart)
  }, 1000)
}

Template.cases.helpers({
  getCases() {
    // let query = Template.instance().casesQuery.get()
    let query = JSON.parse(JSON.stringify(Session.get('caseQuery')))
    if (!query) {
      query = {}
    }
    return Cases.find(query)
  }
})

Template.cases.events({
  'click .savesearch'(event, instance) {
    let query = JSON.parse(JSON.stringify(Session.get('caseQuery')))
    console.log('save search', query)
    Meteor.call('createSavedSearch', query)
  },
  'click .go-to-case-page'(event, instance) {
    var c = instance.$('.caseid .selected')
    console.log('show case', c)

    FlowRouter.go('showCase')
  }
})

Template.caseSearchFields.events({
  'change .cancer_type'(event, instance) {
    var val = _.uniq($('.search.cancer_type').dropdown('get value'))
    if (val) {
      val = val.filter(function (x) {
        if (x) {
          return x.length > 1
        }
        return x
      })
    }
    console.log('change cancer_type ', val)

    // let query = instance.casesQuery.get()
    let query = JSON.parse(JSON.stringify(Session.get('caseQuery')))

    if (!val) {
      if (!query.cancer_type) {
        instance.$('.ui.dropdown.cancer_type').dropdown('set exactly', query.cancer_type)
      }
      delete query.cancer_type
    } else {
      // query.cancer_type = val
      if (!query) {
        query = {}
      }
      query.cancer_type = {$in: val}
      if (!val) {
        delete query.cancer_type
      }else {
        if (val && val.length == 0) {
          delete query.cancer_type
        }
      }
    }
    console.log('setting query:', query)
    // HERE you're going to have to not refer to instance but Template.instance().parent()
    Session.set('caseQuery', query)
  // instance.casesQuery.set(query)
  },
  'change .stage'(event, instance) {
    var val = $('.stage').dropdown('get value')
    let query = JSON.parse(JSON.stringify(Session.get('caseQuery')))
    if (!val) {
      delete query.stage
    } else {
      // query.cancer_type = val
      if (!query) {
        query = {}
      }
      query.stage = {$in: val}
    }
    console.log('setting query:', query)
    Session.set('caseQuery', query)
  },
  'change #genelist': function (evt, tmpl) {
    let query = JSON.parse(JSON.stringify(Session.get('caseQuery')))
    var $genelist = $('#genelist')
    var val = $genelist.select2('val')
    console.log('change mut ', val)
    if (!val || val.length == 0) {
      delete query.mutations
    } else {
      // query.cancer_type = val
      if (!query) {
        query = {}
      }
      query.mutations = {$in: val}
    }
    console.log('setting mutation query:', query)
    Session.set('caseQuery', query)
  }
})

function initializeJQuerySelect2 (document) {
  //     $("#additionalQueries").select2( {
  //       placeholder: "type in diease or study name",
  //       allowClear: true
  //     } )

  //     $("#studies").select2( {
  //       placeholder: "Select one or more studies",
  //       allowClear: true
  //     } )

  var $genelist = $('#genelist')
  if (document.genelist)
    $genelist.val(document.genelist.join(' '))
  else
    $genelist.val('')
  var httpGenesUrl = '/genes'
  var httpGeneListPreciseUrl = '/geneListPrecise'
  $genelist.select2({
    initSelection: function (element, callback) {
      var prev = document
      if (prev && prev.genelist)
        callback(prev.genelist.map(function (g) {
          return { id: g, text: g }
        }))
    },
    multiple: true,
    ajax: {
      url: httpGenesUrl,
      dataType: 'json',
      delay: 250,
      data: function (term) {
        var qp = {
          q: term.toUpperCase()
        }
        return qp
      },
      results: function (data, page, query) { return { results: data.items }; },
      cache: true
    },

    tokenizer: function (input, selection, callback) {
      var parts = input.split(/[ ;,\t]/)
        .filter(function (s) { return s && s.length > 1})
        .filter(function (s) { return s.match(/^[a-z0-9]+$/i)})
      if (parts.length == 1) return

      // We only get here on a paste
      // AR, TP53
      HTTP.get(httpGeneListPreciseUrl + '?q=' + parts.join(','), function (error, result) {
        if (error == null)
          try {
            var prevItems = $('#genelist').select2('data')
            var newItems = prevItems.concat(JSON.parse(result.content).items)
            $('#genelist').select2('data', newItems)
          } catch (exc) {}
      })
    },
    escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
    minimumInputLength: 2
  })
  var $genesets = $('#genesets')
  $genesets.select2()
}
