$(document).ready(function(){

    var data = [17, 40, 65, 45, 48, 17, 46, 22, 38, 41];
    var color = ['#e5baff', '#2ff4e4', '#00b7ff', '#00b7ff', '#e5baff',
        '#00b7ff', '#00b7ff', '#00b7ff', '#2ff4e4', '#00b7ff'];
    var color2 = ['#aeacf3', '#63e7be', '#00d8ff ', '#00d8ff ', '#aeacf3',
        '#00d8ff ', '#00d8ff ', '#00d8ff ', '#63e7be', '#00d8ff '];
    for (var i = 0; i < data.length; i++) {
        data[i] = {
            value: data[i],
            itemStyle: {
                color: color[i]
            }
        };
    }

    var option = {
        title: {
            text: '链路丢包数（个）',
            top: 10,
            left: 10,
            textStyle: {
                color: '#fff',
                fontSize: 14
            },
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
                name: '丢包数',
                type: 'pictorialBar',
                barCategoryGap: '-20%',
                symbol: 'path://M1,31c0,0,11.8-4.7,18-15C25.1,5.8,25.6,0.9,29,1c2.7-0.1,4.9,4.7,11,15c6.1,10.3,16,15,16,15H1L1,31z',
                label: {
                    show: true,
                    position: 'top'
                },
                itemStyle: {
                    opacity: 0.58
                },
                data: data
            }
        ]
    };



    var myChart = echarts.init(document.getElementById('demo6'));
    myChart.setOption(option);

});