### how to use
```
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

```
require("select_simulate.css");
require("./jquery.select.js");
var select_map = new WeakMap()
$(".imitate_select").select({
  select_map: select_map
})
```


[在线demo](http://45.62.108.67/project/select_simulate)