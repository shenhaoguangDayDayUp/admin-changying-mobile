export var rankingMixin = {
    data() {
        return {
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
            value: '',
            requestID:6,
        }
    },
    mounted(){
    },
    methods: {
    }
}
