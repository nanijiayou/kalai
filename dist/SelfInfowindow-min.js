var config=require("juejin:widget/core/config");define("juejin:static/js/SelfInfowindow.js",function(t,e,a){function i(t,e,a){this._point=arguments[0],this._params=arguments[1],this._data=arguments[2]}i.prototype=new BMap.Overlay,i.prototype.initialize=function(t){var e=this;this._map=t;var a=e._data[1],i=$('#success-data-table tbody tr[value="'+e._data[1]+'"]').find("td:first").text(),n=$('#success-data-table tbody tr[value="'+e._data[1]+'"]').find("td:last").text(),d=this._div=document.createElement("div");$(d).attr("class","selfInfowindow");var o=$('<h3>添加标记</h3><div id="oper-result"></div>'),r=$('<h3>添加标记<i id="hide-window">X</i></h3><div class="pointname"><label>名称</label><input type="text" value='+i+' ></div><div class="extra"><label>备注</label><textarea type="text">'+n+'</textarea></div><button id="del" value='+a+'>删除</button><button id="update" value="'+a+'">修改</button>');return r.bind("mousedown",function(t){t.stopPropagation()}),$(d).append(r),$(d).find("#hide-window").bind("click",function(){e.hide()}),$(d).find("input,textarea").on("change",function(t){"INPUT"===this.tagName?i=$(this).val():n=$(this).val()}),$(d).find("#del").on("click",function(){var a=$(this).attr("value");console.log(a);var i=config.urlPrefixed+"/tools/resource/delete?callback=?",n={datatype:"point",geotable_id:e._params.geotable_id,data_id:a,type:2};$.getJSON(i,n,function(i){0===i.errno&&0===i.errno&&($(d).empty().append(o),$("#oper-result").text("删除成功"),setTimeout(function(){$(d).fadeOut(),t.removeOverlay(e._data[0]),$('#success-data-table tbody tr[value="'+a+'"]').remove()},500))})}),$(d).find("#update").on("click",function(){var t=config.urlPrefixed+"/tools/resource/update?callback=?",a=$(this).attr("value");e._params.data_id=a;var r={type:3,geotable_id:e._params.geotable_id,data_id:a,pointname:i,extra:n};$.getJSON(t,r,function(t){0===t.errno&&($(d).empty().append(o),$("#oper-result").text("修改成功"),$('#success-data-table tbody tr[value="'+a+'"]').find("td:first").text(i),$('#success-data-table tbody tr[value="'+a+'"]').find("td:last").text(n),setTimeout(function(){$(d).fadeOut()},500))})}),t.getPanes().markerPane.appendChild(d),d},i.prototype.draw=function(){var t=this._map,e=t.pointToOverlayPixel(this._point);this._div.style.left=e.x-130+"px",this._div.style.top=e.y-210+"px"},a.exports=i});