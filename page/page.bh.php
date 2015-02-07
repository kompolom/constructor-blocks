<?php
return function ($bh) {
 $bh->match("page", function ($ctx, $json){
   $ctx->content([
     'elem'=>'wrapper',
     'content'=>$ctx->content()
   ], true);
 });
};
