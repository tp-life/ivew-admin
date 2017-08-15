<style scoped>
@import '../assets/css/common.css';
body{ height: 100%}
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    /*min-height: 200px;*/
    /*height: 100%;*/
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 10px;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}



.routerLink {
    display: block;
    width: 100%;
    height: 100%;
    padding: 14px 0;
}

.layout-hide-text .layout-text {
    display: none;
}

.avaterImg {
    width: 45px;
    height: 45px;
    float: left;
}

.avaterImg img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin: 5px;
    border: 1px solid #CCC;
}

.user-info {
    line-height: 40px;
}
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
                <sidebarItem></sidebarItem>
            </Col>
            <Col :span="spanRight" style="height:100%;">
                <div class="layout-header">
                    <Row>
                        <Col span="4" offset="20">
                            <Col :xs="10" :md="8" :lg="6">
                                <div class="avaterImg">
                                    <!--<img :src="userInfo.img" />-->
                                </div>
                            </Col>
                            <Col span="12">
                                <div class="user-info">
                                    <Dropdown style="margin-left: 8px;" placement="bottom-end" @on-click="changePwd">
                                        <a href="javascript:void(0)" style="color:#000000;font-size:14px;font-wegit:400">
                                                {{userInfo.userName}} &nbsp;
                                                <Icon type="ios-arrow-down"></Icon>
                                            </a>
                                        <Dropdown-menu slot="list">
                                            <Dropdown-item name="change">修改密码</Dropdown-item>
                                            <Dropdown-item name="loginout">退出登录</Dropdown-item>
                                        </Dropdown-menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="/">首页</Breadcrumb-item>
                        <Breadcrumb-item v-if="crumb.first">{{crumb.first}}</Breadcrumb-item>
                        <Breadcrumb-item v-if="crumb.last">{{crumb.last}}</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content" :style="{minHeight:minHeight}">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import sidebarItem from './layout/sidebarItem';
export default {
    data() {
        return {
            spanLeft: 4,
            spanRight: 20
        }
    },
    created() {
        
    },
    components:{
        sidebarItem
    },
    computed: Object.assign(
        mapGetters({
            me: 'getMenu',
            crumb: 'crumb',
            userInfo: 'getUserInfo'
        }),
        {
            minHeight: function (el) {
                return  '720px'
            },
        }),
    methods: {
        changePwd(item) {
            switch (item) {
                case 'change':
                    this.$router.push('/sys/user/change');
                    break;
                case 'loginout':
                    this.$store.dispatch('loginOut');
                    let router = this;
                    let timeOut=setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                    this.$Modal.success({
                        title: '退出登录提示',
                        content: '退出成功，感谢您的使用～～',
                        'on-ok': () => {
                            clearTimeout(timeOut);
                            window.location.reload();
                        }
                    });
                    break;
            }
        },
        
    }
        
}
</script>
