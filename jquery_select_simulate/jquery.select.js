require("./jquery.changeClass.js");
$.fn.select = function(options) {
  var default_option = {
    select_map: new WeakMap()
  };
  var options = $.extend(true, {}, default_option, options);
  var select_map = options.select_map;
  var select_all_nodes = [];
  var documentEvent = false;
  // 根据节点计算高度
  function heightSlide(node, status) {
    var height = 0;
    if (status) {
      Array.prototype.slice.call(node.childNodes).forEach(function(child) {
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
  var oManager = {
    setMapBindClass: function(node, obj) {
      var status = !select_map.has(node);
      if (status) {
        select_map.set(node, obj)
        $(node).changeClass(this.getNodeofMap(node));
      }
      return status;
    },
    getNodeofMap: function(node) {
      return select_map.get(node);
    },
    getStatus: function(node, className) {
      return select_map.get(node)[className];
    },
    setStatus: function(node, className, bool) {
      select_map.get(node)[className] = bool;
    },
    reverseStatus: function(node, className) {
      this.getNodeofMap(node)[className] = !this.getNodeofMap(node)[
        className]
    },
    getDomArray: function(nodes) {
      return Array.prototype.slice.call(nodes);
    },
    slideUp: function(node) {
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
  return this.each(function() {
    var $this = $(this);
    var show_select = $this.find(".show_select");
    var select_all = $this.find(".select_all");
    select_all_nodes.push(this.querySelector(".select_all"));
    // var select_all_nodes = document.querySelectorAll(".select_all");
    var select_item = ".select_item"
    var imitate_select = $this;

    show_select.on("click", function(event) {
      event.stopPropagation();
      var target = this;
      oManager.setMapBindClass(target, {
        "noborder": false
      })
      var select_all_node = target.nextSibling;
      if (!oManager.setMapBindClass(select_all_node, {
          "hide_select": false
        })) {
        oManager.reverseStatus(select_all_node, "hide_select");
      }

      heightSlide(select_all_node, !oManager.getStatus(
        select_all_node, "hide_select"))

      oManager.reverseStatus(target, "noborder");

      var select_all_array = oManager.getDomArray(select_all_nodes);
      select_all_array.forEach(function(ele) {
        if (ele != select_all_node) {
          oManager.slideUp(ele);
        }
      })
    })

    if (!documentEvent) {
      document.addEventListener("click", function(event) {
        var select_all_array = oManager.getDomArray(select_all_nodes);
        select_all_array.forEach((ele) => oManager.slideUp(ele))
      })
      documentEvent = true;
    }

    $(document).on("click", select_item, function(event) {
      event.stopPropagation();
      var select_value = $(event.target).text();
      var show_item = $(this).parents(".imitate_select").find(
        ".show_item");
      var select_all_node = this.parentNode;
      show_item.text(select_value);
      oManager.slideUp(select_all_node);
    })
  })
}
