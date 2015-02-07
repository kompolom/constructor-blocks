<?php
return function ($bh) {
 $bh->match("nav-menu__item", function ($ctx, $json){
   $ctx->tag('li');
 });
};
