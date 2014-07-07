/**
 * @module jquery.ui
 * @description Provide jQueryUI core (load if it does not exist).
 */

modules.define(
    'jquery-ui',
    ['jquery','loader_type_js'],
    function(provide, $, loader) {
     
      jQuery = $;
/* global jQuery */
var url = 'http://yandex.st/jquery-ui/1.10.4/jquery.ui.core.js';
function doProvide() {
    /**
     * @exports
     * @type Function     */
   
    provide($);
}
    loader(url, doProvide);
});
