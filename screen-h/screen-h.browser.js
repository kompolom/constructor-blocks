/* global modules:false */

modules.define('screen-h', ['jquery', 'i-bem__dom'], function(provide, $, BEMDOM) {

provide(BEMDOM.decl({block: 'screen-h'},{
  onSetMod: {
    'js' : {
      'inited': function(){
        this._offset = 0;
        this._setHeight();
        this.bindTo($(window), 'resize', this._setHeight, this);
      }
    }
  },
  _setHeight: function(){
    this.height = $(window).height();
    this.domElem.css('height', this.height - this._offset);
  },
  setOffset: function(newOffset){
    this._offset = newOffset;
    this._setHeight();
  }
}));

});

