
<template>
    <div>
        <Card>
            <p slot="title" style="color:#32c5d2">
                <Icon type="locked"></Icon>
                仓库人员
            </p>
            <router-link slot="extra" to="/godown/useradd" v-show="checkAuth('godown_adduser')">
                <Icon type="ios-plus"></Icon>
                添加人员
            </router-link>
            <div style="text-align:right">
                <Form ref="userSearchFrom" :model="formInline" inline>
                    <Form-item>
                        <Input type="text" style="width: 250px" v-model="formInline.keywords" placeholder="人员名称查询">
                        </Input>
                    </Form-item>
                    <Form-item>
                        <Input type="text" v-model="formInline.phone" placeholder="人员电话">
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
                    <Select size="large" style="width:80px" rel="showPage" :value="pageNum+''" :placement="placement" @on-change="changePageNum">
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
                    title: '工作人员',
                    key: 'name'
                },
                {
                    title: '人员电话',
                    key: 'phone'
                },
                {
                    title: '所属仓库',
                    key: 'repName',
                    align: 'center',
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, param) => {
                        return fn.newDel('brand_del', h, this.del, param.row.id)
                    }
                },
            ],
            formInline: {
                keywords: '',
                phone: ''
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
            this.dispatch(this.formInline);
        },
        del(id) {
            fn.handleDel(() => {
                api.godownUserDel({ uid: id }).then(() => {
                    fn.notice('仓库人员删除成功', this.searchData);
                });
            });
        },
        dispatch(searchParams) {
            let defaultParams = {
                startCount: 0,
                needCount: this.pageNum
            };
            searchParams = typeof searchParams === 'object' ? searchParams : {};
            let searchData = Object.assign(defaultParams, this.formInline, searchParams);
            api.godownUser(searchData).then((response) => {
                this.tableData = response.list;
                this.totals = response.allCount;
            });
        },
        checkAuth(name){
            return fn.checkAuth(name);
        }
    }
}
</script>
<style>
.selectSearch .ivu-select-selection {
    height: 32px!important;
}
</style>
