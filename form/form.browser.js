modules.define('i-bem__dom',['jquery','fancybox','BEMHTML'], function(provide,$ , fancybox, BEMHTML, DOM) {

provide(DOM.decl('form', {
    onSetMod : {
        'js' : {
            'inited' : function() {   
               
                this.bindTo('submit', function(e) {   
                    e.preventDefault();
                    this.onSubmit();
                    this.emit('submit');
                });
                this.on('fullFill',this._onFullFill);
                this._msg = {block:'msg'};
                this._errorMsg = this.params.errorMsg || "Очень жаль, но произошла ошибка.";
                this._allowLock = this.params.allowLock||false;
                this.submit = this.findBlockInside('button');
            }
        },
        
    },
    _beforeSend: function(){      
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
    },
    _onSuccess  : function(data){                  
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
              this.fullFill();
            };
            return true;
          },
    _error: function(){
      this.echo(this._errorMsg);
      return true;
    },
    
    onSubmit:function(){
      debugger
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
      if (this._allowLock){
        this.lock();
      }
    },
    lock:function(){     
      this.submit.setMod('disabled',true);
    },
    unlock:function(){
      this.submit.delMod('disabled',true);
    }
    
   

    
}));


});