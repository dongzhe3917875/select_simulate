require("select_simulate.css");
require("./jquery.changeClass.js");

function heightSlide(node, status) {
  var height = 0;
  if (status) {
    Array.prototype.slice.call(node.childNodes).forEach(
      function(child) {
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

var select_map = new WeakMap();
jQuery(document).ready(function($) {
  // $(".imitate_select").each(function(index, value) {
  //   var $this = $(this);
  //   $this.width($this.find(".select_all").outerWidth());
  // })
  var show_select = ".show_select";
  var select_all = ".select_all";
  var imitate_select = $(".imitate_select");
  // $(select_all).changeClass(show_select_all);
  $(show_select).on("click", function(event) {
    event.stopPropagation();
    var target = $(this);
    if (!select_map.has(target[0])) {
      select_map.set($(target)[0], {
        "noborder": false
      })
      target.changeClass(select_map.get(target[0]))
    }


    var select_all_node = $(target).next()[0];

    if (!select_map.has(select_all_node)) {
      select_map.set(select_all_node, {
        "hide_select": false
      })

      $(select_all_node).changeClass(select_map.get(select_all_node))
    } else {
      select_map.get(select_all_node)["hide_select"] = !select_map.get(
        select_all_node)["hide_select"];
    }


    heightSlide(select_all_node, !select_map.get(select_all_node)[
      "hide_select"])
    select_map.get(target[0])["noborder"] = !select_map.get(target[0])[
      "noborder"];

    var select_all_array = Array.prototype.slice.call(document.querySelectorAll(
      select_all));
    select_all_array.forEach(function(ele) {
      if (ele != select_all_node) {
        slideUp(ele);
      }
    })
  })

  var slideUp = function(select_all_node) {
    var show_select_node = select_all_node.previousSibling;
    if (select_map.has(select_all_node)) {
      select_map.get(select_all_node)["hide_select"] = true;

    }

    if (select_map.has(show_select_node)) {
      select_map.get(show_select_node)["noborder"] = false
    }

    heightSlide(select_all_node, false);
  }

  $(document).on("click", function(event) {
    // 将所有的select all 收起来
    var select_all_array = Array.prototype.slice.call(document.querySelectorAll(
      select_all));
    select_all_array.forEach(function(ele) {
      slideUp(ele);
    })
  })
  $(document).on("click", ".select_item", function(event) {
    event.stopPropagation();
    var select_value = $(event.target).text();
    var show_item = $(this).parents(".imitate_select").find(
      ".show_item");
    var select_all_node = this.parentNode;
    show_item.text(select_value);
    slideUp(select_all_node);
  })
});
