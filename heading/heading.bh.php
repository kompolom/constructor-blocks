<?php
return function ($bh) {
 $bh->match("heading", function ($ctx, $json){
   if($ctx->param('lvl')){
     $ctx->tag('h'.$ctx->param('lvl'))
         ->mod('lvl',$ctx->param('lvl'));
   }
 });
};
