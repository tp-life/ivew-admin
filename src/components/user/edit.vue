<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person-add"></Icon>
                &nbsp;编辑用户
            </p>
            <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
                <Form-item label="用户名称" prop="name">
                    <Input v-model="formItem.name" placeholder="请输入用户名称"></Input>
                </Form-item>
                <Form-item label="权限分组" prop="auth">
                    <Select v-model="formItem.auth" placeholder="请选择用户权限" :multiple="true">
                        <Option v-for="item in auth" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </Form-item>
                <Form-item label="联系电话" prop="phone">
                    <Input v-model="formItem.phone" placeholder="请确认用户联系电话"></Input>
                </Form-item>
                <!--<Form-item label="邮箱" prop="email">
                    <Input v-model="formItem.email" placeholder="请确认用户邮箱"></Input>
                </Form-item>-->
                <Form-item label="是否启用">
                    <i-switch v-model="formItem.status">
                        <span slot="open">启用</span>
                        <span slot="close">禁用</span>
                    </i-switch>
                </Form-item>
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
import * as ac from '../../data/';
export default {
    data() {
        const validatePhone = (rule, value, callback) => {
            let peg = '/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/';
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.formCustom.passwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            auth: [],
            formItem: {
                uid: '',
                name: '',
                auth: [],
                status: true,
                phone: '',
                email: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                email: [
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                auth: [
                    { required: true, type: 'array', min: 1, message: '至少选择一个权限分组', trigger: 'change' },
                    { type: 'array', max: 5, message: '最多选择五个权限分组', trigger: 'change' }
                ],
                phone: [
                    { required: true, pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入电话', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        let uid = ac.userInfo();
        this.formItem.uid = this.$route.query.userId; 
        api.userGroup({uid:uid.id}).then((lists) => {
            this.auth = lists;
        });
        api.userInfo({ uid: this.$route.query.userId }).then((info) => {
            let a = info.group.map((item) => {
                return Number(item.id);
            })
            let d = {
                id: info.id, name: info.name, auth: a,
                status: Boolean(info.status), phone: info.phone, email: info.email
            };
            this.formItem.auth = a;
            Object.assign(this.formItem, d);

        })
    },
    mounted() {
        this.$store.dispatch('actbreadcrumbions', {
            first: '用户中心',
            last: '修改用户信息'
        });
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let map = this.formItem;
                    let status = Number(map.status);
                    let d = Object.assign({}, map, { status: status });
                    let requestData ={
                          uname:map.name,
                          upwd:  map.pwd,
                          surePwd:map.s_pwd,
                          uphone:map.phone,
                          auth:map.auth,
                          uisvalid:Number(map.status),
                          uid:this.formItem.uid
                        };
                    api.modUser(requestData).then(() => {
                        fn.notice('用户修改成功', () => { this.$router.push('/sys/user'); });
                    });
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>