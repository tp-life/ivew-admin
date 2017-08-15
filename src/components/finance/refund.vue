
<template>
    <div>
        <Card>
            <p slot="title" style="color:#32c5d2">
                <Icon type="locked"></Icon>
                退款审批
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
                        <Select v-model="formInline.refund_status" style="width:100px;text-align:left" >
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
                '0':'退款方式',
                online:'线上付款',
                wechat:'微信支付',
                alipay:'支付宝',
                offline:'线下付款',
                unionpay:'银联'
            },
            status:{
                '0':'退款单状态',
                wait:'待退款',
                reject:'拒绝退款',
                succ:'同意退款',   
                complate:'退款完成'
            },
            columns7: [
                {
                    type: 'index',
                    width: 50,
                    align: 'center'
                },
                {
                    title: '订单号',
                    key: 'order_sn'
                },
                { 
                      title:'订单总金额',
                      key:'price',
                      render:(h, param) =>{
                         return "￥"+param.row.price;
                     }
                },
                {
                    title:'退款金额',
                    key:'refundMoney',
                    width:100,
                     render:(h, param) =>{
                         return "￥"+param.row.refundMoney;
                     }
                },
                {
                    title:'退款方式',
                    key:'pay_type',
                    width:100,
                    
                },
                {
                    title:'买家',
                    key:'name',
                },
                {
                    title:'买家电话',
                    key:'phone',
                },
                {
                    title:'退款状态',
                    key:'statusName',
                    width:90
                },
                {
                    title:'退款完成时间',
                    key:'refund_time',
                    width:150
                },
                {
                    title: '退单详情',
                    align: 'center',
                    render:(h, param) =>{
                      let status = param.row.status;
                     
                      return  fn.newShow('*',h,this.showInfo,'/finance/refundinfo',param.row.order_id);
                    }
                },
            ],
            formInline: {
                pay_type: '0',
                refund_status:'0',
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
        showInfo(url,id,money){
            this.$router.push({
                path:url,
                query:{id:id,refund:money}
            });
        },
        dispatch(searchParams) {
            let defaultParams = {
                startCount: 0,
                needCount: this.pageNum
            };
           // searchParams = typeof searchParams === 'object' ? searchParams : {};
            let searchData = Object.assign(defaultParams, this.formInline);
            api.refund(searchData).then((response)=>{
                this.tableData = response.list;
               // console.log(response.list);
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
