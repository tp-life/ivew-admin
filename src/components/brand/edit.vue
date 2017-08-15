<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person-add"></Icon>
                &nbsp;添加品牌
            </p>
            <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
                <Form-item label="品牌名称" prop="name">
                    <Input v-model="formItem.name" placeholder="请输入品牌名称"></Input>
                </Form-item>
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
export default {
    data() {
        return {
            classify: [],
            formItem: {
                id:'',
                name: '',
                status: true,
            },
            ruleValidate: {
                name: [
                    { required: true, message: '品牌名不能为空', trigger: 'blur' }
                ],
            },

        }
    },
    created(){
        this.formItem.id = this.$route.query.id;
        api.brandInfo({bid:this.formItem.id}).then(response=>{
            this.formItem.name = response.name;
            this.formItem.status = Boolean(response.status);
        });
    },
    mounted() {
        this.$store.dispatch('actbreadcrumbions', {
            first: '品牌管理',
            last: '编辑品牌'
        });
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let map = this.formItem;
                    let requestData ={
                        bid:map.id,
                        bname:map.name,
                        bisvalid:Number(map.status)
                    }
                    api.brandEdit(requestData).then(() => {
                        fn.notice('修改品牌成功', () => { this.$router.push('/pro/brand'); });
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