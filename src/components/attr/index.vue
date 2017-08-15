
<template>
    <div>
        <Card>
            <p slot="title" style="color:#32c5d2">
                <Icon type="locked"></Icon>
                属性模板
            </p>
            <router-link slot="extra" to="/pro/attrtemp/add" v-show="checkAuth('attr_create')">
                <Icon type="ios-plus"></Icon>
                添加模板
            </router-link>
            <div style="text-align:right">
                <Form ref="userSearchFrom" :model="formInline" inline>
                    <Form-item style="text-align:left;width:300px">
                        <cate ref="searchCate" :active="formInline.cateid"></cate>
                    </Form-item>
                    <Form-item prop="name">
                        <Input type="text" v-model="formInline.name" placeholder="模板名">
                        </Input>
                    </Form-item>
                    <Form-item prop="status">
                        <Select size="large" style="width:100px;height:32px;text-align:left" v-model="formInline.status" placeholder="状态" class="selectSearch">
                            <Option value="0">已禁用</Option>
                            <Option value="1">正常</Option>
                        </Select>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" icon="ios-search" @click="searchData">搜索</Button>
                    </Form-item>
                </Form>
            </div>
    
            <Table border :columns="columns7" :data="attrLists"></Table>
            <Row>
                <Col :span="12">
                <div style="margin: 10px;overflow: hidden">
                    <label></label>
                    <Select size="large" style="width:80px" rel="showPage" :value="formInline.pageNum+''" :placement="placement" @on-change="changePageNum">
                        <Option value="10">10</Option>
                        <Option value="20">20</Option>
                        <Option value="50">50</Option>
                        <Option value="100">100</Option>
                    </Select>
                </div>
                </Col>
                <Col :span="12">
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="totals" :current="1" @on-change="changePage" :page-size="formInline.pageNum"></Page>
                    </div>
                </div>
    
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import * as fn from '../../until/common.js';
import * as api from '../../api/common.js';
import cate from '../common/cate';
export default {
    data() {
        return {
            curr: 1,
            id: 0,
            columns7: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '模板名称',
                    key: 'name',
                },
                {
                    title: "所属分类",
                    key: 'cateName'
                },
                {
                    title: '当前状态',
                    key: 'status',
                    align: 'center',
                    render(h, param) {
                        return h('Icon', {
                            props: {
                                type: param.row.status == 1 ? 'checkmark-round' : 'close-circled',
                            },
                            style: {
                                color: param.row.status == 1 ? '#00cc66' : '#ff3300'
                            }
                        });
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        let id = params.row.id;
                        let status = params.row.status;
                        return h('div', [
                            fn.newEdit('cate_update', h, this.lo, '/pro/cate/edit', id),
                            fn.newDel('cate_del', h, this.del, id)
                        ]);
                    }
                }
            ],
            lists: [],
            formInline: {
                name: '',
                status: '',
                pageNum: 10,
                cateid:0
            }
        }
    },
    created() {
        this.dispatch();
    },
    components:{
        cate
    },
    computed: {
        attrLists() {
            if (!this.lists || typeof this.lists !== 'object') {
                return [];
            }
            return this.lists.datas;
        },
        totals() {
            return this.lists ? parseInt(this.lists.count) : 0;
        },
        placement() {
            return this.attrLists ? (this.attrLists.length > 9 ? 'top' : 'bottom') : "bottom";
        }

    },
    methods: {
        checkAuth(name){
            return fn.checkAuth(name);
        },
        changePage(page) {
            page = page ? page : 1;
            this.dispatch({ startCount: (page - 1) * this.formInline.pageNum });
        },
        changePageNum(num) {
            this.formInline.pageNum = num;
            this.dispatch();
        },
        searchData() {
            this.formInline.pageNum = 10;
            this.formInline.cateid=this.$refs.searchCate.cates.pop();
            this.dispatch();
        },

        del(id) {
            fn.handleDel(() => {
                api.delAttr({ attr_id: id }).then(() => {
                    fn.notice('属性模板删除成功', this.dispatch());
                });
            });
        },
        lo(url, id) {
            this.$router.push({
                path: url,
                query: { id: id }
            });
        },
        dispatch(p) {
            p = p || {}
            let search = {
                startCount:0,
                needCount:this.formInline.pageNum,
                status:String(this.formInline.status),
                name:this.formInline.name,
                cateid:this.formInline.cateid
            }

            api.getAttrLists(Object.assign(search,p)).then(response => {
                this.lists = response;
            });
        }
    }
}
</script>
<style>
.selectSearch .ivu-select-selection {
    height: 32px!important;
}
</style>
