$(document).ready(function(){

    // 拖拽--页面效果
    $("#demo").draggable();
    $(".bottle").draggable();
    $(".taiji").draggable();

    // typeof new
    console.log('【typeof (new String("aaa"))】：'+ typeof (new String("aaa")));


    // localeCompare
    console.log('【localeCompare排序】：');
    var arr = ['张重阳afsdfsd','流泪ere','阿旺ere','抹在离ere','安迪','a','sbdf','sdf'];
    console.log(arr);
    arr.sort(function(a,b){
        return a.localeCompare(b);
    });
    console.log(arr);


    // 查找两个dom节点的最近共同父节点
    console.log('【查找两个dom节点的最近共同父节点】');
    function commonParentNode(oNode1, oNode2) {
        while(oNode1){
            if(oNode1 == oNode2 || $(oNode1).find(oNode2).length >0) break;
            oNode1 = oNode1.parentNode;
        };
        return oNode1;
    }
    console.log(document.getElementById("findP"));
    var pdiv = commonParentNode(document.getElementById("findP_c2"),
        document.getElementById("findP_c3"));
    console.log(pdiv);


    // 替换执行函数的主体
    console.log('【$.proxy替换执行函数的主体】');
    function proxyFn(a) {
        console.log(this.name+a);
    }
    proxyFn('参数a');
    $.proxy(proxyFn, {name:'替换主体名称'})('参数b');


    // 按照包名构建类
    console.log('【按照包名构建类】');
    function namespace(oNamespace, sPackage) {
        var sArry = sPackage.split(".");
        var str = "";
        var temp = oNamespace;
        for(var i=0;i<sArry.length;i++){
            if(!temp || !temp.hasOwnProperty(sArry[i]) || !(temp[sArry[i]] instanceof Object) ){
                eval("oNamespace."+str+sArry[i]+"={}");
            }
            temp = oNamespace[sArry[i]];
            str += sArry[i]+".";
        }
        return oNamespace;
    }
    console.log('namespace({a: {test: 1, b: 2}}, \'a.b.c.d\')');
    console.log(namespace({a: {test: 1, b: 2}}, 'a.b.c.d'));


	/*
	* 按照指定格式构建时间串
	* @param oDate 时间对象
	* @param sFormation 时间格式
	*
	* yyyy 年份
	* yy 两位数年份
	* MM 月份，补零
	* M 月份
	* dd 日期，补零
	* d 日期
	* HH 24小时时间，补零
	* H 24小时时间
	* hh 12小时时间，补零
	* h 12小时时间
	* mm 分钟，补零
	* m 分钟
	* ss 秒，补零
	* s 秒
	* */
    console.log('【按照指定格式构建时间串】');
    function formatDate(oDate, sFormation) {
        var y = oDate.getFullYear();
        var M = oDate.getMonth()+1;
        var d = oDate.getDate();
        var H = oDate.getHours();
        var m = oDate.getMinutes();
        var s = oDate.getSeconds();
        var w = oDate.getUTCDay();
        var W = ['日', '一', '二', '三', '四', '五', '六'];
        var o = sFormation;
        o = o.replace(/yyyy/g,y);
        o = o.replace(/yy/g,y%100);
        o = o.replace(/MM/g,M<10?"0"+M:M);
        o = o.replace(/M/g,M);
        o = o.replace(/dd/g,d<10?"0"+d:d);
        o = o.replace(/d/g,d);
        o = o.replace(/HH/g,H<10?"0"+H:H);
        o = o.replace(/H/g,H);
        o = o.replace(/hh/g,H%12<10?"0"+H%12:H%12);
        o = o.replace(/h/g,H%12);
        o = o.replace(/mm/g,m<10?"0"+m:m);
        o = o.replace(/m/g,m);
        o = o.replace(/ss/g,s<10?"0"+s:s);
        o = o.replace(/s/g,s);
        o = o.replace(/星期w/g,"星期"+W[w]);
        return o;
    }
    console.log('formatDate(new Date(), \'yyyy/MM/dd hh:m:ss 星期w\'):');
    console.log(formatDate(new Date(), 'yyyy/MM/dd hh:m:ss 星期w'));


    // 获取指定字符串长度
    console.log('【获取指定字符串长度】');
    function strLength(s, bUnicode255For1) {
        if(true===bUnicode255For1){
            return s.length;
        }else{
            var len = s.length;
            for(var i=0;i<s.length;i++){
                if(s.charCodeAt(i)>255){
                    len++;
                }
            }
            return len;
        }
    }
    console.log('strLength(\'hello world, 牛客\', false)');
    console.log(strLength('hello world, 牛客', false));


    // 获取斐波那契数
    console.log('【获取斐波那契数】');
    function fibonacci(n) {
        if(0===n){
            return 0;
        }
        if(1===n || 2 === n){
            return 1;
        }else{
            var a=1,b=1,c=2;
            for(var i=2;i<n;i++){
                c=a+b;
                a=b;
                b=c;
            }
            return c;
        }
    }
    console.log('fibonacci(10)');
    console.log(fibonacci(10));


    // 数组去重
    console.log('【数组去重】');
    Array.prototype.uniq = function () {
        var newA = [];
        var NaNflag = true;
        for(var i=0;i<this.length;i++){

            if(isNaN(this[i]) && typeof(this[i]) ==="number"){
                NaNflag?newA.push(this[i]):"";
                NaNflag = false;
            }else if(newA.indexOf(this[i]) === -1){
                newA.push(this[i]);
            }
        }
        return newA;
    }
    var newa =  [false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN,false, true, undefined, null, NaN, 0, 1];
    console.log(newa);
    newa = newa.uniq();
    console.log(newa);


    // 获取url参数
    console.log('【获取url参数】');
    function getUrlParam(sUrl, sKey) {
        var index0 = sUrl.indexOf("?")+1;
        var index1 = sUrl.indexOf("#");
        sUrl = index1===-1?sUrl.substring(index0):sUrl.substring(index0,index1);
        sUrl = index0===0?"":sUrl;
        var sUrlArray = sUrl.split("&");
        sUrlArray = ""===sUrl?[]:sUrlArray;
        var sUrObj = {};
        for(var i=0;i<sUrlArray.length;i++){
            var pers = sUrlArray[i].split("=");
            if(sUrObj.hasOwnProperty(pers[0])){
                if(!(sUrObj[pers[0]] instanceof Array)){
                    var tmp = sUrObj[pers[0]];
                    sUrObj[pers[0]] = [];
                    sUrObj[pers[0]].push(tmp);
                }
                sUrObj[pers[0]].push(pers[1]);
            }else{
                sUrObj[pers[0]]=pers[1];
            }
        }
        if(sKey){
            if(sUrObj.hasOwnProperty(sKey)){
                return sUrObj[sKey];
            }else{
                return "";
            }
        }else{
            return sUrObj==""?{}:sUrObj;
        }
    }
    var url = 'http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe';
    console.log(url);
    console.log('getUrlParam(url, \'key\')');
    console.log(getUrlParam(url, 'key'));


    // 闭包
    console.log('【闭包】');
    var adder = function(num){
        return function(y){
            return (num + y);
        }
    }
    console.log(adder);
    console.log('adder(1)(4): ' + adder(1)(4));
    console.log('adder(-1)(8): ' + adder(-1)(8));


    // 利用jquery过滤htmle空格
    console.log('【利用jquery过滤htmle空格】');
    var childrens = $("#ssgege *");
    $("#ssgege").empty().append(childrens);


    // 小数的比较,神奇的js
    console.log('【小数的比较,神奇的js】');
    console.log('[0.3-0.2==0.1,0.8-0.6] :' + [0.3-0.2==0.1,0.8-0.6]);
    console.log('[0.2-0==0.2,0.3-0.1==0.2,0.4-0.2==0.2,0.5-0.3==0.2,0.6-0.4==0.2,0.7-0.5==0.2,0.8-0.6==0.2]');
    console.log([0.2-0==0.2,0.3-0.1==0.2,0.4-0.2==0.2,0.5-0.3==0.2,0.6-0.4==0.2,0.7-0.5==0.2,0.8-0.6==0.2]);

    // 判断是否是NaN:只有NaN不等于任何对象，包括自己
    console.log('【判断是否是NaN:只有NaN不等于任何对象，包括自己】');
    console.log('null != null：' + (null != null));
    console.log('NaN != NaN：' + (NaN != NaN));

    // js中的比较
    console.log('【js中的比较】');
    var aa= new String("wegeg");
    console.log('typeof String(1) === "string"  ' + (typeof String(1) === "string"));
    console.log('aa=="wegeg"  ' + (aa=="wegeg"));
    console.log('[]?true:false  ' + ([]?true:false));
    console.log('[]==[]  ' + ([]==[]));
    console.log('NaN==NaN  ' + (NaN==NaN));
    console.log('1 + - + + + - + 1   ' + (1 + - + + + - + 1 ));

    // 关于函数的this.name
    console.log('【关于函数的this.name】');
    function foo() {
        this.name="54geg";
    }
    var oldName = foo.name;
    foo.name = "bar";
    var f1 = new foo();
    f1.name = "gergwe";
    console.log([oldName, foo.name]);


    // js读写文件
    console.log('【js读写文件】');
    function ReadFiles() {
        var fso, f1, ts, s;
        var ForReading=1;
        fso=new ActiveXObject("Scripting.FileSystemObject");
        f1=fso.CreateTextFile("test2.txt",true);
        f1.WriteLine("Hello World!");
        f1.WriteBlankLines(1);
        f1.Close();
        ts=fso.OpenTextFile("test.txt",ForReading);
        s=ts.ReadLine();
        document.write("File contents=''"+s+"''");
        ts.Close();
        f2=fso.CreateTextFile("test3.txt",true);
        f2.WriteLine("File contents=''"+s+"''");
        f2.WriteBlankLines(1);
        f2.Close();
    }
    //ReadFiles();


    // 删除变量的返回值
    console.log('删除变量的返回值');
    var sgewge = "324";
    console.log('delete sgewge  ' + delete sgewge);

    // screen对象，可以获取屏幕宽度
    console.log('【screen对象，可以获取屏幕宽度】');
    console.log(screen);




});