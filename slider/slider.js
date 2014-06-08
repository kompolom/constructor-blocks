modules.define('i-bem__dom',['jquery','bxslider'], function(provide,$ ,slider, DOM) {

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