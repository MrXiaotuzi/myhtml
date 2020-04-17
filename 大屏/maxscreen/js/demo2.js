$(document).ready(function(){

    //设备拓扑百分比
    var devTopoPieOption = {
        title: {
            text: 'text',
            textStyle: {
                color: '#ffffff',
                fontWeight: 'normal',
                fontSize: 14
            },
            left: 'center',
            bottom: '-5px'
        },
        tooltip:{
            show: false
        },
        series: [
            {
                type:'pie',
                zlevel: 0,
                radius: ['0', '75%'],
                legendHoverLink: false,
                hoverAnimation: false,
                itemStyle:{
                    color:'#074b75'
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:100, name:''}
                ]
            },
            {
                type:'pie',
                zlevel: 1,
                radius: ['53%', '55%'],
                legendHoverLink: false,
                hoverAnimation: false,
                itemStyle:{
                    color:'#0296df'
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:100, name:''}
                ]
            },
            {
                type:'pie',
                zlevel: 2,
                radius: ['51%', '57%'],
                legendHoverLink: false,
                hoverAnimation: false,
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                label:{
                    normal: {
                        show: true,
                        position: 'center',
                        color: '#ffffff',
                        fontSize: 30,
                        padding: [30,0,0,0]
                    }
                },
                data:[
                    {value:100, name:'100%',
                        itemStyle:{
                            color:'#62c77d'
                        }},
                    {value:0, name:'',
                        itemStyle:{
                            opacity: 0
                        }}
                ]
            }
        ]
    };

    function changeParams(title, value, color){
        devTopoPieOption.title.text = title;
        devTopoPieOption.series[2].data[0].value = value;
        devTopoPieOption.series[2].data[0].name = value + "%";
        devTopoPieOption.series[2].data[0].itemStyle.color = color;
        devTopoPieOption.series[2].data[1].value = 100-value;
        return devTopoPieOption;
    }

    function getRandom(){
        //设备拓扑百分比
        var numOn = parseInt(Math.random()*30) + 50;
        var numUn = parseInt(Math.random()*10);
        var numOut = 100-numOn-numUn;

        devTopoPieOnlineChart.setOption(changeParams("在线", numOn, '#62c77d'));
        devTopoPieOutlineChart.setOption(changeParams("离线", numOut, '#fd6590'));
        devTopoPieUnkownlineChart.setOption(changeParams("未知", numUn, '#b5b5b5'));

        setTimeout(getRandom, 5000);
    }

    var devTopoPieOnlineChart = echarts.init(document.getElementById("online"));
    var devTopoPieOutlineChart = echarts.init(document.getElementById("outline"));
    var devTopoPieUnkownlineChart = echarts.init(document.getElementById("unkown"));

    getRandom();

});


$(document).ready(function(){

    function initGraphic(num){
        var str = num + '';
        var graphics = {
            type: 'group',
            left: 40,
            top: 50,
            width: str.length * 60,
            children: []
        };

        var left = 0;

        // 文本
        for (var i = 0; i < str.length; i++) {
            graphics.children.push({
                type: 'text',
                left: i * 60 + 5,
                top: 15,
                z: 2,
                style: {
                    fill: '#fff',
                    text: 0,
                    font: '70px Microsoft YaHei'
                }
            });
        }

        // 背景
        for (var i = 0; i < str.length; i++) {
            graphics.children.push({
                type: 'rect',
                left: i * 60,
                top: 0,
                style: {
                    fill: '#165894',
                },
                shape: {
                    width: 50,
                    height: 50,
                }
            });

            graphics.children.push({
                type: 'rect',
                left: i * 60,
                top: 50,
                style: {
                    fill: '#124a7b',
                },
                shape: {
                    width: 50,
                    height: 50,
                }
            });
        }

        graphics.children.push({
            type: 'text',
            left: 'center',
            top: 120,
            z: 2,
            style: {
                fill: '#fff',
                text: '总数',
                font: '12px Microsoft YaHei'
            }
        });

        return graphics;
    }

    // 显示的数据
    var num = 459;


    var option = {
        series:[],//不知道为什么脱离了这个编辑器，没有这个会报错
        graphic: initGraphic(num)
    };

    //防止图形未渲染
    setTimeout(function() {
        start();
    }, 0);

    function start(){

        var index = num - 200;
        index = index < 0 ? 0 : index;

        var timer = setInterval(function () {
            if( ++index == num){
                clearInterval(timer);
            }

            var graphics = {
                type: 'group',
                children: []
            };

            var str = index + '';
            for (var i = 0; i < str.length; i++) {
                graphics.children.push(
                    {
                        type: "text",
                        style: {
                            text: str[i]
                        }
                    }
                )
            }

            myChart.setOption({
                graphic: graphics
            });

        }, 10)
    }

    var myChart = echarts.init(document.getElementById('devTopoNumber'));
    myChart.setOption(option);


});