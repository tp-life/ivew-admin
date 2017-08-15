<template>
    <div>
        <div style="text-align:right">
                <Form ref="userSearchFrom" :model="formInline" inline>
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
        <Table border :columns="settlementColumn" :data="settlement"></Table>
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
    </div>
</template>
<script>
import * as api from '../../api/common.js';
export default {
    props: ['seller'],
    data() {
        return {
            searchData: {
                pageNum: 20,

            },
            settlement: [],
            totals: 0,
            settlementColumn: [
                {
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title:'门店',
                    key:'name'

                },
                {
                    title: '结算金额(元)',
                    key: 'money'
                },
                {
                    title: '结算时间',
                    key: 'time'
                },
                {
                    title: '结算状态',
                    key:'status'
                }
            ],
            status:{
                '-1':'结算状态',
                '0':'待支付',
                '1':'已完成',
                '2':'已拒绝'
            },
            
            formInline:{
                keywords:'',
                status:'-1'
            }
            
        }
        
    },
    created() {
        this.dispatch();
    },
    computed: {
        placement() {
            return this.settlement.length > 9 ? 'top' : 'bottom';
        }
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
           //searchParams = typeof searchParams === 'object' ? searchParams : {};
            let searchData = Object.assign(defaultParams, this.formInline);
            api.allSellerPayments(searchData).then((res) => {
                this.settlement = res.list;
                this.totals = res.allCount;
            });
        },
        search(){
            this.dispatch(this.formInline);
        }
    }

}
</script>
