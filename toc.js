/**
 * 使用暴力的方法，直接加入缩进，形成分成的结构。
 * 很暴力，但没有DOM结构而言。定位就简单的href 和 id
 * Created by liuw on 2015/11/5.
 */
var defaults = {
    get : "con",
    put : "toc",
    page : true,
    only : "h2",
    headers : "h1,h2,h3,h4",
    //indent : "1em",
}
var getHeader = document.getElementById(defaults.con);
var toc = document.getElementById(defaults.put);

function getElementsByTagNames(list,obj) {
    if (!obj) var obj = document;
    var tagNames = list.split(',');
    var resultArray = [];
    for (var i=0;i<tagNames.length;i++) {
        var tags = obj.getElementsByTagName(tagNames[i]);
        for (var j=0;j<tags.length;j++) {
            resultArray.push(tags[j]);
        }
    }
    var testNode = resultArray[0];
    if (!testNode) return [];
    if (testNode.sourceIndex) {
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

var h = getElementsByTagNames(defaults.headers,defaults.con);

for(var i=0; i<h.length; i++) {
    var cLi = document.createElement("li");
    var cLink = document.createElement("a");
    cLink.innerHTML = h[i].innerHTML.replace(/<\/?[^>]+>/g,"");
    cLink.setAttribute("href","#header" + i);
    h[i].setAttribute("id","header" + i)
    cLi.appendChild(cLink);
    toc.appendChild(cLi);
    switch(h[i].nodeName) {
        case "H1" :
            cLi.className = "indent";
            break;
        case "H2" :
            cLi.className = "indenta";
            break;
        case "H3" :
            cLi.className = "indentb";
            break;
        case "H4" :
            cLi.className = "indentc";
            break;
        case "H5" :
            cLi.className = "indentd";
            break;
    }
}

for(var j=0; j<h.length; j++) {
    toc.getElementsByTagName("a")[j].onclick = (function() {
        h[j].scrollIntoView();
    })(j)
    //console.log(toc.getElementsByTagName("li")[j].firstChild.nodeValue)
}

