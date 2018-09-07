import axios from 'axios';
import Api from './api';



export let loginApi = new Api('user', 'id', {
    login: {
        url: 'login',
        method: 'put',
    },
    logout: {
        url: 'logout',
        method: 'put',
    },

})
export let memberApi = new Api('member', 'id', {
    vipMember: {
        url: 'vip/list/{id}',
        method: 'get',
    },
    vipRemove: {
        url: 'vip/{id}',
        method: 'delete',
    },
    entity:{
        url: 'entity/{id}',
        method: 'get',
    },
    memberList:{
        url: 'list/ALL/{id}',
        method: 'get',
    }

  

})










