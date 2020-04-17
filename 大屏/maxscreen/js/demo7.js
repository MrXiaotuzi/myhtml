$(document).ready(function(){

    var radarChart = echarts.init(document.getElementById('data-radar'));
    var axisRadar = echarts.init(document.getElementById('axis-radar'));

    var warningIcon = {
        icon1: './img/icon1.png',
        icon2: './img/icon2.png',
        icon3: './img/icon3.png',
    };

    var mockData = [{
        text: 'MyPower S422',
        value: 1
    }, {
        text: 'NSR7000',
        value: 2
    }, {
        text: 'MyPower S3120-B',
        value: 3
    }, {
        text: 'MyPower S422',
        value: 2
    }, {
        text: 'MyPower S3120-B',
        value: 2
    }];

    initRadar(mockData);

    function initRadar() {
        // 雷达图圆弧区域色值
        var c1 = 'rgba(22, 169, 242, 1)';
        var c2 = 'rgba(7, 110, 167, 1)';
        var c3 = 'rgba(6, 96, 147, 1)';
        var c4 = 'rgba(6, 77, 121, 1)';
        var c5 = 'rgba(6, 55, 90, 1)';

        var option = {
            title: {
                text: '设备告警雷达图',
                top: 10,
                left: 10,
                textStyle: {
                    color: '#fff',
                    fontSize: 14
                },
            },
            radar: [{
                indicator: [{text: ''},{text:''},{text:''},{text:''}],
                center: ['36%', '50%'],
                radius: 160,
                startAngle: 90,
                splitNumber: 20,
                shape: 'circle',
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: [c1,c1,c1,c1,c1,c1,c2,c2,c2,c2,c2,c3,c3,c3,c4,c4,c4,c5,c5,c5]
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(5, 131, 207, 0)'
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        opacity: 1,
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: [c1,c1,c1,c1,c1,c1,c2,c2,c2,c2,c2,c3,c3,c3,c4,c4,c4,c5,c5,c5,c5]
                    }
                },
            }],

        };

        var axisOpt = {
            background: 'red',
            radar: [
                {
                    indicator: [{text: ''}, {text: ''}, {text: ''}, {text: ''}],
                    center: ['36%', '50%'],
                    radius: 160,
                    startAngle: 90,
                    splitNumber: 5,
                    shape: 'circle',
                    axisTick: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(5, 123, 198, 1)',
                            opacity: 1,
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(5, 123, 198, 1)'
                        }
                    },
                    splitArea: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ]
        };

        radarChart.setOption(option);
        axisRadar.setOption(axisOpt);
    }

    var idx = 0;
    var timer = 3000;
    var liEle = document.createElement('li');
    var iEle = document.createElement('i');
    var spanEle = document.createElement('span');

    // 每隔timer毫秒扫出一个点
    setInterval(showPoint, timer);

    function showPoint() {
        if(idx+1 < mockData.length) {
            var axisVal = getCoordByQuad(getRandom(1,4));
            var iconType = mockData[idx]['value'];
            // 构建icon
            var img = new Image();
            img.src = warningIcon['icon'+iconType];
            img.className = 'radar-point';
            img.onload = function () {
                img.style.left = axisVal.x;
                img.style.top = axisVal.y;
                // icon插入demo7
                var radarBox = document.getElementById('demo7');
                radarBox.appendChild(img);
                // 更新数量
                $('.radar-circle').text(idx);
                // 更新图例
                var legendUl = document.getElementById('legend-ul');
                liEle = liEle.cloneNode(false);
                iEle = iEle.cloneNode(false);
                spanEle = spanEle.cloneNode(false);
                iEle.className = 'warning warning-'+iconType;
                spanEle.className = 'legend-name';
                spanEle.innerText = mockData[idx]['text'];
                liEle.appendChild(iEle);
                liEle.appendChild(spanEle);
                legendUl.appendChild(liEle);
            }
        }
        idx++;
    }

    /**
     * 获取介于min~max的整数
     * @param min
     * @param max
     * @returns {number}
     */
    function getRandom(min, max) {
        var num = parseInt(max) - parseInt(min) + 1;
        return Math.floor(Math.random() * num + min);
    }

    function getCoordByQuad(quadVal) {
        var Y1 = 50,
            Y2 = 210,
            Y3 = 370,
            X1 = 27,
            X2 = 187,
            X3 = 347;
        var tmpX = getRandom(X1, X2);
        var tmpY = getRandom(Y2, Y3);
        var circle = [187, 210];
        var r = 160;

        switch(quadVal) {
            case 2:
                tmpX = getRandom(X2, X3);
                tmpY = getRandom(Y2, Y3);
                break;
            case 3:
                tmpX = getRandom(X2, X3);
                tmpY = getRandom(Y1, Y2);
                break;
            case 4:
                tmpX = getRandom(X1, X2);
                tmpY = getRandom(Y1, Y2);
                break;
        }

        // 坐标没有在大圆内或坐标在小圆内则重新获取
        while(!pointInsideCircle([tmpX, tmpY], circle, r) || pointInsideCircle([tmpX, tmpY], circle, 47)){
            getCoordByQuad(quadVal);
        }

        return {x: tmpX+'px', y: tmpY+'px'};
    }

    /**
     *  判断一个点是否在圆的内部
     *  @param point  测试点坐标
     *  @param circle 圆心坐标
     *  @param r 圆半径
     *  返回true为真，false为假
     *  */
    function pointInsideCircle(point, circle, r) {
        if (r===0) return false;
        var dx = circle[0] - point[0];
        var dy = circle[1] - point[1];
        return dx * dx + dy * dy <= r * r;
    }

});