<style scoped>
.userInfoItem {
    color: #9A12B3!important
}
</style>
<template>
    <div>
        <Modal v-model="show" @on-ok="cancel" @on-cancel="cancel" :title="name +'的个人资料'" width="900">
            <div>
                <Row :gutter="20">
                    <Col span="2" offset="1">
                    <!--<img :src="img" class="img-thumbnail" style="width:120px;height:120px" />-->
                    </Col>
                    <Col span="20">
                    <Row style="margin:15px">
                        <Col span="8">
                        <label>姓名：</label><span class="userInfoItem">{{name}}</span></Col>
                        
                        <Col span="8">
                        <label>电话：</label><span class="">{{phone}}</span></Col>
                        <Col span="8">
                        <label>邮箱：</label><span class="">{{email}}</span></Col>
                    </Row>
                    <Row style="margin:15px">
                        
                        <Col span="8">
                        <label>用户状态：</label><span class="userInfoItem">{{status >0?'正常':'已禁用'}}</span></Col>
                        <Col span="8">
                        <label>注册时间：</label><span class="">{{datetime}}</span></Col>
    
                    </Row>
                    <Row style="margin:15px">
                        <Col span="8">
                        <label>用户权限组：</label><span class="userInfoItem">{{authText}}</span></Col>
                    </Row>
                    </Col>
                </Row>
            </div>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>
<script>
import * as api from '../../api/common.js';
export default {
    name: 'userInfo',
    props: {
        userId: Number,
        modal: Boolean
    },
    data() {
        return {
            name: '',
            phone: '',
            email: '',
            age: '',
            datetime: '',
            img: '',
            status: 1,
            auth: []
        };
    },
    computed: {
        show() {
            return this.modal
        },
        authText() {
            return Object.values(this.auth).join(',');
        }
    },
    watch: {
        modal() {
            if (this.modal) {
                api.userInfo({ uid: this.userId }).then((info) => {
                    let group=[];
                    if(info.hasOwnProperty('group')){
                        group= info.group.map((item)=>{
                            return item.name;
                        })
                    }
                    info.auth = group;
                    Object.assign(this.$data, info);
                });
            }
        }
    },
    methods: {
        cancel() {
            this.$emit('close');
        }
    }

}
</script>
