/* global modules:false */

modules.define('datepicker-ui__locale',['jquery','jquery-ui','datepicker-ui','loader_type_js'], function(provide,$,ui,dp,loader) {
var url = 'http://yandex.st/jquery-ui/1.10.4/i18n/jquery.ui.datepicker-ru.min.js';
jQuery = $;
function doProvide() {    
    provide($);
}
    loader(url, doProvide);

});

