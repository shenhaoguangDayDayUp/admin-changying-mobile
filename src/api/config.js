var env = process.env
module.exports = {
    name: 'admin-park',
    env: env,
    apiUrlPrefix: {
        development: '/api',
        production: "http://changyingyule.cn",
        testing: "",
        static: ""
    },
    imgUrl:{
        development: '/api',
        production: "http://changyingyule.cn",
        testing: "",
        static: ""
    },
};