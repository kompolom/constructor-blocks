/* global modules:false */

modules.define('datepicker-ui',['jquery','jquery-ui','loader_type_js'], function(provide,$,ui,loader) {
var url = 'http://yandex.st/jquery-ui/1.10.4/jquery.ui.datepicker.js';
jQuery = $;
function doProvide() {    
    provide($);    
}
    loader(url, doProvide);
    
});

