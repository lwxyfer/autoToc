/**
 * Created by liuw on 2015/11/2.
 * �Զ���������Ŀ¼������ê��
 */

var init = {
    from: "con",
    to: "mytitle",
    page: false, // false ��ʾ���ּ�����ֻѡ��һ������  �� �������Ƿ�������еı���
    only: "h2",
    headers: "h2,h3",
    organization: false, // ���������б�
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
var olul = init.organization ? "ol" :  "ul";  // ���� ,����������Ԫ

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
 * �����ڵ�
 * todoL : ����ê�㣻 Ϊ���ɵ�title�����¼��ƶ���ê��
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
 * ��ɶ����ǩ�İ��ĵ�˳����֣�����������TAG����
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
    if (testNode.sourceIndex) {       // sourceIndex ΪIEר��
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