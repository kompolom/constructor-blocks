/**
 * @module mt Metrica Target
 * Описывает цель Яндекс.Метрики
 * global modules:false
 */

modules.define('mt',['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl('mt',{
  'onSetMod':{
    'js':{
      'inited':function(){
        this.name = this.params.name;
        this.event = this.params.event || 'click';
        this.bindTo(this.event, this.reach);
      }
    }
  },

  /**
   * Достигнуть цель
   */
  reach: function(){
    this.emit('goal', {name: this.name});
    return true;
  }
},{
  live: false,
}));

});

