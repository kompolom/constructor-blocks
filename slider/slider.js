modules.define('slider',['jquery','bxslider','i-bem__dom'], function(provide,$ ,slider, DOM) {

provide(DOM.decl('slider', {
    onSetMod : {
        'js' : {
            'inited' : function() {                
                this.config = this.params;
                $(this.domElem).bxSlider(this.config);
            }
        },

    },
    

    
}));


});
