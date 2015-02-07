<?php
return function ($bh) {
 $bh->match("slider", function ($ctx, $json){
   $ctx
     ->tag('ul')
     ->js(true);
 });
};
