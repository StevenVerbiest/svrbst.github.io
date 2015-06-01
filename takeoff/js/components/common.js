window.app = window.app || {};

app.common = (function($, undefined) {
  var $document = $(document),
      $window = $(window),
      $html = $('html'),
      $body = $('body');

  var _initialize = function() {
    // First set window size
    this.windowResize();
    $window.on('resize', debounce(app.common.windowResize, 250, false));

    this.svgFallback();
  };

  var _windowResize = function() {
    $.extend(app.variables, {
      windowWidth: $window.width(),
      windowHeight: $window.height()
    });
  };

  var _svgFallback = function() {
    if (!Modernizr.svg) {
      var $html = $('html'),
          $imgs = $('img[src$=".svg"]');

      $imgs.each(function(k,v){
        var $img = $(v),
            fallback = $img.attr('data-url'),
            width = $img.attr('width'),
            height = $img.attr('height');

        $img.attr('src', fallback);
        // IE8 fix
        if ($html.hasClass('lt-ie9')) {
          $img.parent('a').css({ 'width' : width , 'height' : height });
        }
      });
    }
  };

  var _finalize = function() {
    // var doneClass = 'js-done';

    // $window.on('load', function(){
    //   $html.addClass(doneClass);
    // });
    // function delayedJS() {
    //   if(!$html.hasClass(doneClass)) {
    //     $html.addClass(doneClass);
    //   }
    // }
    // window.setTimeout(delayedJS, 4000);
  };

  return {
    init: _initialize,
    windowResize: _windowResize,
    svgFallback: _svgFallback,
    finalize: _finalize
  };

})(jQuery);

// Helper functions for common.js
window.debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
