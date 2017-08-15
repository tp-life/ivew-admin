<template>
   <div> 
    <div style="text-align:right">
                <Form ref="userSearchFrom" :model="formInline" inline>
                    <Form-item >
                        <Input type="text" style="width: 250px" v-model="formInline.order_num" placeholder="订单号">
                        </Input>
                    </Form-item>
                     <Form-item >
                        <Input type="text" style="width: 250px" v-model="formInline.keywords" placeholder="用户名或电话">
                        </Input>
                    </Form-item>
                    <Form-item >
                        <Select v-model="formInline.pay_type" style="width:100px;text-align:left" >
                            <Option v-for="(item,key) in payment" :value="key" :key="key">{{item}}</Option>
                        </Select>
                    </Form-item>
                   
                    <Form-item>
                        <Button type="primary" icon="ios-search" @click="searchData()">搜索</Button>
                    </Form-item>
                </Form>
     </div>

    <Table border :columns="consumerColumn" :data="tableData"></Table>
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
                    <Page :total="totals" :current="1" @on-change="changePage" :page-size="searchData.pageNum"></Page>
                </div>
            </div>
            </Col>
        </Row>
          <Modal v-model="modal" width="900" :mask-closable="false" title="订单详情">
            <div style="position: relative;">
                <Spin size="large" fix v-show="spinShow"></Spin>
            </div>
            <div v-show="!spinShow">
                <Table border :columns="goodsColumn" :data="goodsData"></Table>
                <Row>
                    <Col offset="12" :span="12">
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="goodsTotal" :current="1" @on-change="changePage" :page-size="searchData.pageNum"></Page>
                        </div>
                    </div>
                    </Col>
                </Row>
            </div>
    
            <p slot="footer"></p>
        </Modal>
    </div> 
</template>
<script>

import * as fn from '../../until/common.js';
import * as api from '../../api/common.js';
    export default {
          data() {
              return {
                pageNum: 10,
                totals:0,
                modal: false,
                spinShow: false,
                consumer: [],
                tableData:[],
                keywords:'',
                payment:{
                    '0':'支付方式',
                    online:'线上付款',
                    wechat:'微信支付',
                    alipay:'支付宝',
                    offline:'线下付款',
                    unionpay:'银联'
                },
             formInline: {
                pay_type: '0',
                order_status:'0',
                order_num:''
            },
            consumerColumn: [
                {
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '用户名',
                    key: 'name'
                },
                {
                    title:'电话',
                    key:'phone'
                },
                {
                    title: '订单号',
                    key: 'order_num'
                },
                {
                    title: '支付金额(元)',
                    key: 'payMoney'
                },
                {
                    title: '付款方式',
                    key: 'pay_type'
                },
                {
                    title:'支付时间',
                    key:'pay_time'
                },
                 {
                    title: '操作',
                    align: 'center',
                    render:(h, param) =>{
                      let id = param.row.id;
                      return fn.newShow('*', h, this.consumerInfo, id);
                    }
                },  
            ],
             goodsData: [],
            goodsTotal: 0,
            order_id: 0,
            goodsColumn: [
                {
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '商品名称',
                    key: 'name'
                },
                {
                    title: '购买数量',
                    key: 'goodsNum',
                    width:100,
                    render: (h, param) => {
                        return param.row.goodsNum + ' '+param.row.unit;
                    }
                },
                {
                    title: '商品单价',
                    key: 'price'
                },
                {
                    title:'优惠信息',
                    key:'fav'
                }
            ]
            
        }
    },
    created(){
        this.dispatch();
    },
     methods: {
        changePage(page) {
            page = page ? page : 1;
            this.dispatch({ startCount: (page - 1) * this.pageNum });
        },
        changePageNum(num) {
            //console.log(this.searchData);
            this.searchData.pageNum = parseInt(num);
           let data = Object.assign(this.formInline,{ needCount: num });
          
            this.dispatch(data);
        },
          searchData(){
            this.pageNum = 10;
            this.dispatch(this.formInline);
            //console.log(this.formInline);
        },
          dispatch(searchParams) {
            let defaultParams = {
                startCount: 0,
                needCount: this.pageNum
            };
            defaultParams = Object.assign(defaultParams,this.formInline);
            searchParams = typeof searchParams === 'object' ? searchParams : {};
            let searchData = Object.assign(defaultParams, searchParams);
           // console.log(searchData);
            api.userOrders(searchData).then((response)=>{
                this.tableData = response.list;
               // console.log(this.tableData);
                this.totals = response.allCount;
            });
        },
        consumerInfo(id) {   //采购详情
            this.modal = true;
            if (this.order_id == id) {
                return;
            }
            this.spinShow = true;
            this.getconsumer({},id);
        },
        getconsumer(search,id) {
            search = search || {};
            let requestData = {
                order_id: id,
            };
            Object.assign(requestData,search);
            api.consumerOrderInfo(requestData).then(res => {
                this.spinShow = false;
                this.order_id = id;
                this.goodsData = res.list;
                this.goodsTotal = res.allCount;
            });
        }

    },
     computed: {
        placement() {
            return 'top';
        }
    }
 }
</script>