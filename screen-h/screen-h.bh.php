<?php
return function ($bh) {
 $bh->match("screen-h", function ($ctx, $json){
   $ctx->js(true);
 });
};
