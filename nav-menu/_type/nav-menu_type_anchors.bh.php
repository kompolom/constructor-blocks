<?php
return function ($bh) {
 $bh->match("nav-menu_type_anchors", function ($ctx, $json){
   $ctx
     ->js(true)
     ->content([
      'elem'=>'list',
      'content'=> array_map(function($item){
        return [
          'elem'=>'item',
          'content'=>[
            'block'=> 'link',
            'mods' => ['pseudo' => true],
            'mix' => ['block'=>'nav-menu','elem'=>'link'],
            'url'=> $item['url'],
            'content'=>$item['name']
          ]
        ];
      }, $ctx->param('items'))
     ]);
 });
};
