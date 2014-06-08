
modules.define('input', ['dom','maskedinput'], function(provide, dom, maskedinput, Input) {

provide(Input.decl({ modName : 'type', modVal : 'tel' }, {
    onSetMod : {
        'js' : {
            'inited' : function() {
                this.__base.apply(this, arguments);                
                this.findElem('control').mask(this.params.mask);
            }
        },

    },

    
}));


});
