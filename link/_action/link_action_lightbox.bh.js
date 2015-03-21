
module.exports = function(bh) {

    bh.match('link_action_lightbox', function(ctx, json) {
      ctx.
        mix({
          block: 'lightbox',
          js: {config: json.config || ''}
      }, true);
        
    });

};
