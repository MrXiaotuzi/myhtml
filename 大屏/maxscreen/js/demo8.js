$(document).ready(function(){

    var data1 = [];
    var data2 = [];
    var xData = [];

    var time = new Date().getTime() - 10000;
    for (var i = 0; i < 6; i++) {
        xData.push(Tool.formatDate(new Date(time), 'mm:ss'));
        data1.push(getRandomD());
        data2.push(getRandomD());
        time += 1000;
    }

    function getRandomD() {
        return Math.ceil(Math.random()*50) + 20;
    }

    var option = {
        title: {
            text: '电信出口速率（Mbps）',
            top: 10,
            left: 10,
            textStyle: {
                color: '#fff',
                fontSize: 14
            },
        },
        legend: {
            data:['利用率','流量'],
            textStyle: {
                color: '#bcb0ca',
                'font-size': 12,
            },
            right: 25,
            top: 10,
            itemWidth: 18,
            itemHeight: 8
        },
        grid: {
            show: true,
            bottom: 60,
            top: 60,
            left: 50,
            right: 30,
            backgroundColor: 'rgba(13, 52, 93, 0.9)',
            borderWidth: 0
        },
        xAxis: {
            type : 'category',
            boundaryGap: false,
            axisLine: {show: false},
            splitLine: {show:false},
            axisTick: {show: false},
            axisLabel: {
                color: '#234a72'
            },
            data : xData
        },
        yAxis: {
            type : 'value',
            max: 100,
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {
                color: '#234a72'
            },
            splitLine: {
                lineStyle: {
                    color: '#fff',
                    opacity: 0.1
                }
            }
        },
        series: [
            {
                name: '流量',
                type: 'line',
                label: {show: false},
                showSymbol: false,
                smooth: true,
                lineStyle:{
                    width: 2,
                },
                itemStyle: {
                    normal: {
                        color: '#8f4aab',
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#403367'
                        }, {
                            offset: 1,
                            color: '#1d2450'
                        }])
                    }
                },
                data: data1
            },
            {
                name: '利用率',
                type: 'line',
                label: {show: false},
                showSymbol: false,
                smooth: true,
                lineStyle:{
                    width: 2,
                },
                itemStyle: {
                    normal: {
                        color: '#3d8ad9',
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#195377'
                        }, {
                            offset: 1,
                            color: '#233f83'
                        }])
                    }
                },
                data: data2
            }
        ]
    };



    var myChart = echarts.init(document.getElementById('demo8'));
    myChart.setOption(option);

    setInterval(function(){

        xData.shift();
        xData.push(Tool.formatDate(new Date(), 'mm:ss'));

        data1.shift();
        data1.push(getRandomD());

        data2.shift();
        data2.push(getRandomD());

        myChart.setOption(option);
    }, 2000);

});