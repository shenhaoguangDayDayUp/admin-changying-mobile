/**
 * 过滤或者重置方法
 *
 * @param {any} tableParams 列表请求参数
 * @param {any} queryParams 过滤请求参数
 * @param {any} type searchOrRest
 * @returns tableParams queryParams _params
 */
export function searchOrReset(tableParams, queryParams, type) {
    if (type == 'reset') {
        for (var key in queryParams) {
            queryParams[key] = '';
        }
    }
    Object.assign(tableParams, { index: 1 });
    let _params = Object.assign({}, queryParams, tableParams);
    _params = Object.rmEmpty(_params)
     
    // _.forEach(_params, (v, k) => {  //去除空的参数
    //     if (!v) {
    //         delete _params[k];
    //     }
    // });
    return {
        tableParams,
        queryParams,
        _params
    };
}

export var mixin = {
    mounted() {
        if (this.$route.query.index) {
            console.log(9999999999)
            console.log(this.$route)
            for (var key in this.$route.query) {
                console.log(key)
                if (key == 'end' || key == 'start') {
                    var timestamp3 = this.$route.query[key];  //声明一个时间戳
                    // var newDate = new Date();  //实例化一个Date对象
                    // newDate.setTime(timestamp3);
                    // this.queryParams[key] = newDate
                       this.queryParams[key] = timestamp3
                } else {
                    this.queryParams[key] = Number(this.$route.query[key])
                }

            }

            this.getList(this.$route.query)
        } else {
            this.getList(this.tableParams);
        }
        this.page = Number(this.$route.query.index)
   
    },
    data() {
        return {
            tableParams: {
                index: Number(this.$route.query.index) ? Number(this.$route.query.index) : 1
            },
            queryParams: {},
            total: null,


        }
    },
    created() {
        // this.$nextTick(()=>{
            if(!this.$route.query.start){
                console.log(88888888888)
                console.log(this.$route)
                var date1 = new Date();
                var date2 = new Date();
                if(this.$route.name == '游戏详情' || this.$route.name == '会员详情'){ //默认显示一个月的数据
                    date1 = new Date().setMonth(new Date().getMonth() - 1)
                }else{
                    date1 = new Date(date1 - 7 * 24 * 3600 * 1000)
                }
                date1 = this.$dateFilter(date1,'yyyy-MM-dd')
                date2 = this.$dateFilter(date2,'yyyy-MM-dd')
                this.$router.push({ path: this.$route.path, query: { start: String(date1), end: String(date2), index: this.$route.query.index || 1 ,active:this.$route.query.active,toggle:this.$route.query.toggle}});// active是数据分析跳转会员详情或游戏详情展示哪一个tab用的
            }

           
        // })
   
    },
    computed: {
        startMax(){
            if(this.queryParams.end){
              return  this.$dateFilter(new Date(this.queryParams.end)) 
            }else{
                return this.$dateFilter(new Date())  
            }
          
        },
        startMin(){
             if(this.queryParams.start){
              return  this.$dateFilter(new Date(this.queryParams.start)) 
            }else{
                return this.$dateFilter(new Date())  
            }
        },
        max(){
            return this.$dateFilter(new Date())  
        }
     
      },
    methods: {
        handleCurrentChange(val) {
            this.tableParams.index = this.page

        //    var date1 = this.$date(this.queryParams.start, "start")
        //    var date2 = this.$date(this.queryParams.end, "end")
      var  date1 = this.$dateFilter(this.queryParams.start,'yyyy-MM-dd')
      var  date2 = this.$dateFilter(this.queryParams.end,'yyyy-MM-dd')
            let _params = Object.assign({}, this.queryParams, this.tableParams, { start: date1, end: date2 });

            _params = Object.rmEmpty(_params)
      
            // _.forEach(_params, (v, k) => {
            //     if (!v) {
            //         delete _params[k];
            //     }
            // });
            this.$router.push({ query: _params, path: this.$route.path });
            this.getList(_params);
        },
        sizeChange(val) {

            // this.getList(Object.assign({}, this.queryParams,this.tableParams));
        },
        search() {
            let {
                tableParams,
                queryParams,
                _params
            } = searchOrReset(this.tableParams, this.queryParams, 'search');
            this.tableParams = tableParams;


          var  date1 = this.$dateFilter(_params.start,'yyyy-MM-dd')
          var  date2 = this.$dateFilter(_params.end,'yyyy-MM-dd')

            var query = Object.assign({}, _params, { start: date1, end: date2, index: this.tableParams.index })

            this.$router.push({ path: this.$route.path, query: query });
            if ((this.queryParams.start && this.queryParams.end)) {
                this.getList(this.$route.query);
            } else {
                return this.$message.error('日期不能为空')
            }

        },
        reset() {
            let {
                tableParams,
                queryParams,
                _params
            } = searchOrReset(this.tableParams, this.queryParams, 'reset');
            this.tableParams = tableParams;
            this.queryParams = queryParams;
            var date1 = new Date();
            var date2 = new Date();
            if(this.$route.name == '游戏详情' || this.$route.name == '会员详情'){ //默认显示一个月的数据
                date1 = new Date().setMonth(new Date().getMonth() - 1)
            }else{
                date1 = new Date(date1 - 7 * 24 * 3600 * 1000)
            }
            // var params = Object.assign({}, _params, { start: String(date1), end: String(date2), index: 1 })
            this.queryParams.start = this.$dateFilter(date1,'yyyy-MM-dd') 
            this.queryParams.end = this.$dateFilter(date2,'yyyy-MM-dd')
            this.$router.push({ path: this.$route.path, query: { start:this.queryParams.start  , end:   this.queryParams.end, index: 1 } });
            this.getList(this.$route.query);
        },
    }
}
