<template>
    <Menu theme="dark" width="auto" :open-names="[open]" :active-name="active" :accordion='true'>
        <div class="layout-logo-left">
            明亿商超系统
        </div>
        <template v-for="item in getMenu">
            <router-link v-if="item.noDropdown && item.children.length > 0" :to="item.path+'/'+item.children[0].path">
                <Menu-item :name="item.path+'/'+item.children[0].path">
                    <Icon :type="item.icon"></Icon>
                    {{item.children[0].name}}</Menu-item>
            </router-link>
            <Submenu v-if="!item.noDropdown && item.children.length" :name="item.path">
                <template slot="title">
                    <Icon :type="item.icon"></Icon>
                    <span class="layout-text">{{item.name}}</span>
                </template>
                <template v-for="m in item.children">
                    <router-link v-if="!m.noDropdown" :to="item.path+'/'+m.path">
                        <Menu-item :name="item.path+'/'+m.path">{{m.name}}</Menu-item>
                    </router-link>
                </template>
            </Submenu>
        </template>
    
    </Menu>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            open: '',
            active: ''
        };
    },
    created() {
        this.$store.dispatch('getAllAuthMenu');
        let path = this.$route.path.substr(1);
        let index = path.indexOf('/');
        let prefix = path.substr(0, index);
        let last = path.substr(index+1);
        index = last.indexOf('/');
        let active = '/'+prefix+'/'+last
        if(index != -1){
            active = '/'+prefix+'/'+last.substr(0,last.indexOf('/'));
        }
        this.open = '/' + prefix;
        this.active = active;
    },
    computed: mapGetters({
        getMenu: "getMenu"
    }),


}
</script>
<style>
a,
a:hover,
a:active,
a:link {
    text-decoration: none
}

.layout-menu-left {
    background: #1c2438;
}

.ivu-menu-dark {
    background: #1c2438;
}

.ivu-menu-submenu-title {
    background: #1c2438!important;
}

.layout-header {
    height: 55px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    padding-top: 5px;
}

.layout-logo-left {
    width: 90%;
    height: 40px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
    color: #fff;
    text-align: center;
    line-height: 40px;
    font-weight: 500;
    font-size: 18px
}
</style>
