
import * as types from '../mutation-types.js';
import * as api from '../../api/common';
//state
const state = {
    groupList:''
};

//创建getters
const getters = {
    getGroup:(state)=>{
        return state.groupList;
    }
}


//创建actions
const actions = {
    //获取用户列表
    getGroupList:({commit},searchParams)=>{
        api.authGroup(searchParams).then(list=>{
            commit(types.GROUPLIST,list);
        });
    }
}

//提交状态改变
const mutations = {

    //用户列表
    [types.GROUPLIST](satate,lists){
        state.groupList= lists;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}