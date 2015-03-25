/* global modules:false */

modules.define('nav-menu_type_anchors',
               ['jquery','i-bem__dom'],
               function(provide, $, BEMDOM) {

provide(BEMDOM.decl({block:'nav-menu', modName: 'type', modVal: 'anchors'},{
  'onSetMod': {
    'js': {
      'inited': function(){
        this.speed = this.params.speed || 800;
        this.easing = this.params.easing || 'swing';
        BEMDOM.blocks['link'].on(this.domElem,'click', this.scrollto, this);
        this._calcOffset();
      }
    }
  },
  
  /**
   * Scroll page to link anchors
   * @param {object} BEM event object
   * @returns {bool} false
   */
  scrollto: function(e){
    var url = e.target.getUrl();
    var to = $(url).offset().top - this.offset;
    $('html, body').animate({scrollTop: to}, this.speed, this.easing);
    return false;
  },
  
  /**
   * Calculate menu offset
   * @returns {int} offset
   */
  _calcOffset: function(){
    this.offset = this.params.offset || 0;
    return this.offset;
  }
},{
  live: function(){
    return false;
  }
}));

});

