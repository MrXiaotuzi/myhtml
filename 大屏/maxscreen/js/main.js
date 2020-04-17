$(document).ready(function() {

    // 设置屏幕缩放尺寸
    var s1 = $('body').width() / 1920;
    var s2 = $('body').height() / 1080;
    var s = s1 < s2 ? s1 : s2;
    if (s < 0.8) {
        $('body').css({
            'transform': 'scale('+s+')',
            'transform-origin': 'left top 0px'
        });
    }



    // 动态更新时间
    function setTime() {
        $("#dataInfo").text(Tool.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'));
    }
    setTime();
    setInterval(setTime, 1000);



});