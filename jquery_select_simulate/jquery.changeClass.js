$.fn.changeClass = function(options) {
  var $this = $(this);
  var default_option = {

  };
  var options_value = $.extend(true, {}, options);
  for (var item in options) {
    (options[item] && Boolean($this.addClass(item))) || ($this.removeClass(
      item))
  }

  function bindObjPropToDomElem(obj, domElem) {
    for (var item in obj) {
      Object.defineProperty(obj, item, {
        set: function(bool) {
          (bool && Boolean(domElem.addClass(item))) || (domElem.removeClass(
            item))
          options_value[item] = bool;
        },
        get: function() {
          return options_value[item]
        }
      });

    }
  }
  bindObjPropToDomElem(options, $this);
  return $this
}
