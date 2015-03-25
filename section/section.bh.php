<?php
return function ($bh) {
 $bh->match("section", function ($ctx, $json) {
   $ctx->tag('section')
     ->attr('id', 'section-'.$ctx->param('name').'-'.$ctx->position())
     ->mod('name', $ctx->param('name'))
     ->applyBase();
 }
);
};
