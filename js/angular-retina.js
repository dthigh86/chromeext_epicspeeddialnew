/*! angular-retina - v0.3.0 - 2014-02-17
* https://github.com/jrief/angular-retina
* Copyright (c) 2014 Jacob Rief; Licensed MIT */
!function(a){"use strict";var b="@2x",c=a.module("ngRetina",[]).config(["$provide",function(a){a.decorator("ngSrcDirective",["$delegate",function(a){return a[0].compile=function(){},a}])}]);c.provider("ngRetina",function(){this.setInfix=function(a){b=a},this.$get=a.noop}),c.directive("ngSrc",["$window","$http",function(a,c){function d(a){var c=a.split(".");return c.length<2?a:(c[c.length-2]+=b,c.join("."))}var e=parseInt((/msie (\d+)/.exec(a.navigator.userAgent.toLowerCase())||[])[1],10),f=function(){var b="(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";return a.devicePixelRatio>1?!0:a.matchMedia&&a.matchMedia(b).matches}();return function(b,g,h){function i(a){h.$set("src",a),e&&g.prop("src",a)}function j(b){var e=a.sessionStorage.getItem(b);e?i(e):(e=d(b),c.head(e).success(function(){i(e),a.sessionStorage.setItem(b,e)}).error(function(){i(b),a.sessionStorage.setItem(b,b)}))}h.$observe("ngSrc",function(b){b&&(f&&"object"==typeof a.sessionStorage?j(b):i(b))})}}])}(window.angular);