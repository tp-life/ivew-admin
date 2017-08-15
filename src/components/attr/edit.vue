<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person-add"></Icon>
                &nbsp;添加模板
            </p>
            <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
                <Form-item label="模板名称" prop="name">
                    <Input v-model="formItem.name" placeholder="请输入模板名称"></Input>
                </Form-item>
    
                <Form-item label="所属类别" >
                    <!-- <Select v-model="formItem.types" placeholder="请选择所属分类" :multiple="true">
                        <Option v-for="item in classify" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select> -->
                    <cate ref="cate" :active="cates"></cate>
                </Form-item>
                <Form-item label="是否启用">
                    <i-switch v-model="formItem.status">
                        <span slot="open">启用</span>
                        <span slot="close">禁用</span>
                    </i-switch>
                </Form-item>
                <Form-item label="添加属性">
                    <attr ref="createAttr" :attr="classify"></attr>
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
import attr from '../common/temp';
import cate from '../common/cate';
export default {
    data() {
        return {
            classify: [],
            cates:0,
            formItem: {
                id:'',
                name: '',
                status: true,
            },
            ruleValidate: {
                name: [
                    { required: true, message: '组名不能为空', trigger: 'blur' }
                ],
                types: [
                    { required: true, type: 'array', min: 1, message: '请选择一个分类', trigger: 'change' }
                ]
            },

        }
    },
    components: {
        attr,
        cate
    },
    created() {
        this.formItem.id = this.$route.query.id;
        api.getAttrTempInfo({attr_id:this.$route.query.id}).then(response=>{
            this.formItem.status = Boolean(response.status);
            this.formItem.name = response.name;
            this.cates = response.catergoy_id;
            let classify = JSON.parse(response.attribute_options).map(item=>{
                let attr ={
                    keys:item.attribute_name,
                    alias:item.attribute_id,
                    vs:new Set(item.options)
                };
                return attr;
            })
            this.classify = classify
        })
    },
    mounted() {
        this.$store.dispatch('actbreadcrumbions', {
            first: '属性模板',
            last: '编辑模板'
        });
    },
    methods: {
        handleSubmit(name) {
            let attr = this.$refs.createAttr.dataMap;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let a = [];
                    for (let i = 0; i < attr.length; i++) {
                        let d = Array.from(attr[i].vs);
                        if (!attr[i].keys || !attr[i].alias || d.length < 1) {
                            continue;
                        }
                        let spec = {
                            attribute_id:attr[i].alias,
                            attribute_name:attr[i].keys,
                            options:d
                        }
                        a.push(spec);
                    }
                    let map={
                        attr:a,
                        category:this.$refs.cate.cates.pop(),
                        status:Number(this.formItem.status),
                        name:this.formItem.name,
                        id: this.formItem.id 
                    }
                    api.updateAttrTemp(map).then(() => {
                        fn.notice('修改属性模板成功', () => { this.$router.push('/pro/attrtemp'); });
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