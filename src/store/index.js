import Vue from "vue";
import Vuex from "vuex";
import * as actions from './actions';
import * as getters from './getters';
import menu from './modules/menu.js';
import user from './modules/user';
import rule from './modules/rule';
import goods from './modules/goods';
Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
   menu,
   user,
   rule,
   goods,
  }
})

