<template>
    <div>
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
                    title: '结算金额',
                    key: 'money'
                },
                {
                    title: '结算时间',
                    key: 'time'
                }
            ],
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
            searchParams = typeof searchParams === 'object' ? searchParams : {};
            let searchData = Object.assign(defaultParams, searchParams);
            api.sellerSettlement(searchData).then((res) => {
                this.settlement = res.list;
                this.totals = res.allCount;
            });
        }
    }

}
</script>
