
<template>
    <div>
        <Card>
            <p slot="title" style="color:#32c5d2">
                <Icon type="locked"></Icon>
                门店店员
            </p>
            <div style="text-align:right">
                <Form ref="userSearchFrom" :model="formInline" inline>
                    <Form-item >
                        <Input type="text" style="width: 250px" v-model="formInline.seller_name" placeholder="门店名称查询">
                        </Input>
                    </Form-item>
                    <Form-item >
                        <Input type="text" v-model="formInline.name" placeholder="店员名称">
                        </Input>
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
                    title: '店员姓名',
                    key: 'name'
                },
                {
                    title:'所属门店',
                    key:'seller',
                    align:'center',
                },
                {
                    title:'店员电话',
                    key:'phone'
                },
                {
                    title: '店员状态',
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
            ],
            formInline: {
                seller_name: '',
                name:''
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
        dispatch(searchParams) {
            let defaultParams = {
                startCount: 0,
                needCount: this.pageNum
            };
            searchParams = typeof searchParams === 'object' ? searchParams : {};
            let searchData = Object.assign(defaultParams,this.formInline, searchParams);
            api.assistantsAll(searchData).then((response)=>{
                this.tableData = response.list;
                this.totals = response.allCount;
            });
        },
        
    }
}
</script>
<style>
.selectSearch .ivu-select-selection {
    height: 32px!important;
}
</style>
