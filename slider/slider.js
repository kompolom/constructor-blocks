modules.define('slider',['i-bem__dom'], function(provide, DOM) {

provide(DOM.decl('slider', {
    onSetMod : {
        'js' : {
            'inited' : function() {                
                this.config = this.params;
            }
        },

    },
    

    
}));


});
