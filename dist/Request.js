/**
 * ajax组建，发送请求，调用callback
 * @param {[Array] || {Object}} 需要发送多次请求时可以使用Array，Array每一项都为Object.
 * 参数Object可以设置的参数有:{String} devUrl, (String) url, (Object) params, (Function) init, (Function) callback.
 * author: heyuan
 */

define('juejin:static/js/Request.js', function(require, exports, module) {

    function Request(options) {
        this.options = options || {};
    };

    Request.prototype.init = function() {
        var options = this.options;
        if($.isArray(options) && options.length > 0) {
            for(var k in options) {
                this._init(options[k]);
            }
        }else {
            this._init(options);
        }
    };
    Request.prototype._init = function (option) {
        option.init && option.init();
        var callback = option.callback;
        if (option.url) {
            var url = (option.devUrl || option.domain) + option.url;
            var params = option.params || {};

            var saveKey = option.url + JSON.stringify(params);
            var rs = localStorage.getItem(saveKey);
            if (option.nocache && rs) {
                rs = JSON.parse(rs);
                callback && callback(rs);
            } else {
                $.getJSON(url, params, function (rs) {
                    // 判断有数据
                    if (($.isArray(rs) && rs.length > 0 || !$.isEmptyObject(rs))) {
                        try {
                            //localStorage.setItem(saveKey, JSON.stringify(rs));
                        } catch (exception) {
                            //localStorage.clear();
                        }
                    }
                    callback && callback(rs);
                });
            }
        } else {
            callback && callback({});
        }
    }
    Request.prototype.reload = function() {
        this.init();
    }
    Request.prototype.setOptions = function(options) {

        $.extend(true, this.options, options);
    }

    Request.prototype.isDemo = function() {
        var pathName  = location.pathname;
        var pathNames = pathName.split('/');
        var spName = '';
        if (pathNames.length >= 2) {
            spName = pathNames[1];
        }

        if (spName == 'malldemo') {
            return true;
        } else {
            return false;
        }
    }

    module.exports = Request;

});

