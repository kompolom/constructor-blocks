module.exports = function(bh) {
    bh.match('section_wrapped', function(ctx, json) {
      ctx.content(
          {
           block : 'container',
           content : ctx.content()
          },
        true);
    });
};
