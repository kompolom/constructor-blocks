/**
 * @module jquery__form 
 * @description Provide  jquery form plugin
  */

modules.define( 'jquery__form', ['jquery','loader_type_js'], function(provide, $, loader) {

var url = 'http://yastatic.net/jquery/form/3.14/jquery.form.min.js';

function doProvide() {provide($);}
    loader(url, doProvide);
});
