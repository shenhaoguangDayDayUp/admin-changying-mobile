var env = process.env
module.exports = {
    name: 'admin-park',
    env: env,
    apiUrlPrefix: {
        development: '/api',
        // production: "http://changyingyule.cn",
        production:'http://139.198.176.248',
        testing: "",
        static: ""
    },
    imgUrl:{
        // development: 'http://192.168.1.198',
        development: '/api',
        // production: "http://changyingyule.cn",
        production:'http://139.198.176.248',
        testing: "",
        static: ""
    },
};