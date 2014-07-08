/* global ym */
modules.define('ymaps', ['loader_type_js'], function(provide, loader) {

var provideYMaps = function() {
    ym.ready(function() {
        provide(ym);
    });
};

typeof ym !== 'undefined' ?
    provideYMaps() :
    loader('//api-maps.yandex.ru/2.1-dev/?coordorder=longlat&ns=ym&lang=ru-RU',
        provideYMaps);
});
