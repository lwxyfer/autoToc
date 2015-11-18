/**
 * Created by liuw on 2015/11/5.
 */
/*
 ���ܣ����ɲ���Ŀ¼��JS����
 ���ԣ�IE8�������google����ͨ��
 �°�����
 2014-5-11
 */
var BlogDirectory = {
    /*
     ��ȡԪ��λ�ã����������߽�ľ��루left���;�������ϱ߽�ľ��루top��
     */
    getElementPosition:function (ele) {
        var topPosition = 0;
        var leftPosition = 0;
        while (ele){
            topPosition += ele.offsetTop;
            leftPosition += ele.offsetLeft;
            ele = ele.offsetParent;
        }
        return {top:topPosition, left:leftPosition};
    },

    /*
     ��ȡ��������ǰλ��
     */
    getScrollBarPosition:function () {
        var scrollBarPosition = document.body.scrollTop || document.documentElement.scrollTop;
        return  scrollBarPosition;
    },

    /*
     �ƶ���������finalPos ΪĿ��λ�ã�internal Ϊ�ƶ��ٶ�
     */
    moveScrollBar:function(finalpos, interval) {

        //����֧�ִ˷��������˳�
        if(!window.scrollTo) {
            return false;
        }

        //�������ʱ������������
        window.onmousewheel = function(){
            return false;
        };

        //�����ʱ
        if (document.body.movement) {
            clearTimeout(document.body.movement);
        }

        var currentpos =BlogDirectory.getScrollBarPosition();//��ȡ��������ǰλ��

        var dist = 0;
        if (currentpos == finalpos) {//����Ԥ��λ�ã����������֣����˳�
            window.onmousewheel = function(){
                return true;
            }
            return true;
        }
        if (currentpos < finalpos) {//δ����������һ����Ҫ�ƶ��ľ���
            dist = Math.ceil((finalpos - currentpos)/10);
            currentpos += dist;
        }
        if (currentpos > finalpos) {
            dist = Math.ceil((currentpos - finalpos)/10);
            currentpos -= dist;
        }

        var scrTop = BlogDirectory.getScrollBarPosition();//��ȡ��������ǰλ��
        window.scrollTo(0, currentpos);//�ƶ�����
        if(BlogDirectory.getScrollBarPosition() == scrTop)//���ѵ��ײ������������֣����˳�
        {
            window.onmousewheel = function(){
                return true;
            }
            return true;
        }

        //������һ���ƶ�
        var repeat = "BlogDirectory.moveScrollBar(" + finalpos + "," + interval + ")";
        document.body.movement = setTimeout(repeat, interval);
    },

    htmlDecode:function (text){
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    },

    /*
     ��������Ŀ¼��
     id��ʾ�����������ĵ� div ������ id��
     mt �� st �ֱ��ʾ������ʹμ�����ı�ǩ���ƣ��� H2��H3����д��Сд�����ԣ�����
     interval ��ʾ�ƶ����ٶ�
     */
    createBlogDirectory:function (id, mt, st, interval){
        //��ȡ��������div����
        var elem = document.getElementById(id);
        if(!elem) return false;
        //��ȡdiv������Ԫ�ؽ��
        var nodes = elem.getElementsByTagName("*");
        //��������Ŀ¼��div����
        var divSideBar = document.createElement('DIV');
        divSideBar.className = 'sideBar';
        divSideBar.setAttribute('id', 'sideBar');
        var divSideBarTab = document.createElement('DIV');
        divSideBarTab.setAttribute('id', 'sideBarTab');
        divSideBar.appendChild(divSideBarTab);
        var h2 = document.createElement('H2');
        divSideBarTab.appendChild(h2);
        var txt = document.createTextNode('Ŀ¼����');
        h2.appendChild(txt);
        var divSideBarContents = document.createElement('DIV');
        divSideBarContents.style.display = 'none';
        divSideBarContents.setAttribute('id', 'sideBarContents');
        divSideBar.appendChild(divSideBarContents);
        //�����Զ����б�
        var dlist = document.createElement("dl");
        divSideBarContents.appendChild(dlist);
        var num = 0;//ͳ���ҵ���mt��st
        mt = mt.toUpperCase();//ת���ɴ�д
        st = st.toUpperCase();//ת���ɴ�д
        //��������Ԫ�ؽ��
        for(var i=0; i<nodes.length; i++)
        {
            if(nodes[i].nodeName == mt|| nodes[i].nodeName == st)
            {
                //��ȡ�����ı�
                var nodetext = nodes[i].innerHTML.replace(/<\/?[^>]+>/g,"");//innerHTML��������ݿ�����HTML��ǩ��������������ʽȥ��HTML�ı�ǩ
                nodetext = nodetext.replace(/&nbsp;/ig, "");//�滻�����е�&nbsp;
                nodetext = BlogDirectory.htmlDecode(nodetext);
                //����ê
                nodes[i].setAttribute("id", "blogTitle" + num);
                var item;
                switch(nodes[i].nodeName)
                {
                    case mt:    //��Ϊ������
                        item = document.createElement("dt");
                        break;
                    case st:    //��Ϊ�ӱ���
                        item = document.createElement("dd");
                        break;
                }

                //����ê����
                var itemtext = document.createTextNode(nodetext);
                item.appendChild(itemtext);
                item.setAttribute("name", num);
                item.onclick = function(){        //����������������
                    var pos = BlogDirectory.getElementPosition(document.getElementById("blogTitle" + this.getAttribute("name")));
                    if(!BlogDirectory.moveScrollBar(pos.top, interval)) return false;
                };

                //���Զ����������Զ����б���
                dlist.appendChild(item);
                num++;
            }
        }

        if(num == 0) return false;
        /*������ʱ���¼�����*/
        divSideBarTab.onmouseenter = function(){
            divSideBarContents.style.display = 'block';
        }
        /*����뿪ʱ���¼�����*/
        divSideBar.onmouseleave = function() {
            divSideBarContents.style.display = 'none';
        }

        document.body.appendChild(divSideBar);
    }

};

window.onload=function(){
    /*ҳ��������֮�����ɲ���Ŀ¼*/
    BlogDirectory.createBlogDirectory("cnblogs_post_body","h2","h3",20);
}