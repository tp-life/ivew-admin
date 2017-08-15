import * as types from '../mutation-types.js';
import * as api from '../../api/common';

const state = {
    attrLists: [],
    classify:[{ keys: '', alias: '', vs: new Set() }],
    goodsLists:[],
}

const getters = {
    //属性模板列表
    getAttrLists: state => state.attrLists,
    //属性模板具体属性值
    getClassify:state=>state.classify,
    //仓库商品列表
    getGoodsLists:state=>state.goodsLists
}

const actions = {
    //属性模板列表
    attrLists:({commit},searchParams)=>{
        api.getAttrLists(searchParams).then(lists=>{
            commit(types.ATTRLIST,lists);
        })
    },
    //属性模板具体属性值
    classify:({commit},data)=>{
        commit(types.CLASSIFY,data);
    },

    //仓库商品列表
    goodsLists:({commit},searchParams)=>{
        api.getGoodsLists(searchParams).then(lists=>{
            commit(types.GOODSLIST,lists);
        });
    }
}


const mutations ={
    //属性模板列表
    [types.ATTRLIST](state,lists){
        state.attrLists = lists;
    },
    //属性模板具体属性值
    [types.CLASSIFY](state,data){
        if(!data || data.length < 1){
            data = [{ keys: '', alias: '', vs: [] }];
        }
        data.map(item=>{
            item.vs = new Set(item.vs);
            return item;
        })
        state.classify = data;
    },
    [types.GOODSLIST](state,data){
        state.goodsLists = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}