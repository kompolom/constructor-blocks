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
  
  /*===================================================*/
  
    /**
     * Действия перед отправкой формы
     */
    /*_beforeSend: function(){
      if (this.params.answer){
        this.target = this.findElem(this.params.answer);
        this._msg.mods = {inline:true};
      }else{
        debugger
        var respondCtx = {
          block:'respond',
          mix:{block:'form',elem:'respond'},
        };
        
        //$('body').append('<div id="respond" class="respond"><span class="spin spin_size_xl spin_theme_normal spin_progress"></span></div>');
        var el = DOM.append(this.domElem, BEMHTML.apply(respondCtx));
        this.target = el;
        this.target.bind('hasError',function(){
          $.fancybox.close();
        });
        $.fancybox.open(this.target,{
          minWidth:'200px',minHeight:'100px',padding:0,
        });
      }
      
      var spin = {block:'spin',mods:{size:'xl',theme:'normal',progress:true}};
      this.spin = DOM.update(this.target, BEMHTML.apply(spin));
    },*/
  
    /*_onSuccess  : function(data){
            var response = JSON.parse(data);
            if (response.errors){
              var errors = response.errors;
              this.target.trigger('hasError');
              console.log(errors);

              for(formid in errors){
                for(field in errors[formid]){
                  var msg = errors[formid][field];
                  var $input = $(this.domElem[0]).find('input[name='+field+']');
                  $input.after('<label class="error">'+msg+'</label>');
                  $input.one('focus',function(e){
                    $(this).next('.error').remove();
                  });
                }
              }
            };//error
            if (response.msg){
              this.echo(response.msg);
            };
            if (response.status ==='success'){
              this.fullFill();
            }
            if(response.redirect){
              window.location = response.redirect;
            }
            return true;
          },
    [>*
     * Send error
     * @returns {Boolean} 
     <]
    _error: function(){
      this.echo(this._errorMsg);
      return true;
    },

    [>*
     * On form submit callback
     <]
    onSubmit:function(){
      debugger
      this.emit('submit');
      var form = $(this.domElem[0]);
      var action = form.attr('action');
      var type = form.attr('method') ||'POST';
      var data= form.serialize();
      data +='&isAjax=1';
        $.ajax({
          context     : this,
          url         :   action,
          type        :   type,
          data        :   data,
          beforeSend  :   this._beforeSend,
          error       :   this._error,
          success     :   this._onSuccess,
      });
    },//submit
  
  
    addInput:function(name ,val, mods){
      debugger
      var newctx = {
        block:'input',
        name:name,
        val:val,
        mods:{type:'hidden',name:name}
      }
      var input = this.findBlockInside({block:'input',modName:'name',modVal:name});
      if (input){
        DOM.update(input.domElem, BEMHTML.apply(newctx));
      }else{
        DOM.append(this.domElem, BEMHTML.apply(newctx));
      }
    },
  
  
    echo: function(content){
      this._msg.content = content;
      DOM.update(this.target,BEMHTML.apply(this._msg));
      $.fancybox.update();
    },
  
  
    fullFill:function(){
      this._fullFill = true;
      this.emit('fullFill');
    },
  
  
    _onFullFill:function(){
      if(this.params.goal){
        try{
          debugger
          window.counter.reachGoal(this.params.goal);
        }catch(e){
          console.warn(e);
        }
      }
      if (this._allowLock){
        this.lock();
      }
    },*/

},{
  live:function(){
    this.liveBindTo('submit', function(e){
       e.preventDefault();
       this.send();
    });
  }
}));


});
