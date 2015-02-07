<?php
return function ($bh) {
 $bh->match("section", function ($ctx, $json) {
   $ctx->tag('section')
     ->content([
       'block'=>'container',
       'content'=> $ctx->content()
     ], true)
     ->attr('id', 'section-'.$ctx->param('name'))
     ->mod('name', $ctx->param('name'))
     ->applyBase();
 }
);
};
