<style scoped>
    @import '../../assets/css/login.css';

</style>
<template>
    <div id="loginLayout" :style="{width:style.witdh+'px',height:style.height+'px'}">
        <div class="container">
            <section id="content">
                <form action="" ref="loginFrom">
                    <h1>明亿超市智能营销平台</h1>
                    <div>
                        <input type="text" placeholder="用户名" required="" id="username" />
                    </div>
                    <div>
                        <input type="password" placeholder="密码" required="" id="password" />
                    </div>
                    <div>	
                        <button type="button" @click="loginIn('loginFrom')">登录</button>
                        <!--<a href="#">Register</a>-->
                    </div>
                </form><!-- form -->
                <!-- button -->
            </section><!-- content -->
        </div><!-- container -->
    </div>
</template>
<script>
import * as api from '../../api/common.js';
import { mapGetters } from 'vuex'
    export default{
        data(){
            return {    
            };
        },
        created(){
            console.log('login');
            this.checkLogin();
        },
        computed:Object.assign(mapGetters({
            info:'baseInfo'
        }),{
            style(){
                let height = window.innerHeight;
                let width = window.innerWidth;
                return { width:width,height:height}
            }
        }),
        watch:{
            info(){
                console.log('login','watch');
                this.checkLogin();
            }
        },
        methods:{
            loginIn(name){
                let dom =this.$refs[name];
                let username =dom.querySelector('#username').value ;
                let pwd = dom.querySelector('#password').value;
                let o =this;
                if(!username){
                    this.$Notice.error({
                        title: '请填写用户名'
                    });
                    return;
                }
                if(!pwd){
                    this.$Notice.error({
                        title: '请填写密码'
                    });
                    return;
                }
                api.Login({
                    uname:username,
                    upwd:pwd
                }).then((user) => {
                    o.$store.dispatch('Login',user);
                })
            },
            checkLogin(){
                 if (this.info) {
                    this.$router.push('/');
                }
            }
        }
    }
</script>