modules.define('i-bem__dom',['ymaps'], function(provide,ym, DOM) {

    provide(DOM.decl('map', {
        onSetMod : {
            js : {
                inited : function() {
                    this.map = new ym.Map(this.domElem.get(0), {
                        center : this.params.center ,
                        zoom : this.params.zoom ||12,
                        controls:this.params.controls||[],                       
                    });
                   // map.controls.add('routeEditor');                    
                    if(this.params.mark){                      
                      var mark = new ym.Placemark(this.params.mark);
                      this.map.geoObjects.add(mark);
                    }
                    debugger
                    if(this.params.disable){
                      this._disableBehaviors(this.params.disable);
                    }
                }
            }
        },
        _disableBehaviors:function(behaviors){
          this.map.behaviors.disable(behaviors);
        }
    }));

});
