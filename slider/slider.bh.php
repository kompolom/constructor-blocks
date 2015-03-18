<?php
return function ($bh) {
 $bh->match("slider", function ($ctx, $json){
   $ctx->js(true);
 });
};
