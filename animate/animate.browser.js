modules.define('animate', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl({block: 'animate'}, {
    onSetMod : {
        'js' : {
            'inited' : function() {
                this._hide = this.params.hide || true; //скрывать блок?
                this.domElem.addClass('scrollspy');
                this.ss = this.findBlockOn('scrollspy');


                if(this._hide){
                  this.hide();
                  this.ss.on('scrollin',this.show,this);                  
                }

                this.setMod('state','ready');
                this.emit('ready');
                this.ss.on('scrollin',this.start,this);                  
                this.ss.on('scrollout',this.stop,this);                  
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
