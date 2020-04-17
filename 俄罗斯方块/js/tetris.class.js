/**
 * @file 基于jquery.1.11.0及以上版本
 * @class Tetris类 1.0
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
    this.currentBlocks = {};
    // 形状：1:一字 2:田字 3:土字 4:L字 5:反L字 6:Z字 7:S字 
    this.currentShape = 1;
    // 旋转形状：1234顺时针旋转
    this.rotateShape = 1;
    this.score = 0;
    this.begin = true;
    this.container = $("#" + _this.opt.container);
    
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
    
    // 创建方块
    this.creatNewBlocks = function() {
        var b = _this.randomBlock();
        var blocks = b.blocks;
        var shape = b.shape;
        var rotateShape = b.rotateShape;
        if (!_this.checkBlocks(blocks)) {
            _this.currentBlocks = [];
            return false;
        }
        _this.currentBlocks = blocks;
        _this.currentShape = shape;
        _this.rotateShape = rotateShape;
        _this.drawColor(blocks);
        return blocks;
    }
    
    // 生成随机形状
    this.randomBlock = function() {
        var shape = Math.ceil(Math.random() * 7);
        var c = _this.container;
        var b1, b2, b3, b4;
        var n1 = parseInt(_this.opt.wNum / 2) - 2;
        var n2 = n1 + 1;
        var n3 = n1 + 2;
        var n4 = n1 + 3;
        // shape = 6;
        if (shape == 1) {
            // 一字方块
            b1 = c.find("> li:first > div").eq(n1);
            b2 = c.find("> li:first > div").eq(n2);
            b3 = c.find("> li:first > div").eq(n3);
            b4 = c.find("> li:first > div").eq(n4);
        } else if (shape == 2) {
            // 田字方块
            b1 = c.find("> li:first > div").eq(n2);
            b2 = c.find("> li:first > div").eq(n3);
            b3 = c.find("> li").eq(1).find("> div").eq(n2);
            b4 = c.find("> li").eq(1).find("> div").eq(n3);
        } else if (shape == 3) {
            // 土字方块
            b1 = c.find("> li:first > div").eq(n2);
            b2 = c.find("> li").eq(1).find("> div").eq(n1);
            b3 = c.find("> li").eq(1).find("> div").eq(n2);
            b4 = c.find("> li").eq(1).find("> div").eq(n3);
        } else if (shape == 4) {
            // L字方块
            b1 = c.find("> li:first > div").eq(n1);
            b2 = c.find("> li").eq(1).find("> div").eq(n1);
            b3 = c.find("> li").eq(1).find("> div").eq(n2);
            b4 = c.find("> li").eq(1).find("> div").eq(n3);
        } else if (shape == 5) {
            // 反L字方块
            b1 = c.find("> li:first > div").eq(n3);
            b2 = c.find("> li").eq(1).find("> div").eq(n1);
            b3 = c.find("> li").eq(1).find("> div").eq(n2);
            b4 = c.find("> li").eq(1).find("> div").eq(n3);
        } else if (shape == 6) {
            // Z字方块
            b1 = c.find("> li:first > div").eq(n2);
            b2 = c.find("> li:first > div").eq(n3);
            b3 = c.find("> li").eq(1).find("> div").eq(n3);
            b4 = c.find("> li").eq(1).find("> div").eq(n4);
        } else if (shape == 7) {
            // S字方块
            b1 = c.find("> li:first > div").eq(n3);
            b2 = c.find("> li:first > div").eq(n4);
            b3 = c.find("> li").eq(1).find("> div").eq(n2);
            b4 = c.find("> li").eq(1).find("> div").eq(n3);
        }
        return {
            blocks: [b1, b2, b3, b4],
            shape: shape,
            rotateShape: 1
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
        var newB = {};
        if (shape == 1) {
            // 一字方块
            newB = _this.rotateBlock_I(oldBs, oldRs);
        } else if (shape == 2) {
            // 田字方块

        } else if (shape == 3) {
            // 土字方块
            newB = _this.rotateBlock_T(oldBs, oldRs);
        } else if (shape == 4) {
            // L字方块
            newB = _this.rotateBlock_L(oldBs, oldRs);
        } else if (shape == 5) {
            // 反L字方块
            newB = _this.rotateBlock_l(oldBs, oldRs);
        } else if (shape == 6) {
            // Z字方块
            newB = _this.rotateBlock_Z(oldBs, oldRs);
        } else if (shape == 7) {
            // 反Z字方块
            newB = _this.rotateBlock_S(oldBs, oldRs);
        }
        
        // 校验
        if (_this.checkBlocks(newB.blocks)) {
            _this.removeColor(oldBs);
            _this.drawColor(newB.blocks);
            _this.currentBlocks = newB.blocks;
            _this.rotateShape = newB.rotateShape;
        }
    }
    
    // 一
    this.rotateBlock_I = function(b, rotateShape) {
        var b1,b2,b3,b4;
        var lis = _this.container.find('> li');
        if (rotateShape == 1) {
            var iLi = b[2].parent().index();
            var iDiv = b[2].index();
            b1 = b[2];
            b2 = lis.eq(iLi+1).find('> div').eq(iDiv);
            b3 = lis.eq(iLi+2).find('> div').eq(iDiv);
            b4 = lis.eq(iLi+3).find('> div').eq(iDiv);
            rotateShape = 2;
        } else if (rotateShape == 2) {
            var iLi = b[0].parent().index();
            var iDiv = b[0].index();
            if (iDiv - 2 < 0) {
                b1 = lis.eq(iLi).find('> div').eq(0);
                b2 = lis.eq(iLi).find('> div').eq(1);
                b3 = lis.eq(iLi).find('> div').eq(2);
                b4 = lis.eq(iLi).find('> div').eq(3);
            } else if (iDiv + 1 >= _this.opt.wNum) {
                b1 = lis.eq(iLi).find('> div').eq(_this.opt.wNum - 4);
                b2 = lis.eq(iLi).find('> div').eq(_this.opt.wNum - 3);
                b3 = lis.eq(iLi).find('> div').eq(_this.opt.wNum - 2);
                b4 = lis.eq(iLi).find('> div').eq(_this.opt.wNum - 1);
            } else {
                b1 = lis.eq(iLi).find('> div').eq(iDiv - 2);
                b2 = lis.eq(iLi).find('> div').eq(iDiv - 1);
                b3 = lis.eq(iLi).find('> div').eq(iDiv);
                b4 = lis.eq(iLi).find('> div').eq(iDiv + 1);
            }
            rotateShape = 1;
        }
        return {
            blocks: [b1, b2, b3, b4],
            shape: 1,
            rotateShape: rotateShape
        };
    }
    
    // T
    this.rotateBlock_T = function(b, rotateShape) {
        var b1,b2,b3,b4;
        var lis = _this.container.find('> li');
        if (rotateShape == 1) {
            var iLi = b[2].parent().index();
            var iDiv = b[2].index();
            b1 = b[0];
            b2 = b[2];
            b3 = b[3];
            b4 = lis.eq(iLi+1).find('> div').eq(iDiv);
            rotateShape = 2;
        } else if (rotateShape == 2) {
            if (b[0].prev().length == 0) {
                b1 = b[1];
                b2 = b[2];
                b3 = b[2].next();
                b4 = b[3].next();
            } else {
                b1 = b[1].prev();
                b2 = b[1];
                b3 = b[2];
                b4 = b[3];
            }            
            rotateShape = 3;
        } else if (rotateShape == 3) {
            var iLi = b[1].parent().index();
            var iDiv = b[1].index();
            if (iLi == 0) {
                b1 = b[1];
                b2 = b[3].prev();
                b3 = b[3];
                b4 = lis.eq(iLi + 2).find('> div').eq(iDiv);
            } else {
                b1 = lis.eq(iLi - 1).find('> div').eq(iDiv);
                b2 = b[0];
                b3 = b[1];
                b4 = b[3];
            }
            rotateShape = 4;
        } else if (rotateShape == 4) {
            var iDiv = b[0].index();
            if (iDiv == _this.opt.wNum - 1) {
                b1 = b[0].prev();
                b2 = b[1].prev();
                b3 = b[1];
                b4 = b[2];
            } else {
                b1 = b[0];
                b2 = b[1];
                b3 = b[2];
                b4 = b[2].next();
            }
            rotateShape = 1; 
        }
        return {
            blocks: [b1, b2, b3, b4],
            shape: 3,
            rotateShape: rotateShape
        };
    }
    
    // L
    this.rotateBlock_L = function(b, rotateShape) {
        var b1,b2,b3,b4;
        var lis = _this.container.find('> li');
        if (rotateShape == 1) {
            var iLi = b[2].parent().index();
            var iDiv = b[2].index();
            b1 = b[0].next();
            b2 = b1.next();
            b3 = b[2];
            b4 = lis.eq(iLi + 1).find('> div').eq(iDiv);
            rotateShape = 2;
        } else if (rotateShape == 2) {
            if (b[2].index() == 0) {
                b1 = b[0];
            } else {
                b1 = b[0].prev();
            }
            b2 = b1.next();
            b3 = b2.next();
            b4 = b3.parent().next().find('> div').eq(b3.index());
            rotateShape = 3;
        } else if (rotateShape == 3) {
            var iLi = b[1].parent().index();
            var iDiv = b[1].index();
            if (iLi == 0) {
                b1 = b[1];
                b2 = lis.eq(iLi + 1).find('> div').eq(iDiv);
                b3 = lis.eq(iLi + 2).find('> div').eq(iDiv);
                b4 = b3.prev();
            } else {
                b1 = lis.eq(iLi - 1).find('> div').eq(iDiv);
                b2 = b[1];
                b3 = lis.eq(iLi + 1).find('> div').eq(iDiv);
                b4 = b3.prev();
            }
            rotateShape = 4;
        } else if (rotateShape == 4) {
            if (b[1].index() == _this.opt.wNum - 1) {
                b1 = b[0].prev().prev();
                b2 = b[1].prev().prev();
                b3 = b2.next();
                b4 = b3.next();
            } else {
                b1 = b[0].prev();
                b2 = b[1].prev();
                b3 = b2.next();
                b4 = b3.next();
            }
            rotateShape = 1;
        }
        return {
            blocks: [b1, b2, b3, b4],
            shape: 4,
            rotateShape: rotateShape
        };
    }
    
    // 反L
    this.rotateBlock_l = function(b, rotateShape) {
        var b1,b2,b3,b4;
        var lis = _this.container.find('> li');
        if (rotateShape == 1) {
            b1 = b[0].prev();
            b2 = b[2];
            b3 = b2.parent().next().find('> div').eq(b2.index());
            b4 = b3.next();
            rotateShape = 2;
        } else if (rotateShape == 2) {
            if (b[1].index() == 0) {
                b1 = b[1];              
            } else {
                b1 = b[1].prev();
            }
            b2 = b1.next();
            b3 = b2.next();
            b4 = b1.parent().next().find('> div').eq(b1.index());
            rotateShape = 3;
        } else if (rotateShape == 3) {
            var iLi = b[0].parent().index();
            var iDiv = b[0].index();
            if (iLi == 0) {
                b1 = b[0];
                b2 = b[1];
                b3 = b[3].next();
                b4 = lis.eq(2).find('> div').eq(iDiv + 1);
            } else {
                b1 = lis.eq(iLi - 1).find('> div').eq(iDiv);
                b2 = b1.next();
                b3 = b[1];
                b4 = b[3].next();
            }
            rotateShape = 4;
        } else if (rotateShape == 4) {
            if (b[1].index() == _this.opt.wNum - 1) {
                b1 = b[1];
                b2 = b[2].prev().prev();
                b3 = b2.next();
                b4 = b3.next();
            } else {
                b1 = b[1].next();
                b2 = b[2].prev();
                b3 = b2.next();
                b4 = b3.next();
            }
            rotateShape = 1;
        }
        return {
            blocks: [b1, b2, b3, b4],
            shape: 5,
            rotateShape: rotateShape
        };
    }
    
    // Z
    this.rotateBlock_Z = function(b, rotateShape) {
        var b1,b2,b3,b4;
        var lis = _this.container.find('> li');
        if (rotateShape == 1) {
            b1 = b[1].next();
            b2 = b[2];
            b3 = b[3];
            b4 = b[2].parent().next().find('> div').eq(b[2].index());
            rotateShape = 2;
        } else if (rotateShape == 2) {
            if (b[1].index() == 0) {
                b1 = b[0].prev();
                b3 = b[2];
            } else {
                b1 = b[0].prev().prev();
                b3 = b[1];
            }
             b2 = b1.next();
             b4 = b3.next();
            rotateShape = 1;
        }
        return {
            blocks: [b1, b2, b3, b4],
            shape: 6,
            rotateShape: rotateShape
        };
    }
    
    // S
    this.rotateBlock_S = function(b, rotateShape) {
        var b1,b2,b3,b4;
        var lis = _this.container.find('> li');
        if (rotateShape == 1) {
            b1 = b[0];
            b2 = b[3];
            b3 = b2.next();
            b4 = b3.parent().next().find('> div').eq(b3.index());
            rotateShape = 2;
        } else if (rotateShape == 2) {
            if (b[1].index() == 0) {
                b1 = b[2];
                b3 = b[3].prev();
            } else {
                b1 = b[1];
                b3 = b[3].prev().prev();
            }
            b2 = b1.next();
            b4 = b3.next();
            rotateShape = 1;
        }
        return {
            blocks: [b1, b2, b3, b4],
            shape: 7,
            rotateShape: rotateShape
        };
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
        _this.container.find('> li > div').removeClass('selected').removeClass('oldblock');
        _this.currentShape = 1;
        _this.rotateShape = 0;
        _this.score = 0;
        _this.currentBlocks = [];
    }
    
    // 开始函数
    this.start = function() {
        _this.resetBlocks();
        var b = _this.creatNewBlocks();
        if (b) {
            _this.downLoop();
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