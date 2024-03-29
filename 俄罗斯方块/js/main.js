$(document).ready(function(){
    
    // 初始化方块
    var block = new Tetris({
        'container': 's-panel-ul',
        'up': 'o-up',
        'down': 'o-down',
        'left': 'o-left',
        'right': 'o-right',
        'stopButton': 'o-stop',
        'score': 'score-value',
        'wNum': 15,
        'hNum': 30
    });
    $("#o-start").click(function(){
        if ($("#o-start").data('start') == '1') {
            $("#o-start").data('start', '0');
            $("#o-start").text('开始');
            block.resetBlocks();
        } else {
            $("#o-start").data('start', '1');
            $("#o-start").text('停止');
            block.start();
        }
    });
    $(".btn-border").click(function(){
        alert($(this).index());
    });
});