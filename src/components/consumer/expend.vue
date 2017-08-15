<template>
    <div>
        <Table border :columns="consumerColumn" :data="consumer"></Table>
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
import * as api from '../../api/common.js';
import * as fn from '../../until/common.js';
export default {
    props: ['consumer_id'],
    data() {
        return {
            searchData: {
                pageNum: 20,
            },
            modal: false,
            spinShow: false,
            consumer: [],
            totals: 0,
            consumerColumn: [
                {
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '订单号',
                    key: 'order_num'
                },
                {
                    title:'卖家信息',
                    key:'seller'
                },
                {
                    title: '订单总价',
                    key: 'amount'
                },
                {
                    title: '支付金额',
                    key: 'price'
                },
                {
                    title: '订单状态',
                    key: 'order_status'
                },
                {
                    title:'支付方式',
                    key:'pay_type'
                },
                {
                    title: '操作',
                    render: (h, param) => {
                        let id = param.row.id
                        return fn.newShow('*', h, this.consumerInfo, id);
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
    created() {
        this.dispatch();
    },
    computed: {
        placement() {
            return this.consumer.length > 9 ? 'top' : 'bottom';
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
                consumer_id: this.consumer_id
            };
            searchParams = typeof searchParams === 'object' ? searchParams : {};
            let searchData = Object.assign(defaultParams, searchParams);
            api.consumerOrder(searchData).then((res) => {
                this.consumer = res.list;
                this.totals = res.allCount;
            });
        },
        //采购详情
        consumerInfo(id) {
            this.modal = true;
            if (this.order_id == id) {
                return;
            }
            this.spinShow = true;
            this.getconsumer({},id);
        },

        infoChange(page){
            page = page ? page : 1;
            this.getconsumer({ startCount: (page - 1) * this.searchData.pageNum },this.order_id);
        },
        //详情请求
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
    }
}
</script>
