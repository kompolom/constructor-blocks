<?php
return function ($bh) {
 $bh->match("nav-menu", function ($ctx, $json){
   $ctx
     ->tag('nav')
     ->content([
      'elem'=>'list',
      'content'=> array_map(function($item){
        return [
          'elem'=>'item',
          'content'=>[
            'block'=> 'link',
            'mix' => ['block'=>'nav-menu','elem'=>'link'],
            'url'=> $item['url'],
            'content'=>$item['name']
          ]
        ];
      }, $ctx->param('items'))
     ]);
 });
};
