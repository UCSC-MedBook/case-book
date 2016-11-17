
Picker.route("/genes/",
    function(params, req, res, next) {
  // security
  var query = params.query
  console.log('query', query )
  let { gene_label } = params;
  let gene = Genes.aggregate( [
    {$match: {gene_label: new RegExp('^'+query.q, 'i')}},
    {$project : { id:"$gene_label", text:"$gene_label",_id:0 }}
  ]);
  //let gene = Genes.find(
  //  { "gene_label": new RegExp('^'+query.q, 'i') },
  //  { fields: { gene_label: 1, _id:0 }},
  //  { limit: 1000 }
   //).fetch();
  console.log("server genes query", gene_label, 'returns:', gene)
  if (!gene) {
    return notFound(res);
  }

  res.setHeader("Content-Type", "JSON");
  // don't seem to need Content-Disposition header here
  res.writeHead(200);

  res.end(JSON.stringify({items:gene}));

  return;
});
function permissionDenied (res) {
  res.writeHead(403);
  res.write("Permission denied\n");
  res.end();
  return;
}

function notFound(res) {
    res.writeHead(404);
    res.write('404 Not Found\n');
    res.end();
}
