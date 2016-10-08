var changeClass = require('./protoChangeClass').default;

var proto_select_simulate = (() => {
  var select_map;
  var select_all_nodes = [];
  var documentEvent = false;

  function heightSlide(node, status) {
    var height = 0;
    if (status) {
      Array.prototype.slice.call(node.childNodes).forEach((child) => {
        if (child.nodeType === 1) {
          var oStyle = window.getComputedStyle(child);
          height = height + child.clientHeight + (parseInt(
              oStyle.borderTopWidth) ||
            0) + (parseInt(oStyle.borderBottomWidth) || 0);
        }
      });
      height = height - parseInt(1) + "px";
    }
    node.style.height = height;
  }

  function specifiedParentsNode(node, selector) {
    while (!node.classList.contains(selector)) {
      node = node.parentNode;
    }
    return node;
  }
  var oManager = {
    setMapBindClass(node, obj) {
        var status = !select_map.has(node);
        if (status) {
          select_map.set(node, obj)
          changeClass.call(node, this.getNodeofMap(node));
        }
        return status;
      },
      getNodeofMap(node) {
        return select_map.get(node);
      },
      getStatus(node, className) {
        return select_map.get(node)[className];
      },
      setStatus(node, className, bool) {
        select_map.get(node)[className] = bool;
      },
      reverseStatus(node, className) {
        this.getNodeofMap(node)[className] = !this.getNodeofMap(node)[
          className]
      },
      getDomArray(nodes) {
        return Array.prototype.slice.call(nodes);
      },
      slideUp(node) {
        var show_select_node = node.previousSibling;
        if (select_map.has(node)) {
          this.setStatus(node, "hide_select", true);
        }

        if (select_map.has(show_select_node)) {
          this.setStatus(show_select_node, "noborder", false);
        }

        heightSlide(node, false);
      }
  }
  return function(options) {
    select_map = options.select_map || new WeakMap();
    var show_select = this.querySelectorAll(".show_select");
    select_all_nodes.push(this.querySelector(".select_all"));
    // var select_all_nodes = this.querySelectorAll(".select_all");
    var select_item = "select_item"
    var imitate_select = this;
    var select_all_array = oManager.getDomArray(select_all_nodes);
    // console.log(select_all_array)
    var show_select_array = oManager.getDomArray(show_select);
    show_select_array.forEach((ele) => {
      ele.addEventListener("click", function(event) {
        event.stopPropagation();
        oManager.setMapBindClass(this, {
          "noborder": false
        })
        var select_all_node = this.nextSibling;
        if (!oManager.setMapBindClass(select_all_node, {
            "hide_select": false
          })) {
          oManager.reverseStatus(select_all_node, "hide_select");
        }
        heightSlide(select_all_node, !oManager.getStatus(
          select_all_node, "hide_select"))

        oManager.reverseStatus(this, "noborder");
        var select_all_array = oManager.getDomArray(
          select_all_nodes);
        select_all_array.forEach((ele) => {
          if (ele != select_all_node) {
            oManager.slideUp(ele);
          }
        })
      })
    })

    if (!documentEvent) {
      document.addEventListener("click", function(event) {
        var select_all_array = oManager.getDomArray(select_all_nodes);
        select_all_array.forEach((ele) => oManager.slideUp(ele))
      })
      documentEvent = true;
    }


    this.addEventListener("click", function(event) {

      if (event.target.classList.contains(select_item)) {
        event.stopPropagation();
        var select_value = event.target.textContent;
        var show_item = specifiedParentsNode(event.target,
          "imitate_select").querySelector(".show_item");
        var select_all_node = event.target.parentNode;
        show_item.textContent = select_value
        oManager.slideUp(select_all_node);
      }
    })
  }
})()
exports.proto_select_simulate = proto_select_simulate;
