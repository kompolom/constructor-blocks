module.exports = function(bh) {
  bh.match('form', function(ctx, json) {
    ctx
       .tag('form')
       .attrs({
         'action': ctx.param('action'),
         'id': ctx.param('id'),
         'method': json.method ? ctx.param('method') : 'get'
      });
  });
}
