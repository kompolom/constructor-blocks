<?php
return function ($bh) {
 $bh->match("video_vendor_youtube", function ($ctx, $json){
   $ctx->tag('iframe')
       ->attr('src','//www.youtube.com/embed/'.$ctx->param('id').'?rel=0&showinfo=0&fs=0&fmt=22&controls=0')
       ->attr('frameborder',0)
       ->attr('width','100%')
       ->attr('height','100%');
 });
};
