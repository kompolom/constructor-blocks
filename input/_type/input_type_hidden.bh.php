<?php
return function ($bh) {
 $bh->match("input_type_hidden", function ($ctx, $json){
   $ctx
     ->tag('input')
     ->bem(false)
     ->attrs([
       'name'=>$ctx->param('name'),
       'type'=>'hidden',
       'value'=> $ctx->param('val')
   ]);
 });
};
