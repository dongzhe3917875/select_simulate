var changeClass = (function() {
  var addClass = function(className) {
    this.classList.add(className);
    return this;
  }

  // removeClass.call($0, "noborder")
  var removeClass = function(className) {
    this.classList.remove(className)
    return this;
  }

  var deepCopy = function(obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== "object") {
      return;
    } else if (window.JSON) {
      var str = JSON.stringify(obj);
      newobj = JSON.parse(str);
    } else {
      for (var item in obj) {
        newobj[item] = typeof obj[item] === "object" ? deepCopy(obj[item]) :
          obj[item];
      }
    }
    return newobj;
  }

  return function(options) {
    var options_value = deepCopy(options);
    for (var item in options) {
      (options[item] && Boolean(addClass.call(this, item))) || (
        removeClass.call(this,
          item))
    }

    function bindObjPropToDomElem(obj, domElem) {
      for (var item in obj) {
        Object.defineProperty(obj, item, {
          set: function(bool) {
            (bool && Boolean(addClass.call(domElem, item))) || (
              removeClass.call(domElem,
                item))
            options_value[item] = bool;
          },
          get: function() {
            return options_value[item]
          }
        });

      }
    }
    bindObjPropToDomElem(options, this);
    return this
  }
})()

exports.default = changeClass
