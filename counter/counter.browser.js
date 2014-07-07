modules.define('i-bem__dom',['jquery','countdown'], function(provide,$ ,countdown, DOM) {

provide(DOM.decl('counter', {
    onSetMod : {
        'js' : {
            'inited' : function() {
              
              if(this.params.date){
                this.ts = this._setDate();
              }else{
                this.ts = this._tomorrow();
              }              
              this._start();               
            }
        },

    },
    _setDate:function(){
      var d = this.params.date*1000;
      return new Date(d);
    },
    _tomorrow:function(){
      var today= new Date();
      year = today.getFullYear(); month = today.getUTCMonth() ;
      var day = today.getDate()+1; hour= 0; minute= 0; sec= 0;
      return  new Date(year,month,day,hour,minute,sec); 
    },
    _start: function(){
      this.findElem('holder').countdown({timestamp : this.ts}); 
      this.emit('started');
    }
    
    
}));


});