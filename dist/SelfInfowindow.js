/**
 * 根据数据画出热力图
 * @author heyuan
 */
var config = require('juejin:widget/core/config');
define('juejin:static/js/SelfInfowindow.js', function(require, exports, module) {

    function SelfInfowindow(point,params,data) {
        this._point = arguments[0];
        this._params = arguments[1];
        this._data = arguments[2];
    }
    SelfInfowindow.prototype = new BMap.Overlay();
    SelfInfowindow.prototype.initialize = function (map) {
        var that = this;
        this._map = map;
        var dataId = that._data[1];
        var pointname = $('#success-data-table tbody tr[value="' + that._data[1] + '"]').find('td:first').text();
        var extra = $('#success-data-table tbody tr[value="' + that._data[1] + '"]').find('td:last').text();
        var div = this._div = document.createElement("div");
        $(div).attr("class","selfInfowindow");
        var resulthtml = $('<h3>添加标记</h3><div id="oper-result"></div>');
        var html = $('<h3>添加标记<i id="hide-window">X</i></h3><div class="pointname"><label>名称</label><input type="text" value=' + pointname + ' ></div><div class="extra"><label>备注</label><textarea type="text">'+ extra + '</textarea></div><button id="del" value='+ dataId +'>删除</button><button id="update" value="' + dataId + '">修改</button>')
        html.bind('mousedown', function(e){
            e.stopPropagation();
        });
        $(div).append(html);
        $(div).find('#hide-window').bind('click', function(){that.hide()});
        $(div).find('input,textarea').on('change', function (e) {
            this.tagName === "INPUT" ? pointname = $(this).val() : extra = $(this).val();
        })

        $(div).find('#del').on('click', function () {
            var dataId = $(this).attr('value');
            console.log(dataId);
            var url = config.urlPrefixed + '/tools/resource/delete?callback=?';
            var params = {
                datatype: "point",
                geotable_id: that._params.geotable_id,
                data_id: dataId,
                type: 2
            };
            $.getJSON(url, params, function (rs) {
                if(rs.errno === 0) {
                    if(rs.errno === 0) {
                        $(div).empty().append(resulthtml);
                        $('#oper-result').text('删除成功');
                        setTimeout(function () {
                            $(div).fadeOut();
                            map.removeOverlay(that._data[0]);
                            $('#success-data-table tbody tr[value="' + dataId + '"]').remove();
                        },500);
                    }
                };
            });
        });

        $(div).find('#update').on('click', function () {
            var url = config.urlPrefixed + '/tools/resource/update?callback=?';
            var dataId = $(this).attr('value');
            that._params.data_id = dataId;
            var params = {
                type: 3,
                geotable_id: that._params.geotable_id,
                data_id: dataId,
                pointname: pointname,
                extra: extra
            }
            $.getJSON(url,params, function (rs) {
                if(rs.errno === 0) {
                    $(div).empty().append(resulthtml);
                    $('#oper-result').text('修改成功');
                    $('#success-data-table tbody tr[value="' + dataId + '"]').find('td:first').text(pointname);
                    $('#success-data-table tbody tr[value="' + dataId + '"]').find('td:last').text(extra);
                    setTimeout(function () {
                        $(div).fadeOut();
                    },500);
                };
            });
        });
        map.getPanes().markerPane.appendChild(div);
        return div;
    };
    SelfInfowindow.prototype.draw = function () {
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - 130 + "px";
        this._div.style.top = pixel.y -210 + "px";
    };
    module.exports = SelfInfowindow;
});