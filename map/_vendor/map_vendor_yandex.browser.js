modules.define('map',['ymaps','i-bem__dom'], function(provide,ym, DOM) {

    provide(DOM.decl({block:'map',modName:'vendor',modVal:'yandex'}, {
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
