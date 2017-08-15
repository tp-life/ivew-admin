<template>
    <div>
        <Row>
            <Col span="11">
            <Card>
                <p slot="title">
                    <Icon type="ios-settings-strong"></Icon>
                    &nbsp;商品分类
                </p>
                <Tree :data="orginData" @on-select-change="showAction"></Tree>
            </Card>
            </Col>
            <Col span="12" offset="1">
            <Card>
                <p slot="title">
                    <Icon type="ios-settings-strong"></Icon>
                    &nbsp;编辑分类信息
                </p>
                <Form ref="formValidate" :rules="ruleValidate" :model="formItem" :label-width="80">
                    <Form-item label="分类名称" prop="name">
                        <Input v-model="formItem.name" placeholder="请输入分类名称"></Input>
                    </Form-item>
                    <Form-item label="上级分类">
                        <Select v-model="formItem.pid" style="width:100%">
                            <Option :value="0">顶层分类</Option>
                            <Option v-for="item in selectData" :value="item.id" :key="item.id" :label="item.name">
                                <span v-for="i in item.level" v-if="i > 1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>|
                                <span v-for="i in item.level">-</span>
                                {{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" v-show="checkAuth('cate_create')" @click="handleSubmit('formValidate')">添加</Button>
                        <Button type="success" v-show="checkAuth('cate_update')" @click="editSubmit('formValidate')" style="margin-left: 8px">修改</Button>
                        <Button type="warning" v-show="checkAuth('cate_del')" @click="delCate()" style="margin-left: 8px">删除</Button>
                    </Form-item>
                </Form>
            </Card>
            </Col>
        </Row>
    
    </div>
</template>
<script>
import * as api from '../../api/common';
import * as fn from '../../until/common.js';
import { Map } from "immutable";
export default {
    data() {
        return {
            orginData: [],
            baseData: [],
            selectData: [],
            cateId: 2,
            formItem: {
                name: '',
                pid: 0,
                cate_id: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '分类名不能为空', trigger: 'blur' }
                ],
            }
        }
    },
    created() {
        this.dispatch();
    },
    computed: {
        attrData() {
            let treeData = this.orginData.concat();
            return [];

        }
    },
    methods: {
        /**
         * 组装菜单树  通过反复循环依次往父对象当中添加子数据，同时删除最下层叶子节点。最终留下父层。
         * 此方法通过数组元素索引赋值，因此会残留不相关的数组信息。最后通过递归删除不必要信息
         */
        treeData(treeData) {
            let j = 0;
            let baseSize = new Set();
            while (true) {
                let size = treeData.length;
                let a = false;  //元素删除控制位
                j = j >= size ? size - 1 : j;
                if (size < 1 || size == baseSize.size) {
                    break;
                }
                if (treeData[j].pid == 0) {
                    baseSize.add(treeData[j].id);
                }
                for (let i = 0; i < size; i++) {
                    treeData[i].title = treeData[i].name;
                    if (treeData[i].pid == treeData[j].id) {
                        a = true;
                    }
                    //解决数据位置顺序错乱导致误删
                    if (treeData[i].id == treeData[j].pid) {
                        if (!treeData[i].hasOwnProperty('children')) {
                            treeData[i].children = [];
                        }
                        treeData[i].children[treeData[j].id] = treeData[j];
                    }
                }
                if (!a && treeData[j].pid != 0) {
                    treeData.splice(j, 1);
                } else {
                    j++;
                }

                if (j > size - 1) {
                    j = 0;
                }
            }

            let datas = this.filterData(treeData);
            return treeData;
        },
        //过滤空数组
        filterData(data) {
            let size = data.length;
            for (let i = 0, j = 0; i < size; i++) {
                if (!data[j]) {
                    data.splice(j, 1);
                    continue;
                }
                if (data[j].hasOwnProperty('children')) {
                    data[j].children = this.filterData(data[j].children);
                }
                j++;
            }
            return data;
        },
        showAction(node) {
            let n = node[0];
            this.formItem.pid = n.pid;
            this.formItem.cate_id = n.id;
            this.formItem.name = n.title
        },
        //下拉框无线分类
        treeMenu(tree, pid, level) {
            for (var i = 0; i < tree.length; i++) {
                if (tree[i].pid == pid) {
                    let item = tree[i];
                    tree[i].level = level;
                    this.selectData.push(tree[i]);
                    this.treeMenu(tree, item.id, level + 1);
                }
            }
            return this.selectData;
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let map = this.formItem;
                    api.cateCreate(map).then(() => {
                        fn.notice('新增分类成功', () => {
                            this.reload();
                        });
                    });
                }
            })
        },
        editSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let map = this.formItem;
                    api.cateEdit(map).then(() => {
                        fn.notice('修改分类成功', () => {
                            this.reload();
                        });
                    });
                }
            })
        },
        delCate() {
            fn.handleDel(() => {
                api.cateDel({ cate_id: this.formItem.cate_id }).then(() => {
                    fn.notice('分类删除成功', () => {
                        this.reload();
                    });
                });
            });
        },
        checkAuth(name) {
            return fn.checkAuth(name);
        },
        dispatch() {
            api.getCate().then(response => {
                const a = [].concat(response);
                const b = [].concat(response);
                this.baseData = response;
                this.orginData = this.treeData(b);
                this.treeMenu(a, 0, 1);
            })
        },
        reload() {
            this.selectData = [];
            this.dispatch();
            this.$refs.formValidate.resetFields();
        }
    }
}
</script>
<style>
.ivu-checkbox-wrapper {
    padding-left: 8px
}

.ivu-tree-title {
    padding-left: 5px
}
</style>