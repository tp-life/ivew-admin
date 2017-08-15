
import * as types from '../mutation-types.js';
import * as api from '../../api/common';
import * as ac from '../../data';
//state
const state = {
    info: null,
    userList:''
};

//创建getters
const getters = {
    //当前登陆用户信息
    getUserInfo:(state)=>{
        let info =getters.baseInfo();
        let defaultInfo={
            img:'',
            userName:''
        };
        return Object.assign(defaultInfo,info);
    },
    //当前登陆用户基础信息
    baseInfo:(satate)=>{
        let info =state.info;
        if(!info){
            info =ac.getData('userInfo') || null;
        }
        if(typeof info !== 'object'){
            info =JSON.parse(info);
        }
        return info;
    },

    //获取用户列表
    getUserList:state=>state.userList
}




//创建actions
const actions = {
    //登陆状态
    Login: ({ commit }, userInfo) => {
            ac.setData('userInfo',userInfo);
            commit(types.USERINFO, userInfo);
    },
    //退出登录
    loginOut:({commit})=>{
        ac.delData('userInfo');
        ac.delData('auth');
        ac.delData('menu');
        commit(types.USERINFO,null);
    },

    //获取用户列表
    getUserList:({commit},searchParams)=>{
        api.getUserList(searchParams).then(list=>{
            commit(types.USERLIST,list);
        });
    }
}

//提交状态改变
const mutations = {
    //当前登陆用户信息
    [types.USERINFO](state, info) {
        state.info = info;
    },

    //用户列表
    [types.USERLIST](satate,lists){
        state.userList= lists;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}