import echarts from 'echarts';
import {debounce} from '@/uilts'; 
export var chartMixin = {
    data() {
        return {
            chartLine: null,
                xAxis:[],
                yAxis:[],
                xAxisReverse:[],
                yAxisReverse:[],
            options: [{
                value: '6',
                label: '6小时'
                }, {
                value: '12',
                label: '12小时'
                }, {
                value: '24',
                label: '1天'
                }, {
                value: '168',
                label: '7天'
                }, {
                value: '360',
                label: '15天'
                }, {
                value: '720',
                label: '30天'
                }],
            value: '', // select初始值
            application:'',  // select初始值
            requestID:6,
            autoResize:true,
            placeholderTime:'默认 6小时内'
        }
    },
    mounted(){
        if (this.autoResize) { //屏幕尺寸问题
            this.__resizeHanlder = debounce(() => {
                if (this.chartLine) {
                    this.chartLine.resize()
                }
            }, 100)
            window.addEventListener('resize', this.__resizeHanlder)
        }
    },
    methods: {
        arrHandle(xAxis,yAxis,data){
            xAxis = [];
            yAxis = [];
            for (var i = data.length;i--;) {
                data[i].x = this.$dateFilter(parseInt(data[i].x), "MM-dd hh:mm");
                xAxis.push(data[i].x);
                yAxis.push(data[i].y);
            }
            xAxis = xAxis.reverse();
            yAxis = yAxis.reverse();
            return {xAxis,yAxis};
        },
        drawLineChart(ElementId,chartName,chartNameReverse) {
            this.chartLine = echarts.init(document.getElementById(ElementId));
            this.chartLine.setOption({
                // tooltip: {
                //     trigger: 'axis'
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    // padding: [5, 10]
                },
                grid: [{
                    left: 50, // grid 组件离容器的距离
                    right: 50,
                    height: '35%'
                }, {
                    left: 50,
                    right: 50,
                    top: '55%',
                    height: '35%'
                }],
                axisPointer: {
                    link: {xAxisIndex: 'all'} //光标移入显示两个表的信息
                },
                xAxis: [
                    {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {onZero: true},
                    data: this.xAxis,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            // color: '#008ACD'
                        },
                    },
                    axisLine:{
                        lineStyle: {
                            // color: '#008ACD',
                        }
                    } 
                },{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {onZero: true},
                    data: this.xAxisReverse,
                    gridIndex: 1,
                    // position: 'top', // 横向坐标位置 
                    axisLabel: {
                        show: true,
                        textStyle: {
                            // color: '#008ACD'
                        },
                    },
                    axisLine:{
                        lineStyle: {
                            // color: '#008ACD',
                        }
                    } 
                },],
                yAxis: [
                    {
                    type: 'value',
                    name:chartName,
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: [
                                '#F9F9F9',
                                '#FEFEFE'
                            ]
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            // color: '#008ACD'
                        },
                    },
                    axisLine:{
                        lineStyle: {
                            // color: '#008ACD',
                        }
                    } 
                },
                {
                    type: 'value',
                    name:chartNameReverse,
                    // inverse: true, //反转
                    gridIndex: 1,
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: [
                                '#F9F9F9',
                                '#FEFEFE'
                            ]
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            // color: '#40c9c6'
                        },
                    },
                    axisLine:{
                        lineStyle: {
                            // color: '#40c9c6',
                            
                        }
                    } 
                }],
                series: [{
                    name: chartName,
                    type: 'line',
                    stack: '数量',
                    smooth: true,
                    data: this.yAxis,
                    itemStyle: {
                        normal: {
                            color: '#20A0FF',
                            lineStyle: {
                                color: '#20A0FF',
                                width: 2
                            },
                            areaStyle: {
                                color: '#f3f8ff'
                            }
                        }
                    },
                    animationDuration: 2800,
                    animationEasing: 'cubicInOut',
                },
                {
                    name: chartNameReverse,
                    type: 'line',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    stack: '合计',
                    smooth: true,
                    data: this.yAxisReverse,
                    itemStyle: {
                        normal: {
                            color: '#40c9c6',
                            lineStyle: {
                                color: '#40c9c6',
                                width: 2
                            },
                            areaStyle: {
                                color: '#f3f8ff'
                            }
                        }
                    },
                    animationDuration: 2800,
                    animationEasing: 'cubicInOut',
                },
            ]
            });
        },
        goto(page){
            const end = this.$date((Date.parse(new Date())), "end");
            const start = this.$date((Date.parse(new Date())), "start");
            if(this.requestID<25){
                this.$router.push({path:page,query:{start:start,end:end,index:1}});
            }else{
                this.$router.push({path:page,query:{start:this.$date(new Date(new Date().getTime() - this.requestID/24 * 24 * 3600 * 1000), "start"),end:end,index:1}})
            }     
        },
    }
}
