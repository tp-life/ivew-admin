<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person-add"></Icon>
                &nbsp;添加人员
            </p>
            <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="11">
                    <Form-item label="人员姓名" prop="name">
                        <Input v-model="formItem.name" placeholder="人员姓名"></Input>
                    </Form-item>
                    </Col>
                    <Col offset="1" span="12">
                    <Form-item label="密码" prop="password">
                        <Input v-model="formItem.password" placeholder="登陆密码" type="password"></Input>
                    </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <Form-item label="电话" prop="phone">
                        <Input v-model="formItem.phone" placeholder="电话"></Input>
                    </Form-item>
                    </Col>
                    <Col offset="1" span="12">
                    <Form-item label="所属仓库">
                        <Select v-model="formItem.repositories_id" >
                            <Option v-for="item in godown" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    </Col>
                </Row>
                <Form-item>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </Form-item>
            </Form>
        </Card>
    </div>
</template>
<script>
import * as fn from '../../until/common.js';
import * as api from '../../api/common.js';
export default {
    data() {
        return {
            godown: [],
            formItem: {
                name: '',
                password: '',
                phone: '',
                repositories_id: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '人员姓名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '人员电话不能为空', trigger: 'blur' }
                ],
            },

        }
    },
    created(){
        api.godown({needCount:40}).then(res=>{
            let arr =[];
            this.godown = res.list;
        })
    },
    mounted() {
        this.$store.dispatch('actbreadcrumbions', {
            first: '仓库人员管理',
            last: '添加人员'
        });
    },
    methods: {
        handleSubmit(name) {
            console.log(this.formItem);
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let map = this.formItem;
                    api.godownUserCreate(map).then(() => {
                        fn.notice('新增人员成功', () => { this.$router.push('/godown/user'); });
                    });
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },

    }
}
</script>