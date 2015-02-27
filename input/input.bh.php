<?php
return function ($bh) {
 $bh->match("input", function ($ctx, $json){
   $ctx->mods([
     'type' => $ctx->param('type'),
     'required' => $json->required? true : false,
     ]);
   if ($ctx->param('required')){
    $ctx->tParam('required', 'required');
    $ctx->applyBase();
   }
 });
};
