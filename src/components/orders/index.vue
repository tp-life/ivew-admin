
<template>
    <div>
        <Card>
            <p slot="title" style="color:#32c5d2">
                <Icon type="locked"></Icon>
                订单管理
            </p>
            <div style="text-align:right">
                <Form ref="userSearchFrom" :model="formInline" inline>
                    <Form-item >
                        <Input type="text" style="width: 250px" v-model="formInline.order_num" placeholder="订单号">
                        </Input>
                    </Form-item>
                    <Form-item >
                        <Select v-model="formInline.pay_type" style="width:100px;text-align:left" >
                            <Option v-for="(item,key) in payment" :value="key" :key="key">{{item}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item >
                        <Select v-model="formInline.order_status" style="width:100px;text-align:left" >
                            <Option v-for="(item,key) in status" :value="key" :key="key">{{item}}</Option>
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
            id: 0,
            tableData:[],
            payment:{
                '0':'支付方式',
                online:'线上付款',
                wechat:'微信支付',
                alipay:'支付宝',
                offline:'线下付款',
                unionpay:'银联'
            },
            status:{
                '0':'订单状态',
                wait:'待付款',
                confim:'待发货',
                shipments:'已发货',   
                complate:'已完成',
                cacel:'已取消',
                receive:'已收货',
                pay:'待后台确认',
                confim_fail:'后台确认失败',
            },
            columns7: [
                {
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '订单号',
                    key: 'order_sn'
                },
                {
                    title:'订单金额',
                    key:'amount',
                    width:90
                },
                {
                    title:'实际付款',
                    key:'price',
                    width:90
                },
                {
                    title:'付款方式',
                    key:'pay_type_name',
                    width:90
                    
                },
                {
                    title:'买家',
                    key:'buyer',
                },
                {
                    title:'买家电话',
                    key:'shipping_phone',
                },
                {
                    title:'订单状态',
                    key:'order_status_name',
                    width:90
                },
                {
                    title:'下单时间',
                    key:'created_at',
                    width:150
                },
                {
                    title: '操作',
                    align: 'center',
                    render:(h, param) =>{
                      return  fn.newShow('*',h,this.showInfo,'/order/info',param.row.id);
                    }
                },
            ],
            formInline: {
                pay_type: '0',
                order_status:'0',
                order_num:''
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
        showInfo(url,id){
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
            let searchData = Object.assign(defaultParams, searchParams);
            api.orderLists(searchData).then((response)=>{
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
