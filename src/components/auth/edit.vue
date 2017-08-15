<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person-add"></Icon>
                &nbsp;修改分组
            </p>
            <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
                <Form-item label="分组名称" prop="name">
                    <Input v-model="formItem.name" placeholder="请输入分组名称"></Input>
                </Form-item>
    
                <Form-item label="描述">
                    <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </Form-item>
                <Form-item label="是否启用">
                    <i-switch v-model="formItem.status">
                        <span slot="open">启用</span>
                        <span slot="close">禁用</span>
                    </i-switch>
                </Form-item>
                <Form-item label="权限">
                    <Table :columns="authHeader" :data="authData"></Table>
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
            auth: new Set(),
            formItem: {
                id:'',
                name: '',
                desc: '',
                auth: [],
                status: true,
            },
            ruleValidate: {
                name: [
                    { required: true, message: '组名不能为空', trigger: 'blur' }
                ],
            },
            authHeader: [
                {
                    title: '所属模块',
                    key: 'name',
                    width: 200,
                    algin: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value: params.row.checkAll
                            },
                            on: {
                                'on-change': (event) => {
                                    this.change(event, params.index);
                                }
                            },
                        }, params.row.name);

                    }
                },
                {
                    title: '权限',
                    key: 'rule',
                    render: (h, params) => {
                        let check = [];
                        let rule = params.row.rule;
                        for (let keys in rule) {
                            let c = h('Checkbox', {
                                props: {
                                    label: keys,
                                },
                                on: {
                                    'input': (event) => {
                                        if (event)
                                            this.auth.add(keys);
                                        else
                                            this.auth.delete(keys);
                                    }
                                },
                            }, rule[keys]);
                            check.push(c);
                        }
                        return h('Checkbox-group', {
                            props: {
                                value: params.row.checkout,
                            },
                        }, check)
                    }
                },
            ],
            authData: []

        }
    },
    created() {
        this.formItem.id =this.$route.query.id;
        api.groupInfo({ gid: this.$route.query.id }).then((info) => {
            let d = {
                id: info.id, name: info.name, auth: info.rule,desc:info.desc,
                status: Boolean(info.status),
            };
            Object.keys(info.rule).map((item) => {
                this.auth.add(String(item));
            })
            Object.assign(this.formItem, d);
            return this;
        }).then((self) => {
            api.getRule().then((lists) => {
                lists = lists.map(function (item) {
                    item.checkAll = false;
                    let checkout = [];
                    for (let i in item.rule) {
                        if (self.auth.has(i)) {
                            checkout.push(i);
                        }
                    }
                    item.checkout = checkout;
                    return item;
                })
                this.authData = lists;
            })
        })

    },
    mounted() {
        this.$store.dispatch('actbreadcrumbions', {
            first: '角色分组',
            last: '编辑角色'
        });
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let map = this.formItem;
                    map.auth = Array.from(this.auth);
                    let requestData = {
                        gid:map.id,
                        gname:map.name,
                        gdesc:map.desc,
                        gisvalid:Number(map.status),
                        auth:map.auth
                    };
                    api.updateGroup(requestData).then(() => {
                        fn.notice('分组修改成功', () => { this.$router.push('/sys/group'); });
                    });
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        change(bstop, index) {
            this.authData[index].checkAll = bstop;
            let checkAll = Object.keys(this.authData[index].rule);
            if (!bstop) {
                checkAll.map((item) => {
                    this.auth.delete(item);
                })
                checkAll = [];
            } else {
                checkAll.map((item) => {
                    this.auth.add(item);
                })
            }
            this.authData[index].checkout = checkAll;
        }
    }
}
</script>