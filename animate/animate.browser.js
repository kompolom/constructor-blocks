modules.define('i-bem__dom', function(provide, DOM) {

provide(DOM.decl('animate', {
    onSetMod : {
        'js' : {
            'inited' : function() {
                this._hide = this.params.hide || true; //скрывать блок?
                if(this._hide){
                  this.hide();
                }
                var ss = this.findBlockOn('scrollspy-listener');
                if(ss){
                  this.setMod('state','ready');
                  this.emit('ready');
                  ss.on('scrollin',this.start,this);                  
                  ss.on('scrollout',this.stop,this);                  
                }else{
                  this.setMod('state','ready');
                  this.emit('ready');
                  ss = this.findBlockOutside('scrollspy');
                  this.on('scrollin',this.start);
                  this.on('scrollout',this.stop);
                  this.idx = ss.add_listener(this);    
                  
                }
            }
        },

    },
    beforeSetMod:{
      'state':{
        'started': function(){
          this.show();
          return true;
        }
      }
    },
    
    hide: function(){
      this.setMod('visible','no');
      this.emit('hide');
    },
    show: function(){
      this.setMod('visible','yes'); 
      this.emit('show');
    },
    start: function(){
      this.setMod('state','started');
      this.emit('start');
    },
    stop: function(){      
      this.setMod('state','stopped');
      this.emit('stop');
      if(this._hide){
        this.hide();
      }
    }

    
}));


});