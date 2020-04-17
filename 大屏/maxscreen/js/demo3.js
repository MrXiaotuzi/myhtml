$(document).ready(function(){

    var minData = [50, 47, 14, 32, 30, 40, 0, 55, 34, 27];
    var maxData = [49, 52, 30, 60, 90, 30, 50, 70, 40, 38];
    var avgData = [];
    var color = ['#0e6a9b','#3b9ccf','#129e6d','#26a06f','#05897c',
        '#139e97','#c45c53','#908e39','#997f32','#b4a317'];
    for (var i = 0; i < maxData.length; i++) {

        avgData.push(maxData[i]/2 + minData[i]);

        maxData[i] = {
            value: maxData[i],
            itemStyle: {
                color: color[i]
            }
        };
    }

    for (var i = 0; i < avgData.length; i++) {
        avgData[i] = {
            value: avgData[i],
            itemStyle: {
                color: '#8ff8fc'
            }
        };
    }

    var option = {
        title: {
            text: '链路时延（ms）',
            top: 10,
            left: 10,
            textStyle: {
                color: '#fff',
                fontSize: 14
            },
        },
        legend: {
            data:['最大/最小时延','平均时延'],
            textStyle: {
                color: '#bcb0ca',
                'font-size': 12,
            },
            right: 25,
            top: 10,
            itemWidth: 12.5,
            itemHeight: 7
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
            axisLine: {show: false},
            splitLine: {show:false},
            axisTick: {show: false},
            axisLabel: {
                color: '#234a72'
            },
            data : ['L1','L2','L3','L4','L5','L6','L7','L8','L9','L10']
        },
        yAxis: {
            type : 'value',
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {color: '#234a72'},
            splitLine: {
                lineStyle: {
                    color: '#fff',
                    opacity: 0.1
                }
            }
        },
        series: [
            {
                name: '辅助',
                type: 'bar',
                stack:  '总量',
                itemStyle: {
                    normal: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    },
                    emphasis: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    }
                },
                barWidth: 10,
                data: minData
            },
            {
                name: '最大/最小时延',
                type: 'bar',
                stack: '总量',
                label: {
                    show: false,
                },
                barWidth: 10,
                itemStyle: {
                    barBorderRadius: 3,
                    color: '#fff'
                },
                data: maxData
            },
            {
                name: '平均时延',
                type: 'line',
                symbol: 'circle',
                itemStyle:{
                    color: '#fff'
                },
                lineStyle: {
                    color: '#8ff8fc',
                    width: 1
                },
                data: avgData
            }
        ]
    };



    var myChart = echarts.init(document.getElementById('demo3'));
    myChart.setOption(option);

});