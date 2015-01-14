/**
 * @module metrica
 * Provide Yandex.Metrika counter
 * global modules:false
 */

modules.define('metrica',['loader_type_js','i-bem__dom'], function(provide,loader, BEM) {

provide(BEM.decl('metrica',{
  'onSetMod':{
    'js':{
      'inited': function(){
        this._id = this.params.id;
        this._webvisor = this.params.webvisor || true;
        this._clickmap = this.params.clickmap || true;
        this._trackLinks = this.params.trackLinks || true;
        this._accurateTrackBounce = this.params.accurateTrackBounce || true;
        this._trackHash = this.params.trackHash || true;
        this._counterParams = this.params.params;

        var that = this;
        //load Yandex.Metrika script
        loader('//mc.yandex.ru/metrika/watch.js', function(){
          that._initCounter.apply(that)
        });

        try{
          //subscribe to mt event 'goal'
          BEM.blocks['mt'].on('goal',function(event, data){
            this.reach(data.name, data.data);
          },this);
        } catch(e) {}
      }
    }
  },

  /**
   * Init Yandex.Metrica counter
   * @private
   */
  _initCounter: function(){
    var counterName = 'yaCounter'+this._id;
    window['counterName'] = this.counter = new Ya.Metrika({
      id:this._id,
      webvisor:this._webvisor,
      clickmap:this._clickmap,
      trackLinks:this._tracklinks,
      accurateTrackBounce:this._accurateTrackBounce,
      params: this._counterParams,
      trackHash:this._trackHash});
  },

  /**
   * Reach Metrika goal
   * @param {string} goal Goal name
   * @param {object} data Addition goal params
   */
  reach:function(goal,data){
    try{
      console.log("reach "+goal);
      this.counter.reachGoal(goal,data);
    }catch(e){
      console.warn(e);
    }
  }
},{
  live: false
}));

});

