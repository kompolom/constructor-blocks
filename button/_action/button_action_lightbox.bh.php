<?php
return function ($bh) {
 $bh->match("button_action_lightbox", function ($ctx, $json){
   $ctx->applyBase();
   $ctx->mix([
     'block' => 'lightbox',
     'js' => [
        'url' => $ctx->param('url'),
        'config' => $json->config? $ctx->param('config') : ''
     ]
   ],true);
 });
};
