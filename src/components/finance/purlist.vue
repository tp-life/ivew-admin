<template>
   <div>
       <div style="text-align:right">
                <Form ref="userSearchFrom" :model="formInline" inline>
                    <Form-item >
                        <Input type="text" style="width: 250px" v-model="formInline.pur_num" placeholder="采购单号">
                        </Input>
                    </Form-item>
                     <Form-item >
                        <Input type="text" style="width: 250px" v-model="formInline.keywords" placeholder="电话或门店名">
                        </Input>
                    </Form-item>
                    <Form-item >
                        <Select v-model="formInline.status" style="width:200px;text-align:left" >
                            <Option v-for="(item,key) in status" :value="key" :key="key">{{item}}</Option>
                        </Select>
                    </Form-item>
                   
                    <Form-item>
                        <Button type="primary" icon="ios-search" @click="search()">搜索</Button>
                    </Form-item>
                </Form>
              
     </div>
     <div>
        <Table border :columns="purchaseColumn" :data="purchase"></Table>
        <Row>
            <Col :span="12">
            <div style="margin: 10px;overflow: hidden">
                <label></label>
                <Select size="large" style="width:80px" rel="showPage" :value="searchData.pageNum+''" :placement="placement" @on-change="changePageNum">
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
        <Modal v-model="modal" width="900" :mask-closable="false" title="采购订单详情">
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
   </div>

</template>

<script>
import * as fn from '../../until/common.js';
import * as api from '../../api/common.js';

export default {
   data() {
    return {
        searchData: {
                pageNum: 20,
            },
            modal: false,
            spinShow: false,
            purchase: [],
            totals: 0,
            purchaseColumn: [
                {
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '采购单号',
                    key: 'order_sn'
                },
                {
                    title: '采购金额(元)',
                    key: 'money'
                },
                {
                    title: '采购状态',
                    key: 'status'
                },
                {
                    title: '支付状态',
                    key: 'payment_status'
                },
                {
                    title: '操作',
                    render: (h, param) => {
                        let id = param.row.id
                        return fn.newShow('*', h, this.purchaseInfo, id);
                    }
                }
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
                    title: '采购数量',
                    key: 'pur_num',
                    render: (h, param) => {
                        return param.row.pur_num + ' ( ' + param.row.minUnit_num + ' ) ';
                    }
                },
                {
                    title: '商品单价',
                    key: 'price'
                },
            ],
        status:{
            '0':'采购状态',
            pending:'待仓库确认',
            underway:'仓库已确认、处理中',
            unaccepted:'被仓库拒绝',
            deliverable:'配送中',
            completed:'已完成'
         },
        formInline:{
           pur_num:'',
           keywords:'',
           status:'0' 
        },
     }
   },
    created() {
        this.dispatch();
    },
    computed: {
        placement() {
            return this.purchase.length > 9 ? 'top' : 'bottom';
        },

    },
    methods: {
        changePage(page) {
            page = page ? page : 1;
            this.dispatch({ startCount: (page - 1) * this.searchData.pageNum });
        },
        changePageNum(num) {
            this.searchData.pageNum = parseInt(num);
            this.dispatch({ needCount: num });
        },
        dispatch(searchParams) {
            let defaultParams = {
                startCount: 0,
                needCount: this.searchData.pageNum,
                seller_id: this.seller
            };
         //   searchParams = typeof searchParams === 'object' ? searchParams : {};
            let searchData = Object.assign(defaultParams, this.formInline);
            api.allSellerPur(searchData).then((res) => {
                this.purchase = res.list;
                this.totals = res.allCount;
                // console.log(res.list);
            });
           
        },
        //采购详情
        purchaseInfo(id) {
            this.modal = true;
            if (this.order_id == id) {
                return;
            }
            this.spinShow = true;
            this.getPurchase({},id);
        },

        infoChange(page){
            page = page ? page : 1;
            this.getPurchase({ startCount: (page - 1) * this.searchData.pageNum },this.order_id);
        },
        //详情请求
        getPurchase(search,id) {
            search = search || {};
            let requestData = {
                purchase_order_id: id,
            };
            Object.assign(requestData,search);
            api.purchaseInfo(requestData).then(res => {
                this.spinShow = false;
                this.order_id = id;
                this.goodsData = res.list;
                this.goodsTotal = res.allCount;
            });
        },
      search(){
          let searchData = this.formInline;
          this.dispatch(searchData);
      }
    }


};

</script>
