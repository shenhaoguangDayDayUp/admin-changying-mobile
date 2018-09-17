import Axios from 'axios';
// import { Loading } from 'element-ui';
import $config from './config';
import {user} from '../logic';
let baseUrl = $config.apiUrlPrefix[$config.env.NODE_ENV]

let axios = Axios.create({
    baseURL: baseUrl +'/control', // 因为后台返回图片地址没有/gateway/mobile而修改
    data:{},
    headers:{'Content-Type':'application/json'}
})

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // window.global.$vux.loading.show({
    //     text: '正在加载',
    //     onShow(){
    //         window.global.$root.eventHub.$emit('LodingShow')
    //     },
    //     onHide(){
    //         window.global.$root.eventHub.$emit('LodingHide')  
    //     }
    //    })
    // window.global.$$Loading.present.show()
       
     
    return config;
}, function (error) {
        return Promise.reject(error);
    
});
axios.interceptors.response.use(function (response) {
    // window.global.$$Loading.present.hide()

 return response;
}, function (error) {
    console.log(window)
    switch (error.response.status) { //这里修改了，如果出现500/502之类的，页面弹框里会出现一大堆报错。
        
        case 401:
            window.global.$router.push({path:'/login',query:{back:window.global.$route.fullPath}})
            break;
        case 456:
        console.log(111111)
        // console.log(window.global.$$Message.present.show())
        // console.log(window.global.$$Message.show)
        // alert(window.global.$$Loading)
        console.log(window.global.$$Message.present)
        window.global.$$Message.present.show()
        // window.global.$$message.error(error.response.data);
            break;
        case 567:
        // window.global.$message.error('操作失败！');
            break;
        default:
        // window.global.$message.error('操作失败！');
            break;
    }
    // window.global.$vux.loading.hide();
    window.global.$$Loading.present.hide()
    document.body.style.overflow = 'auto';
    return Promise.reject(error);
}); 


/**
 * api
 * 
 * @export
 * @class Api
 * 静态方法 get post put delete
 * 
 * @url 请求路径
 * @pkId 主键
 * @actions 基于url上扩展的方法  
 * 
 */
/** 
 * actions 事例
{
    approval: {
        method: 'put', 
        url: 'approval/{id}'
    }
}
*/
export default class Api {
    constructor(url, pkId, actions = {}) {
        if (!/\/$/.test(url)) {
            url = url + '/';
        }
        this.url = url;
        this.pkId = pkId;
        // 基于baseUrl上扩展的请求
        Object.keys(actions).forEach(key => {
            this[key] = (data, otherOptions) => {
                let url = formatUrl(this.url + actions[key].url, data);
                return send(url, data, otherOptions, actions[key].method);
            }
        })

    }

    get(data, otherOptions) {
        let url = `${this.url}{${this.pkId}}`;
        url = formatUrl(url, data);
        return send(url, data, otherOptions);
    }
    query(data, otherOptions) {
        return send(this.url, data, otherOptions);
    }
    create(data, otherOptions) {
        return send(this.url, data, otherOptions, 'post');
    }
    update(data, otherOptions) {
        let url = `${this.url}{${this.pkId}}`;
        url = formatUrl(url, data);
        return send(url, data, otherOptions, 'put');
    }
    delete(data, otherOptions) {
        let url = `${this.url}{${this.pkId}}`;
        url = formatUrl(url, data);
        return send(url, data, otherOptions, 'delete');
    }

    changeStatus(data, otherOptions) {
        let url = `${this.url}{${this.pkId}}/status`;
        url = formatUrl(url, data);
        return send(url, data, otherOptions, 'put');
    }

    static get(url, data, otherOptions) {
        url = formatUrl(url, data);
        return send(url, data, otherOptions);
    }
    static post(url, data, otherOptions) {
        url = formatUrl(url, data);
        return send(url, data, otherOptions, 'post');
    }
    static put(url, data, otherOptions) {
        url = formatUrl(url, data);
        return send(url, data, otherOptions, 'put');
    }
    static delete(url, data, otherOptions) {
        url = formatUrl(url, data);
        return send(url, data, otherOptions, 'delete');
    }
}
function send(url, data, otherOptions, method = 'get') {
    return new Promise((resolve, reject) => {
        let config = {};
        if (method == 'get') {
            config = Object.assign({}, { url: url, method: method, params: data}, otherOptions);
        } else {
            config = Object.assign({}, { url: url, method: method, data: data }, otherOptions);
        }  
        // config = Object.assign({},config,{data:{},headers:{'Content-Type':'application/json'}})

        axios.request(config).then((res) => {
            // if (!res.data) res.data = { code: 200 };
            resolve(res);
        }).catch((err) => {
            console.log(err)
        })
    })
}

function isFormatUrl(url) {
    return url.indexOf("{") !== -1 && url.indexOf("}") !== -1;
}

function formatUrl(url, dataModel, options = {}) {
    if (!options.hasOwnProperty("removeFormatModelProp")) {
        //默认移除datamodel中的已经在url中使用的format属性
        options.removeFormatModelProp = true;
    }
    if (isFormatUrl(url)) {
        if (dataModel) {
            Object.keys(dataModel).forEach(function (key) {
                var varName = "{" + key + "}";
                if (url.indexOf(varName) !== -1) {
                    url = url.replace(new RegExp(varName, "gm"), dataModel[key]);
                    //格式化url后是否将datamodel中的对应属性移除
                    if (options.removeFormatModelProp) {
                        delete dataModel[key];
                    }
                }
            });
        } else {
            url.split("{").forEach(function (item) {
                if (item.indexOf("}") === item.length - 1) {
                    url = url.replace("{" + item, "");
                }
            });

        }
        return url;
    } else {
        return url;
    }
}





