/* global modules:false */
modules.define('i-bem__dom',['jquery','waypoints'], function(provide,$ , wp, DOM) {

provide(DOM.decl('scrollspy', {
    onSetMod : {
        'js' : {
            'inited' : function() { 
              var opts = {};
              opts.offset = this.params.offset||'50%';
              debugger
               $(this.domElem).waypoint(this._onScroll,opts);
               this.bindTo(this.domElem,'scrollin',this._show);
            }
        },
        
    },
    _onScroll:function(dir){      
      $(this).trigger('scrollin',dir);
      
    },
    _show:function(e,dir){
      this.emit('scrollin');
    }
    
    
} 
 ));


});