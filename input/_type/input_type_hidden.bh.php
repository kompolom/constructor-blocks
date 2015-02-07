<?php
return function ($bh) {
 $bh->match("input_type_hidden", function ($ctx, $json){
   return [
     'tag'=>'input',
     'attrs'=>['name'=>$ctx->param('name'),'type'=>'hidden', 'value'=> $ctx->param('value')]
   ];
 });
};
