// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import iView from 'iview';
import * as mock from './until/mock'
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false


Vue.use(iView);


router.beforeEach((to, from, next) => {
    let path = to.path.substr(1);
    let user = store.getters.baseInfo;
    if (path != 'login') {
        if (!user) {
            next('/login');
            return false;
        }
    } else {
        if (user) {
            next('/');
            return false;
        }
    }
    iView.LoadingBar.start();
    // to.matched.some(record => {console.log(record.meta)})
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
    // 路径导航条
    let path = to.path.substr(1);
    let lan = {};
    let men = store.getters.getMenu;
    if (men) {
        for (var m of men) {
            if (m.children.length) {
                for (var item of m.children) {
                    if (m.path + '/' + item.path == '/' + path) {
                        lan = {
                            first: m.name,
                            last: item.name
                        }
                        break;
                    }
                }
            }
        }
        if (JSON.stringify(lan) != '{}') {
            store.dispatch('actbreadcrumbions', lan);
        }
    }

});

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
