$(document).ready(function(){

    var data1 = [];
    var data2 = [];
    var xData = [];

    var time = new Date().getTime() - 10000;
    for (var i = 0; i < 50; i++) {
        xData.push(Tool.formatDate(new Date(time), 'mm:ss'));
        data1.push(getRandomD());
        data2.push(-1*getRandomD());
        time += 1000;
    }

    function getRandomD() {
        return Math.ceil(Math.random()*90) + 5;
    }


    var option = {
        title: {
            text: '电信出口带宽利用率/流量（Mb）',
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
            bottom: 40,
            top: 50,
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
                color: '#234a72',
            },
            data : xData
        },
        yAxis: {
            type : 'value',
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {
                color: '#234a72',
                formatter: function(v){
                    return Math.abs(v);
                }
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
                        color: '#914cb0',
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
                        color: '#2f90c3',
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



    var myChart = echarts.init(document.getElementById('demo4'));
    myChart.setOption(option);

    setInterval(function(){

        xData.shift();
        xData.push(Tool.formatDate(new Date(), 'mm:ss'));

        data1.shift();
        data1.push(getRandomD());

        data2.shift();
        data2.push(-1*getRandomD());

        myChart.setOption(option);
    }, 2000);

});