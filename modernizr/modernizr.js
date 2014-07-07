/**
 * @module Modernizr
 * @description Provide Modernizr (load if it does not exist).
 */

modules.define(
    'modernizr',
    ['loader_type_js'],
    function(provide, loader) {

var url = 'http://yandex.st/modernizr/2.7.1/modernizr.min.js';

function doProvide() {    
    provide(Modernizr);
}
typeof Modernizr !== 'undefined'?
    doProvide() :
    loader(url, doProvide);
});