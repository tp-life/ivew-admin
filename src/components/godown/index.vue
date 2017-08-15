
<template>
    <div>
        <Card>
            <p slot="title" style="color:#32c5d2">
                <Icon type="locked"></Icon>
                仓库列表
            </p>
            <router-link slot="extra" to="/godown/add">
                <Icon type="ios-plus"></Icon>
                添加仓库
            </router-link>
            <div style="text-align:right">
                <Form ref="userSearchFrom" :model="formInline" inline>
                    <Form-item prop="name">
                        <Input type="text" v-model="formInline.name" placeholder="仓库名">
                        </Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" icon="ios-search" @click="searchData">搜索</Button>
                    </Form-item>
                </Form>
            </div>
    
            <Table border :columns="columns7" :data="tableData"></Table>
            <Row>
                <Col :span="12">
                <div style="margin: 10px;overflow: hidden">
                    <label></label>
                    <Select size="large" style="width:80px" rel="showPage" :value="String(pageNum)" :placement="placement" @on-change="changePageNum">
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
                        <Page :total="totals" :current="1" @on-change="changePage" :page-size="pageNum"></Page>
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
export default {
    data() {
        return {
            curr: 1,
            pageNum: 10,
            modal: false,
            id: 0,
            tableData: [],
            columns7: [
                {
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '仓库名称',
                    key: 'name'
                },
                {
                    title: '仓库地址',
                    key: 'address'
                },
                {
                    title: '状态',
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
                            fn.newEdit('godown_update', h, this.lo, '/godown/edit', id),
                            status == 1 ? fn.newStatR('godown_status', h, this.setSta, id, 0) : fn.newStatO('godown_status', h, this.setSta, id, 1),
                            fn.newDel('godown_del', h, this.del, id)
                        ]);
                    }
                }
            ],
            formInline: {
                name: '',
                status: ''
            },
            totals: 0
        }
    },
    created() {
        this.dispatch();
    },
    computed: {
        placement() {
            return this.tableData.length > 9 ? 'top' : 'bottom';
        }
    },
    methods: {
        changePage(page) {
            page = page ? page : 1;
            this.dispatch({ startCount: (page - 1) * this.pageNum });
        },
        changePageNum(num) {
            this.pageNum = parseInt(num);
            this.dispatch({ needCount: num });
        },
        searchData() {
            this.pageNum = 10;
            this.dispatch({
                keywords: this.formInline.name
            });
        },
        info(id) {
            this.modal = true;
            this.id = parseInt(id);
        },
        close() {
            this.modal = false;
        },
        del(id) {
            fn.handleDel(() => {
                api.godownDel({ id: id }).then(() => {
                    fn.notice('仓库删除成功', this.searchData);
                });
            });
        },
        setSta(id, sta) {
            fn.handleSta(() => {
                api.godownStatus({ id: id}).then(() => {
                    fn.notice('仓库状态更改成功', this.searchData);
                });
            }, '', '您确定要更改当前仓库的状态吗？');
        },
        lo(url, id) {
            this.$router.push({
                path: url,
                query: { id: id }
            });
        },
        dispatch(searchParams) {
            let defaultParams = {
                startCount: 0,
                needCount: this.pageNum,
                keywords: this.formInline.name,
            };
            searchParams = typeof searchParams === 'object' ? searchParams : {};
            let searchData = Object.assign(defaultParams, searchParams);
            api.godown(searchData).then((response) => {
                this.tableData = response.list;
                this.totals = response.allCount;
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
