
<style lang="less" scoped>
    .canves-box{
        width: 60%;
        height: 100%;
        margin: 0 auto;
    }
</style>

<template>
    <div class="canves-box" :id="domId"></div>
</template>

<script>
const echarts = require('echarts');
export default {
    data () {
        return {
            myChart: null
        };
    },
    props: ['name', 'domId'],
    created () {

    },
    mounted () {
        this.myChart = echarts.init(document.getElementById(this.domId));
        this.initChart();
    },
    methods: {
        initChart () {
            var option = {
                series: [
                    {
                        name: this.name,
                        type: 'gauge',
                        min: 0,
                        max: 100,
                        splitNumber: 10,
                        radius: '100%',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: [[1, '#2E335B']],
                                width: 10
                            }
                        },
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        pointer: {
                            width: 3,
                            length: '60%'
                        },
                        itemStyle: {
                            color: 'red'
                        },
                        detail: {
                            formatter: '{value}',
                            fontStyle: {
                                fontSize: 12
                            },
                            offsetCenter: [0, '60%']
                        },
                        data: [{value: 50, name: ''}]
                    }
                ]
            };
            this.myChart.setOption(option);
            // 解决第一次初始化是高度占不满问题
            setTimeout(() => {
                this.myChart.resize();
            }, 2000);
            window.addEventListener('resize', () => {
                this.myChart.resize();
            });
        }
    }
};
</script>
