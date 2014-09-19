/* global modules:false */
modules.define('scrollspy',['i-bem__dom','jquery','functions__throttle'], function(provide, DOM, $, throttle) {

provide(DOM.decl('scrollspy', {
    onSetMod : {
        'js' : {
            'inited' : function() {  
              //debugger
              this.offset = this.params.offset || '30%'; //отступ
              this.pause = this.params.pause || 300; //минимальный интервал срабатываний {ms} 
              this.root = this.params.root || $(window); //Элемент скролл которого слушается
              this._oldScroll = 0; //позиция предыдущего скролла
              this._forward = 'down';
              this._backward = 'up';
              this.listeners = []; //блоки которые нужно оповестить              
              this.offsets = []; //позиции блоков
              this._scroll = this.root.scrollTop();   
              this._calc_offsets();
              this._set_direction();
              
              var listeners = [];//this.findBlocksInside('scrollspy-listener');
              for (var i=0; i <listeners.length;i++){
                this.add_listener(listeners[i]);
              }
               //bind to scroll event
               this.bindTo(this.root,'scroll',throttle(this._onScroll,this.pause,this));
               this.bindTo(this.root,'resize',throttle(this._calc_offsets,1500,this));
               //смотрим, нет ли елементов в фокусе
               this._onScrollIn();               
            }
        },
        
    },
    /**
     * Adds Scroll listener
     * @param {object} block BEM block
     * @param {object} params
     * @returns {int} blockIndex
     */
    add_listener:function(block){
      
      var offset = this._get_offset(block.params.offset || this.offset);
      var position = block.domElem.offset();
      
      block.top = position.top ; //верхняя граница
      block.bottom = position.top + block.domElem.height(); //нижняя граница 
      block.height = block.domElem.height();
      block.offset = offset;
                
      this.listeners.push(block);
      this._onScrollIn();    
      
      return this.listeners.length-1;
    },
    _calc_offsets:function(){
      this.height = this.root.height(); 
      this.offset = this._get_offset(this.offset);      
    },
    del_listener: function(idx){
      delete this.listeners[idx];
      delete this.offsets.top[idx];
      delete this.offsets.bottom[idx];
    },
    /**
     * Рассчитывает отступ
     * @param {int|string} offset
     * @returns {int} offset in px
     */
    _get_offset: function(offset){
      if(typeof offset === 'string'){       
        off = parseFloat(offset);
        if (offset.indexOf('%') > -1) {
          return Math.ceil(this.height * off / 100);
        }
        return off;
      }
      return offset;
    },
    _onScroll:function(dir){      
      this._scroll = scroll = this.root.scrollTop();
      this._set_direction();
      this._onScrollIn();
      this._oldScroll = this._scroll;      
    },    
    /**
     * Выполняется, при каждом скролле
     * @returns void
     */
    _onScrollIn: function(){
      var top = this._scroll;
      for (var i in this.listeners){
        var block = this.listeners[i];
        if(this._isForward){          
        if ((block.top + block.offset <= top+this.height) && (block.bottom >= top)){
          this._activate_block(block);          
        }else{
          this._deactivate_block(block);          
        }
      }else{//backward
       
        if (block.bottom - block.offset >= top && block.top <= top+this.height){
          this._activate_block(block,i);          
        }else{
          this._deactivate_block(block,i);         
        }
      }//end backward      
      
      }
      
    },
    _set_direction:function(){
      this._isForward = this._oldScroll < this._scroll;
      this.direction = this._isForward ? this._forward : this._backward;
    },
    _activate_block: function(block){
      if(block.scrollin){return false}
        block.emit('scrollin');
        block.scrollin = true;
        block.setMod('scrollin',true);
        return true;
    },
    _deactivate_block: function(block){
      if(!block.scrollin){return false}
        block.emit('scrollout');
        block.scrollin = false;    
        block.delMod('scrollin');
        return true;
    },
    
    
    
    
} 
 ));


});
