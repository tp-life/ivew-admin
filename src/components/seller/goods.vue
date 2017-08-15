<template>
    <div>
        <div style="text-align:right">
                <Form ref="userSearchFrom" :model="searchData" inline>
                    <Form-item >
                        <Input type="text" style="width: 250px" v-model="searchData.goods_name" placeholder="商品关键字查询">
                        </Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" icon="ios-search" @click="search">搜索</Button>
                    </Form-item>
                </Form>
            </div>
        <Table border :columns="clerkColumn" :data="clerk"></Table>
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
                goods_name:''
            },
            clerk: [],
            totals: 0,
            clerkColumn: [
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
                    title: '售价',
                    key: 'price'
                },
                {
                    title:'销量',
                    key:'sellNum',
                    render(h,param){
                        return param.row.sellNum +' '+ param.row.unit;
                    }
                },
                {
                    title:'库存量',
                    key:'save',
                    render(h,param){
                        return param.row.save +' ' + param.row.unit;
                    }
                }
            ],
        }
    },
    created() {
        this.dispatch();
    },
    computed: {
        placement() {
            return this.clerk.length > 9 ? 'top' : 'bottom';
        }
    },
    methods: {

        search(){
            this.searchData.pageNum = 20;
            this.dispatch(this.searchData);
        },
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
            searchParams = typeof searchParams === 'object' ? searchParams : {};
            let searchData = Object.assign(defaultParams,this.searchData, searchParams);
            api.sellerGoods(searchData).then((res) => {
                this.clerk = res.list;
                this.totals = res.allCount;
            });
        }
    }

}
</script>
