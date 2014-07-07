modules.define('i-bem__dom',['jquery','fancybox'], function(provide,$ ,fancy, DOM) {

provide(DOM.decl('lightbox', {
    onSetMod : {
        'js' : {
            'inited' : function() { 
                
                this.config = this.params.config;
                this.link = this.findBlockOn('link');               
                this.url = this.params.url || this.link.domElem.attr('href');  
                
                this.bindTo('click',this._open,this);
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

    
}));


});