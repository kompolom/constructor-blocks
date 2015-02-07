<?php
return function ($bh) {
 $bh->match("input__control", function ($ctx, $json){
   $ctx->applyBase()
       ->attr('required', $ctx->tParam('required')? '': null);
 });
};
