$(document).ready(function(){

    var data = [{
        'name': 'NSR7300X-08',
        'value': 75,
        color: '#35b2eb',
    }, {
        'name': 'MyPweerS6600A',
        'value': 64,
        color: '#98e0fe',
    }, {
        'name': 'MyPweerS8900E',
        'value': 56,
        color: '#dce4e6',
    }, {
        'name': 'MyPweerS3120-B',
        'value': 32,
        color: '#ffc380',
    }, {
        'name': 'MyPweerS4220',
        'value': 21,
        color: '#c46257',
        fontColor: '#fff'
    }]
    var seriesObjs = [];
    var borderWidth = [10,8,6,4,2];
    var radius = [75, 61, 49, 39, 31];
    var placeHolderStyle = {
        color: 'rgba(0, 0, 0, 0)',
        borderWidth: 0
    }
    for (var i = 0; i < data.length; i++) {
        var seriesObj = {
            name: data[i].name,
            type: 'pie',
            clockWise: false,
            center: ['25%', '58%'],
            radius: [radius[i]-1, radius[i]],
            itemStyle: {
                borderWidth: borderWidth[i],
                shadowBlur: 0,
                borderColor: data[i].color,
            },
            hoverAnimation: false,
            data: [{
                value: data[i].value,
                name: data[i].name,
                label: {
                    show: false,
                    textStyle: {
                        color: data[i].color
                    }
                },
                labelLine: {
                    show: false,
                    lineStyle: {
                        color: data[i].color
                    },
                },
            }, {
                value: 100 - data[i].value,
                name: 'invisible',
                itemStyle: placeHolderStyle,
                label: {show: false},
                labelLine: {show: false},
            }]
        }
        seriesObjs.push(seriesObj)
    }
    var option = {
        title:{
            text: '设备健康度',
            top: 10,
            left: 10,
            textStyle: {
                color: '#fff',
                fontSize: 14
            },
        },
        legend: {
            show: false
        },
        toolbox: {
            show: false
        },
        series: seriesObjs
    }


    var myChart = echarts.init(document.getElementById('demo1'));
    myChart.setOption(option);
    myChart.on('finished', function(){
        // 绘制标签
        var infoHtml = '';
        for (var i = 0; i < data.length; i++) {
            infoHtml += '<div><label>'+data[i].name+'</label>'
                +'<span style="background: '+data[i].color+';' + (data[i].fontColor?'color:'+data[i].fontColor+';':'')+ '">'
                +data[i].value+'</span></div>';
        }
        $('#demo1_info').html(infoHtml);

        // 绘制线条
        var canvas = $("#demo1 canvas")[0];
        var ctx = canvas.getContext("2d");
        var y1 = [75, 88, 100, 110, 119]; // 起点高度
        var y2 = [94, 115, 135, 157, 178]; // 终点高度
        var x1 = [222, 219, 216, 213, 210]; // 中点x

        for (var i = 0; i < data.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = data[i].color;
            ctx.arc(140, y1[i], 3, 0, 2*Math.PI);
            ctx.moveTo(143, y1[i]);
            ctx.lineTo(x1[i], y1[i]);
            ctx.lineTo(248, y2[i]);
            ctx.stroke();
        }

    });


});