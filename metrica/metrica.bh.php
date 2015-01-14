<?php
return function ($bh) {
 $bh->match("metrica", function ($ctx, $json){
   $id = $json->id;
   $ctx->js([
      'id'        => $json->id,
      'webvisor'  =>$json->webvisor,
      'clickmap'  =>$json->clickmap,
      'trackLinks'=>$json->tracklinks,
      'accurateTrackBounce'=>$json->accurateTrackBounce,
      'trackHash' =>$json->trackHash
   ]);
   $ctx->content("<noscript><div><img src=\"//mc.yandex.ru/watch/$id\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div></noscript>");
 });
};
