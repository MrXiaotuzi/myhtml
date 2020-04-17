(function(win){

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

    win.Tool = {
        formatDate: formatDate
    };

})(window);