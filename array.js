/**
 * use somthing like array to generate TOC
 * good DOM structure
 *
 * Created by liuw on 2015/11/6.
 */
(function() {
    var init = {
        get : "con",
        put : "toc",
        headers : "h1,h2,h3,h4"
    }
    var getHeader = document.getElementById(init.get);
    var putHeader = document.getElementById(init.put);

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
        if (testNode.sourceIndex) {       // sourceIndex 为IE专有
            resultArray.sort(function (a,b) {
                return a.sourceIndex - b.sourceIndex;
            });
        }
        else if (testNode.compareDocumentPosition) {
            resultArray.sort(function (a,b) {
                return 3 - (a.compareDocumentPosition(b) & 6);  //按位运算
            });
        }
        return resultArray;
    }

    var h = getElementsByTagNames(init.headers,getHeader);

    console.log(h);
    /**
     * get nodeName of my headers array
     * @type {Array}
     */
    var node = [];
    for(var i=0; i<h.length; i++) {
        node.push(h[i].nodeName);
    }
    console.log(node);

    /**
     * 循环数组每遇到不同的标签就创建个组项。
      * @type {*[]}
     */
    var all=[ [node[0]],[]];
    var k=0;
    var h=0;
    for(var j=1; j<node.length; j++) {

        if(node[j] != node[j-1]) {
            k=k+1;
            all[k] = [];
            all[k][0] = node[j];
            h=0;
        } else if (node[j] == node[j-1]) {
            h=h+1;
            all[k][h] = node[j];
        }
    }
    console.log(all);

    /**
     * it does not work as i thought;
     */
    for(var e=0; e<all.length; e++) {
        var abc = document.createElement("ul");
        abc.id="header" + e;
        for(var f=0; f<all[e].length; f++) {
            var asd = document.createElement("li");
            //asd.innerHTML = h[].innerHTML;
            abc.appendChild(asd);
        }
    }


    /**
     * another way : do it from h1 to h5
     * ok ,just three hours left !!!
     * then finish it
     */
    var h1 = node.filter(function(item, index, array) {
        return (item=="H1")
    });
    var cH1List = document.creeateElement("li");
    for(var q=o; q<h1.length; q++) {
        var cH1 = document.createElement("li");
        cH1.id = "H1" + q;
        cH1List.appendChild(cH1);
    }
    putHeader.appendChild(cH1List);
    var h2 = node.filter(function(item, index, array) {
        return (item=="H2")
    });


}())