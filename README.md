### how to use
#### jquery
```html
<div class="imitate_select name-select">
  <div class="show_select">
    <span class="show_item">文件后缀文件后缀</span>
    <span class="caret-wrap"></span>
  </div>
  <ul class="select_all hide_select">
    <li class="select_item">目录</li>
    <li class="select_item">文件后缀文件后缀</li>
    <li class="select_item">精确匹配</li>
  </ul>
</div>
```
调用

```javascript
require("select_simulate.css");
require("./jquery.select.js");
var select_map = new WeakMap()
$(".imitate_select").select({
  select_map: select_map
})
```

#### 原生
```html
<div class="imitate_select age-select protoSelect">
    <div class="show_select">
        <span class="show_item">40-50</span>
        <span class="caret-wrap"></span>
    </div>
    <ul class="select_all hide_select" style="height: 0px;">
        <li class="select_item">20-30</li>
        <li class="select_item">30-40</li>
        <li class="select_item">40-50</li>
    </ul>
</div>
```
```javascript
var proto_select_simulate = require("./protoSelect.js").proto_select_simulate;
var domSelect = document.querySelector(".protoSelect");
var select_map1 = new WeakMap();
proto_select_simulate.call(domSelect, {
  select_map: select_map1
})
```
[在线demo](http://45.62.108.67/project/select_simulate)
