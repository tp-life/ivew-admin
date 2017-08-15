
import * as types from '../mutation-types.js';
import * as api from '../../api/common';
import * as ac from '../../data';
import route from '../../router/component';
import authMap from '../../../config/menu';
//state
const state = {
    menu: null,
    crumb: {
        first: '',
        last: ''
    }
};

//创建getters
const getters = {
    getMenu: state => {
        let m = state.menu;
        if (!state.menu) {
            m = ac.getData('menu');
        }
        if (typeof m === 'string') {
            return JSON.parse(m);
        }
        return m;
    }
}

//创建actions
const actions = {
    //获取权限菜单
    getAllAuthMenu: ({ commit }, resh = false) => {
        let menu = ac.getData('menu');
        if (resh || !menu) {
            let user = JSON.parse(ac.getData('userInfo'));
        
            api.getAllMenu({uid:user.id}).then(re => {
                let c = JSON.parse(JSON.stringify(route));
                let m = handleMenu(c, re.rules);
                ac.setData('auth',re.rules);
                ac.setData('menu', m);
                commit(types.GET_MENU, m);
            });
        } else {
            commit(types.GET_MENU, menu);
        }
    }
}

//提交状态改变
const mutations = {
    [types.GET_MENU](state, menus) {
        state.menu = menus;
    },

    [types.BREADCRUMB](state, crumb) {
        state.crumb = crumb;
    }
}


//过滤菜单
function handleMenu(r, rules) {
    for (let i = 0; i < r.length; i++) {
        delete r[i].component;
        //过滤子栏目下权限不足的菜单
        if (r[i].hasOwnProperty('children')) {
            let access = handleMenu(r[i]['children'], rules);
            if (access.length > 0) {
                r[i]['children'] = access;
                if (access.length == 1) {
                    r[i]['noDropdown'] = true;
                }
            } else {
                r.splice(i, 1, false);
            }

        }
        if (r[i].hasOwnProperty('hidden') && r[i].hidden) {
            r.splice(i, 1, false);
        }
        if (r[i].hasOwnProperty('meta') && r[i]['meta'].hasOwnProperty('alias') && rules.indexOf(authMap[r[i]['meta']['alias']]) == -1) {
            r.splice(i, 1, false);
        }
    }
    let a = r.filter(item => {
        return item ? 1 : 0
    })
    return a;
}


export default {
    state,
    getters,
    actions,
    mutations
}