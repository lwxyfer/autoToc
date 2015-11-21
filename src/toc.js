(function (window) {
    'use strict';


    /*
    覆盖默认的属性值
     */
    var extendObj = function (src, target) {
        for (var prop in target) {
            if (target.hasOwnProperty(prop) && target[prop]) {
                src[prop] = target[prop];
            }
        }

        return src;
    };

    /*
    获得所有的Header
     */
    var getHeaders = function (selector, scope) {
        var ret = [];
        var target = document.querySelectorAll(scope);

        Array.prototype.forEach.call(target, function (elem) {
            var elems = elem.querySelectorAll(selector);
            ret = ret.concat(Array.prototype.slice.call(elems));
        });

        return ret;
    };

    /*

     */
    var getLevel = function (header) {
        if (typeof header !== 'string') {
            return 0;
        }

        var decs = header.match(/\d/g);
        return decs ? Math.min.apply(null, decs) : 1;//若果不是选择h1，h2而是H2，H3，可以返回最小的header数值
    };

    /*
    创建列表项
     */
    var createList = function (wrapper, count) {
        while (count--) {
            wrapper = wrapper.appendChild(
                document.createElement('ul')
            );

            if (count) {
                wrapper = wrapper.appendChild(
                    document.createElement('li')
                );
            }
        }

        return wrapper;
    };

    var jumpBack = function (currentWrapper, offset) {
        while (offset--) {
            currentWrapper = currentWrapper.parentElement;
        }

        return currentWrapper;
    };

    /*
    
    加入锚点，定位
     */
    var setAttrs = function (overwrite, prefix) {
        return function (src, target, index) {
            var content = src.textContent;
            var pre = prefix + '-' + index;
            target.textContent = content;

            var id = overwrite ? pre : (src.id || pre);   //避免污染header本身的id

            id = encodeURIComponent(id);

            src.id = id;
            target.href = '#' + id;
        };
    };

    /*
    主要部分：
    传入覆盖后的option

     */
    var buildTOC = function (options) {
        var selector = options.selector;
        var scope = options.scope;

        var ret = document.createElement('ul');
        var wrapper = ret;
        //var lastLi = null;
        var lastLi = ret;      // 应该其进行初始化，
        var _setAttrs = setAttrs(options.overwrite, options.prefix);

        getHeaders(selector, scope).reduce(function (prev, cur, index) {
            var currentLevel = getLevel(cur.tagName);
            var offset = currentLevel - prev;        //这里的offset就如stack里说的level

            if (offset > 0) {
                wrapper = createList(lastLi, offset);   //此处忽略了首个标题是H2或更小的header，以为lastLi不会为null
            }

            if (offset < 0) {
                wrapper = jumpBack(wrapper, -offset * 2); // *2  上面是一个li然后ul ，所以*2
            }

            wrapper = wrapper || ret;  // ===0的情况

            var li = document.createElement('li');
            var a = document.createElement('a');

            _setAttrs(cur, a, index);

            wrapper.appendChild(li).appendChild(a);

            lastLi = li;

            return currentLevel;
        }, getLevel(selector));

        return ret;
    };

    var initTOC = function (options) {
        var defaultOpts = {
            selector: 'h1, h2, h3, h4, h5, h6',
            scope: 'body',
            overwrite: false,
            prefix: 'toc'
        };

        options = extendObj(defaultOpts, options);

        var selector = options.selector;

        if (typeof selector !== 'string') {
            throw new TypeError('selector must be a string');
        }

        if (!selector.match(/^(?:h[1-6],?\s*)+$/g)) {      // 学学别人的正则怎么写的
            throw new TypeError('selector must contains only h1-6');
        }

        var currentHash = location.hash;

        if (currentHash) {
            // fix hash
            setTimeout(function () {
                location.hash = '';
                location.hash = currentHash;
            }, 0);
        }

        return buildTOC(options);
    };

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return initTOC;
        });
    } else {
        window.initTOC = initTOC;
    }
}(window));