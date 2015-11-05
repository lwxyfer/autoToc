/**
 * Created by liuw on 2015/11/2.
 * 自动创建标题目录，滚动锚点
 */

var init = {
    from: "con",
    to: "mytitle",
    page: false, // false 表示不分级，就只选择一个标题  。 现在是是否加入所有的标题
    only: "h2",
    headers: "h2,h3",
    organization: false, // 有序无需列表
}

var getHeader = document.getElementById(init.from);
var putHeader = document.getElementById(init.to);

//var o = (function() {
//            if(init.organization) {
//                return "ol";
//            } else {
//                return "ul";
//            }
//        }());
var olul = init.organization ? "ol" :  "ul";  // 哈哈 ,灵活的运用三元

if( !init.page) {
    var h = getHeader.getElementsByTagName(init.only);
    var xx = create(h);
    putHeader.appendChild(xx);
} else if(init.page) {
    var h = getElementsByTagNames('h1,h2,h3,h4,h5',getHeader);
    var container = document.createElement(olul);
    var cList = document.create()
    var first = document.createElement("li");
    first.innerHTML = h[0].innerHTML.replace(/<\/?[^>]+>/g,"");
    for(var i=1; i<h.length; i++) {
        switch(i) {
            case h[i].nodeName == h[i-1].nodeName :    // here is nodeName. nodeName.subString(1) -
                var q = document.createElement("li");
                q.innerHTML = h[i].innerHTML.replace(/<\/?[^>]+>/g,"");
                //.appendChild(q);
                break;
            case h[i].nodeName < h[i-1].nodeName :
                var w = document.createElement(olul);
                var x;
                break;
            case h[i].nodeName > h[i-1].nodeName :
                break;
        }
    }


}

/**
 * 创建节点
 * todoL : 加入锚点； 为生成的title加入事件移动到锚点
 * @returns {Element}
 */
function create(node) {
    var all = document.createElement(olul);
    for(var i=0; i<node.length; i++) {
        var createH = document.createElement("li");
        createH.innerHTML = node[i].innerHTML;
        all.appendChild(createH);
    }
    return all;
}
/**
 * 完成多个标签的按文档顺序出现，返回排序后的TAG数组
 * @param list
 * @param obj
 * @returns {Array}
 */
function getElementsByTagNames(list,obj) {
    if (!obj) var obj = document;
    var tagNames = list.split(',');
    var resultArray = new Array();
    for (var i=0;i<tagNames.length;i++) {
        var tags = obj.getElementsByTagName(tagNames[i]);
        for (var j=0;j<tags.length;j++) {
            resultArray.push(tags[j]);
        }
    }
    var testNode = resultArray[0];
    if (!testNode) return [];
    if (testNode.sourceIndex) {       // sourceIndex 为IE专有
        resultArray.sort(function (a,b) {
            return a.sourceIndex - b.sourceIndex;
        });
    }
    else if (testNode.compareDocumentPosition) {
        resultArray.sort(function (a,b) {
            return 3 - (a.compareDocumentPosition(b) & 6);
        });
    }
    return resultArray;
}

var result = getElementsByTagNames('h1,h2,h3,h4,h5',getHeader);
var result1 = getElementsByTagNames('h2,h3,h4',getHeader);
var result2 = getElementsByTagNames('h2,h3',getHeader);
console.log(result[3].parentNode);
console.log(typeof result[6].nodeName);
console.log(result[6].nodeName);
console.log(result);
console.log(result1);
console.log(result2);
