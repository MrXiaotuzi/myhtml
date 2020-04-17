/**
 * @file 基于jquery.1.11.0及以上版本
 * @class Tetris类 1.1
 * @author liuk
 * @param {Object} 基本配置，参数标签均为id值
 *     {
 *        'container': 'udeul', // 容器ul标签，必须
 *        'up': 'o-up', // 上键，非必须
 *        'down': 'o-down', // 下键，非必须
 *        'left': 'o-left', // 左键，非必须
 *        'right': 'o-right', // 右键，非必须
 *        'stopButton': 'o-stop', // 停止键，非必须
 *        'score': 'score-value', // 分数值显示标签
 *        'wNum': 20, // 每行的方块数
 *        'hNum': 24 // 行数
 *     }
 */
var Tetris = function(opt) {
    var _this = this;
    // 配置参数
    this.opt = $.extend({
        wNum: 10,
        hNum: 24
    },opt);
    this.currentBlocks = [];
    // 形状：1:一字 2:田字 3:土字 4:L字 5:反L字 6:Z字 7:S字 
    this.currentShape = 1;
    // 旋转形状：0123顺时针旋转
    this.rotateShape = 0;
    this.score = 0;
    this.begin = true;
    this.container = $("#" + _this.opt.container);
    this.lis = $("#" + _this.opt.container).find('> li');
    this.shapeArry = {
        'shape_1': [
            [[0, 1], [1, 1], [2, 1], [3, 1]],
            [[1, 0], [1, 1], [1, 2], [1, 3]]
        ],
        'shape_2': [
            [[1, 0], [2, 0], [1, 1], [2, 1]]
        ],
        'shape_3': [
            [[1, 0], [0, 1], [1, 1], [2, 1]],
            [[1, 0], [1, 1], [2, 1], [1, 2]],
            [[0, 1], [1, 1], [2, 1], [1, 2]],
            [[1, 0], [0, 1], [1, 1], [1, 2]]
        ],
        'shape_4': [
            [[0, 0], [0, 1], [1, 1], [2, 1]],
            [[1, 0], [2, 0], [1, 1], [1, 2]],
            [[0, 1], [1, 1], [2, 1], [2, 2]],
            [[1, 0], [1, 1], [0, 2], [1, 2]]
        ],
        'shape_5': [
            [[2, 0], [0, 1], [1, 1], [2, 1]],
            [[1, 0], [1, 1], [1, 2], [2, 2]],
            [[0, 1], [1, 1], [2, 1], [0, 2]],
            [[0, 0], [1, 0], [1, 1], [2, 1]]
        ],
        'shape_6': [
            [[0, 0], [1, 0], [1, 1], [2, 1]],
            [[2, 0], [1, 1], [2, 1], [1, 2]]
        ],
        'shape_7': [
            [[1, 0], [2, 0], [0, 1], [1, 1]],
            [[0, 0], [0, 1], [1, 1], [1, 2]]
        ]
    };
    
    // 初始化tetris
    this.initTetris = function() {
        var lis = [];
        for (var i = 0; i < _this.opt.hNum; i++) {
            lis.push("<li>");
            for (var j = 0; j < _this.opt.wNum; j++) {
                lis.push("<div></div>");
            }
            lis.push("</li>");
        }
        _this.container.append(lis.join(''));
        _this.lis = _this.container.find('> li');
    }
    
    // 绑定事件
    this.bindClick = function() {
        $("#"+_this.opt.up).click(function(){
            _this.rotateBlocks();
        });
        $("#"+_this.opt.down).click(function(){
            _this.moveBlocks('down_click');
        });
        $("#"+_this.opt.left).click(function(){
            _this.moveBlocks('left');
        });
        $("#"+_this.opt.right).click(function(){
            _this.moveBlocks('right');
        });
        $("#"+_this.opt.stopButton).click(function(){
            if (_this.begin) {
                _this.stop();
            } else {
                _this.goOn();
            }
        });
        // 监听键盘事件
        $("body").keyup(function(e){
            if (e.keyCode == 38) {
                _this.rotateBlocks();
            }
            if (e.keyCode == 40) {
                _this.moveBlocks('down_click');
            }
            if (e.keyCode == 37) {
                _this.moveBlocks('left');
            }
            if (e.keyCode == 39) {
                _this.moveBlocks('right');
            }
            if (e.keyCode == 32) {
                if (_this.begin) {
                    _this.stop();
                } else {
                    _this.goOn();
                }
            }
        });
    }
    
    // 随机方块
    this.randomBlock = function() {
        var iDiv = parseInt(_this.opt.wNum / 2) - 2;
        var iLi = shape == 1 ? -1 : 0;
        var shape = Math.ceil(Math.random() * 7);
        var rotateShape = 0;
        var b = _this.createBlocks(iDiv, iLi, shape, rotateShape);
        if (!_this.checkBlocks(b.blocks)) {
            _this.currentBlocks = [];
            return false;
        }
        _this.currentBlocks = b.blocks;
        _this.currentShape = shape;
        _this.rotateShape = rotateShape;
        _this.drawColor(b.blocks);
        return b.blocks;
    }
    
    // 生成方块
    this.createBlocks = function(iDiv, iLi, shape, rotateShape) {
        if (iDiv < 0) {
            iDiv = 0;
        }
        var shapeArry = _this.shapeArry['shape_'+shape];
        if (rotateShape >= shapeArry.length) {
            rotateShape = 0;
        }
        var xys = shapeArry[rotateShape];
        var newBs = [];
        for (var i = 0; i < xys.length; i++) {
            if (iDiv + xys[i][0] >= _this.opt.wNum) {
                iDiv = _this.opt.wNum - 1 - xys[i][0];
            }
        }
        for (var i = 0; i < xys.length; i++) {
            newBs.push(_this.lis.eq(iLi + xys[i][1]).find('> div').eq(iDiv + xys[i][0]));
        }
        return {
            blocks: newBs,
            shape: shape,
            rotateShape: rotateShape
        };
    }
    
    // 校验方块
    this.checkBlocks = function(blocks) {
        if (!blocks || blocks.length != 4) {
            return false;
        }
        if (blocks[0].length == 0
            || blocks[1].length == 0
            || blocks[2].length == 0
            || blocks[3].length == 0) {
            return false;
        }
        if (blocks[0].hasClass('oldblock')
            || blocks[1].hasClass('oldblock')
            || blocks[2].hasClass('oldblock')
            || blocks[3].hasClass('oldblock')) {
            return false;
        }
        return true;
    }

    // 渲染颜色
    this.drawColor = function(blocks) {
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].addClass('selected');
        }
    }
    
    // 去掉颜色
    this.removeColor = function(blocks) {
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].removeClass('selected');
        }
    }
    
    // 固定后渲染颜色
    this.drawOldColor = function(blocks) {
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].removeClass('selected').addClass('oldblock');
        }
        _this.mergeBlocks();
    }
    
    // 合并计分
    this.mergeBlocks = function() {
        var len = _this.container.find('> li').length;
        for (var i = len - 1; i >= 0; i--) {
            var li = _this.container.find('> li').eq(i);
            var oldBs = li.find('> div.oldblock');
            var bs = li.find('> div');
            if (oldBs.length == 0) {
                break;
            }
            if (oldBs.length == bs.length) {
                oldBs.removeClass('oldblock');
                li.prependTo(_this.container);
                i++;
                _this.score += 10;
                $("#"+_this.opt.score).text(_this.score);
            }
        }
    }
    
    // 顺时针旋转
    this.rotateBlocks = function() {
        var oldBs = _this.currentBlocks;
        var shape = _this.currentShape;
        var oldRs = _this.rotateShape;
        var xy1 = _this.shapeArry['shape_' + shape][oldRs][0];
        var iDiv = oldBs[0].index() - xy1[0];
        var iLi = oldBs[0].parent().index() - xy1[1];
        if (iLi < 0) {
            iLi = 0;
        }
        var newB = _this.createBlocks(iDiv, iLi, shape, oldRs + 1);
        if (_this.checkBlocks(newB.blocks)) {
            _this.removeColor(oldBs);
            _this.drawColor(newB.blocks);
            _this.currentBlocks = newB.blocks;
            _this.rotateShape = newB.rotateShape;
        }
    }
    
    // 移动模块
    this.moveBlocks = function(action) {
        var blocks = _this.currentBlocks;
        if (!_this.begin) {
            return blocks;
        }
        var newBlocks = [];
        var stopflag = false;
        for (var i = 0; i < blocks.length; i++) {
            var nextDiv = [];
            if (action == "down" || action == "down_click") {
                nextDiv = blocks[i].parent().next().find('> div').eq(blocks[i].index());
            } else if (action == "left") {
                nextDiv = blocks[i].prev();
            } else if (action == "right") {
                nextDiv = blocks[i].next();
            }
            if (nextDiv.length == 0 || nextDiv.hasClass('oldblock')) {
                stopflag = true;
                break;
            }
            newBlocks.push(nextDiv);
        }
        if (stopflag) {
            if (action == "down") {
                _this.currentBlocks = [];
                _this.drawOldColor(blocks);
                return false;
            } else {
                return blocks;
            }
        }
        _this.removeColor(blocks);
        _this.drawColor(newBlocks);
        _this.currentBlocks = newBlocks;
        return newBlocks;
    }
    
    // 循环下移模块
    this.downLoop = function() {
        (function() {
            if (!_this.begin) {
                return false;
            }
            b = _this.moveBlocks('down');
            if (b) {
                setTimeout(arguments.callee, 200);
            } else {
                _this.start();
            }
        })();
    }
    
    // 游戏结束
    this.gameOver = function() {
        alert('GAME OVER');    
    }
    
    // 停止清零
    this.resetBlocks = function() {
        _this.begin = false;
        _this.lis.find('> div').removeClass('selected').removeClass('oldblock');
        _this.currentShape = 1;
        _this.rotateShape = 0;
        _this.score = 0;
        _this.currentBlocks = [];
    }
    
    // 开始函数
    this.start = function() {
        var b = _this.randomBlock();
        if (b) {
            _this.begin = true;
            setTimeout(_this.downLoop, 200);
        } else {
            setTimeout(_this.gameOver, 200);
        }
    }
    
    // 暂停
    this.stop = function() {
        _this.begin = false;
    }
    
    // 继续
    this.goOn = function() {
        _this.begin = true;
        _this.downLoop();
    }
    
    _this.initTetris();
    _this.bindClick();
    
}