
<template>
    <div>
        <Card>
            <p slot="title" style="color:#32c5d2">
                <Icon type="locked"></Icon>
                门店列表
            </p>
            <router-link slot="extra" to="/seller/store/add"  v-show="checkAuth('seller_create')" >
                <Icon type="ios-plus"></Icon>
                添加门店
            </router-link>
            <div style="text-align:right">
                <Form ref="userSearchFrom" :model="formInline" inline>
                    <Form-item >
                        <Input type="text" style="width: 250px" v-model="formInline.keywords" placeholder="门店/地址关键字查询">
                        </Input>
                    </Form-item>
                    <Form-item >
                        <Input type="text" v-model="formInline.sphone" placeholder="门店电话查询">
                        </Input>
                    </Form-item>
                    <Form-item>
                        <Select size="large" style="width:100px;height:32px;text-align:left" v-model="formInline.sisvalid" placeholder="状态" class="selectSearch">
                            <Option value="0">已禁用</Option>
                            <Option value="1">正常</Option>
                        </Select>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" icon="ios-search" @click="searchData">搜索</Button>
                    </Form-item>
                </Form>
            </div>
    
            <Table border  :columns="columns7" :data="tableData"></Table>
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
                        <Page :total="totals" :current="1"  @on-change="changePage" :page-size="pageNum"></Page>
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
export default{
    data() {
        return {
            curr:1,
            pageNum: 10,
            modal: false,
            id: 0,
            tableData:[],
            columns7: [
                {
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '门店名称',
                    key: 'name'
                },
                {
                    title:'门店地址',
                    key:'address',
                    width: 250,
                    align:'center',
                },
                {
                    title:'门店电话',
                    key:'phone'
                },
                {
                    title:'门店管理员',
                    width: 100,
                    key:'master'
                },
                {
                    title: '门店状态',
                    key: 'status',
                    width: 90,
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
                      width:200,
                    align: 'center',
                    render: (h, params) => {
                        let id = params.row.id;
                        let status = params.row.status;
                        return h('div', [
                            fn.newShow('seller_info',h,this.lo,'/seller/store/info',id),
                            fn.newEdit('seller_update', h, this.lo, '/seller/store/edit',id),
                            status ==1 ? fn.newStatR('seller_stat', h, this.setSta, id,0) : fn.newStatO('seller_stat', h, this.setSta,id,1),
                            fn.newDel('seller_del', h, this.del, id)
                        ]);
                    }
                }
            ],
            formInline: {
                keywords: '',
                sphone:'',
                sisvalid: ''
            },
            totals:0
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
        close() {
            this.modal = false;
        },
        del(id) {
            fn.handleDel(() => {
                api.sellerDel({ seller_id: id }).then(() => {
                    fn.notice('门店删除成功', this.searchData);
                });
            });
        },
        setSta(id, sta) {
            fn.handleSta(() => {
                api.sellerChange({ seller_id: id}).then(() => {
                    fn.notice('门店状态更改成功', this.searchData);
                });
            }, '', '您确定要更改当前门店的状态吗？');
        },
        lo(url,id) {
            this.$router.push({
                path:url,
                query:{id:id}
            });
        },
        dispatch(searchParams) {
            let defaultParams = {
                startCount: 0,
                needCount: this.pageNum
            };
            searchParams = typeof searchParams === 'object' ? searchParams : {};
            let searchData = Object.assign(defaultParams,this.formInline, searchParams);
            api.sellerLists(searchData).then((response)=>{
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
