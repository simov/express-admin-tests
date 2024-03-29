
var shortid = require('shortid')


exports.preSave = (req, res, args, next) => {
  if (args.debug) console.log('preSave')

  var match = args.name.match(/(tbl)/)
  if (match && args.action == 'insert') {
    var table = match[1]
    var record = args.data.view[table].records[0].columns
    record.id = shortid.generate()
  }

  if (args.name == 'tbl') {
    for (var name in args.data.manyToOne) {
      var table = args.data.manyToOne[name]
      if (!table.records) continue
      for (var i=0; i < table.records.length; i++) {
        if (table.records[i].insert != 'true') continue
        table.records[i].columns.id = shortid.generate()
      }
    }
  }

  next()
}

exports.postSave = (req, res, args, next) => {
  if (args.debug) console.log('postSave')
  next()
}
