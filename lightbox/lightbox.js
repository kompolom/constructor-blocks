modules.define('lightbox',['jquery','fancybox','i-bem__dom'], function(provide,$ ,fancy, DOM) {

provide(DOM.decl('lightbox', {
    onSetMod : {
        'js' : {
            'inited' : function() { 
                
                this.config = this.params.config;
                this.link = this.findBlockOn('link');               
                this.url = this.params.url || this.link.domElem.attr('href');  
            }
        },

    },
    _open:function(){     
      $.fancybox.open(this.url,this.config);
      this.emit('opened');
      return false;
    },
    _close:function(){
      $.fancybox.close();
      this.emit('closed');
    }
    
  },{
    live:function(){
      this.liveBindTo('click',function(){
        this._open();      
        return false;
      })
    }
  } 
  )); 
});
