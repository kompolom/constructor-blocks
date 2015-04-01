modules.define('form_async',
               ['jquery', 'vow', 'i-bem__dom'],
               function(provide, $, vow, DOM) {

provide(DOM.decl({block:'form', modName:'async', modVal: true}, {
    onSetMod : {
        'js' : {
            'inited' : function() {
                this._errorMsg = this.params.errorMsg || "Очень жаль, но произошла ошибка.";
              
                this.submit = this.findBlockInside({
                  block:'button',
                  modName: 'type',
                  modVal:'submit'
                });
              
                this._url = this.domElem.attr('action');
                this._dataType = 'json';
            }
        },
      'send': {
        'progress' : function(){          
        },        
      }
    },
  
    /**
     * Submit form 
     * @returns {Object} promise
     */
    _send: function(){
      var deferred = vow.defer();
      this.setMod('send', 'progress');
      
        $.ajax({
          context     : this,
          url         : this.getUrl(),
          type        : this._getType(),
          data        : this._getData(),
          dataType    : this._dataType,
          beforeSend  : this._beforeSend,
          error       : function(err){
            this.setMod('send', 'error');
            deferred.reject(err);
          },
          success     : function(res, status, xhr){ 
            this.setMod('send', 'success');
            this._onResponce(res, status, xhr, deferred);
          },
      });
      
      return deferred.promise();
    },
  
    /**
     * Callback на ответ сервера
     * @param {mixed} res server responce
     * @param {string} status server responce text status
     * @param {object} xhr jqXHR 
     * @param {object} deferred promise
     */
    _onResponce: function(res, status, xhr, deferred){
      if (this._checkResErrors(res)){
        this.setMod('status', 'resolved');
        deferred.resolve(res);
      } else {
        this.setMod('status', 'fail');
        deferred.reject(res);
      }
    },

    /**
     * Проверяет статус ответа
     * @returns {boolean} check success
     */
    _checkResErrors: function(res) {
      return true;
    },

    _onSuccess: function(res) {
      this.emit('success', res);
    },

    _onFail: function(res) {
      this.emit('fail', res);
    },
  
  
    /**
     * Public send method
     */
    send: function(){
      this._send().then(
        function(res){this._onSuccess(res)},
        function(res){this._onFail(res)},
        this
      );
    },
    
      
    /**
     * Prepare form data 
     * @returns {string} form Data
     */
    _getData: function(){
      return this.domElem.serialize();
    },
  
  /**
   * Return form method
   * @returns {string} method
   */
  _getType: function(){
    return this.domElem.attr('method');
  },
  
  /**
   * Before send callback
   */
  _beforeSend: function(xhr, settings){},
  
  getUrl: function(){
    return this._url; 
  },
  
  setUrl: function(newUrl){
    this._url = newUrl;
  },
  
  /**
   * Блокирует submit
   */
  lock:function(){
    this.submit.setMod('disabled', true);
  },

  /**
   * Разблокирует submit
   */
  unlock:function(){
    this.submit.delMod('disabled');
  }

},{
  live:function(){
    this.liveBindTo('submit', function(e){
       e.preventDefault();
       this.send();
    });
  }
}));


});
