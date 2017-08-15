
<template>
    <div>
        <Card>
            <p slot="title" style="color:#32c5d2">
                <Icon type="locked"></Icon>
                商品中心
            </p>
            <router-link slot="extra" to="/pro/goods/add">
                <Icon type="ios-plus"></Icon>
                添加商品
            </router-link>
            <div style="text-align:right">
                <Form ref="userSearchFrom" :model="formInline" inline>
                    <Form-item>
                        <Input type="text" style="width:300px" v-model="formInline.name" placeholder="商品">
                        </Input>
                    </Form-item>
                    <Form-item>
                        <Select size="large" style="width:150px;height:32px;text-align:left" v-model="formInline.brand" placeholder="品牌" class="selectSearch">
                            <Option value="">全部品牌</Option>
                            <Option v-for="item in brands" :key="item.id" :value="item.id">{{item.name}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item style="text-align:left;width:200px">
                        <cate @change="cateChange"></cate>
                    </Form-item>
    
                    <Form-item prop="status">
                        <Select size="large" style="width:100px;height:32px;text-align:left" v-model="formInline.status" placeholder="状态" class="selectSearch">
                            <Option value="">全部</Option>
                            <Option value="0">下架</Option>
                            <Option value="1">上架</Option>
                        </Select>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" icon="ios-search" @click="searchData">搜索</Button>
                    </Form-item>
                </Form>
            </div>
    
            <Table border :columns="columns7" :data="attrLists"></Table>
            <Row>
                <Col :span="12">
                <div style="margin: 10px;overflow: hidden">
                    <label></label>
                    <Select size="large" style="width:80px" rel="showPage" :value="formInline.pageNum+''" :placement="placement" @on-change="changePageNum">
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
                        <Page :total="totals" :current="1" @on-change="changePage" :page-size="formInline.pageNum"></Page>
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
import cate from '../common/cate';
export default {
    data() {
        return {
            classify: [],
            brands: [],
            curr: 1,
            id: 0,
            columns7: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center',
                    fixed: 'left',
                },
                {
                    title: '商品名称',
                    key: 'goods_name',
                    width: 200,
                    fixed: 'left',
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                'click': () => {
                                    this.$router.push('/pro/goods/info');
                                    ;
                                }
                            }
                        }, params.row.goods_name)
                    }
                }, {
                    title: '品牌',
                    key: 'brand',
                    width: 100
                },
                {
                    title: "分类",
                    key: 'category',
                    width: 100
                },
                {
                    title: '供应商',
                    key: 'seller',
                    width: 200
                },
                {
                    title: '当前状态',
                    key: 'status',
                    width: 90,
                    align: 'center',
                    render(h, params) {
                        let type = 'close-circled';
                        let color = '#ff3300';
                        if (params.row.status == 1) {
                            type = 'checkmark-round';
                            color = '#00cc66';
                        }
                        return h('Icon', {
                            props: { type: type },
                            style: { color: color }
                        });
                    }
                },
                {
                    title: '产地',
                    key: 'place',
                    width: 80
                },
                {
                    title: '厂家',
                    key: 'company',
                    width: 125
                },
                {
                    title: '单位',
                    key: 'defaultUnit',
                    width: 80
                },

                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    fixed: 'right',
                    width: 150,
                    render: (h, params) => {
                        let id = params.row.goods_id;
                        let status = params.row.status;
                        return h('div', [
                            fn.newShow('goods_info', h, this.lo, { url: '/pro/goods/info', id: id }),
                            fn.newEdit('godos_edit', h, this.lo, { url: '/pro/goods/edit', id: id }),
                            status ? fn.GoodsR('', h, this.setSta, { status: status }) : fn.GoodsS('', h, this.setSta, { status: status })
                        ]);
                    }
                }
            ],
            lists: [],
            formInline: {
                brand: '',
                types: '',
                name: '',
                status: '',
                pageNum: 10,
            }
        }
    },
    created() {
        this.dispatch();
        api.getBrand().then(lists => {
            this.brands = lists.datas;
        })
        // api.typesLists().then(lists => {
        //     this.classify = lists;
        // })
        // api.getGoodsBrands().then(brands=>{
        //     this.brands = brands;
        // })
    },
    computed: {
        attrLists() {
            if (!this.lists || typeof this.lists !== 'object') {
                return [];
            }
            return this.lists.goodList;
        },
        totals() {
            return this.lists ? parseInt(this.lists.count) : 0;
        },
        placement() {
            return this.attrLists ? (this.attrLists.length > 9 ? 'top' : 'bottom') : "bottom";
        }

    },
    components:{
        cate
    },
    methods: {
        changePage(page) {
            page = page ? page : 1;
            this.dispatch({ start: (page - 1) * this.formInline.pageNum });
        },
        changePageNum(num) {
            this.formInline.pageNum = num;
            this.dispatch();
        },
        searchData() {
            this.formInline.pageNum = 10;
            this.dispatch();
        },
        setSta(args) {
            let id = args.id;
            let sta = args.status;
            let title = '商品上架提醒';
            let content = '您确定要上架该商品吗？';
            let info = '商品上架成功';
            if (sta == 1) {
                title = '商品下架提醒';
                content = '您确定要下架该商品吗？';
                info = '商品下架成功';
            }
            fn.handleSta(() => {
                api.changeAttrStatus({ id: id, status: sta }).then(() => {
                    fn.notice(info, this.searchData);
                });
            }, title, content);
        },
        lo(args) {
            this.$router.push({
                path: args.url,
                query: { id: args.id }
            });
        },
        dispatch(p) {
            p = p || {}
            // this.$store.dispatch('goodsLists', Object.assign(this.formInline, p));
            let search = {
                start: 0,
                length: this.formInline.pageNum,
                name: this.formInline.name,
                status: this.formInline.status,
                cate_id: this.formInline.types,
                brand_id: this.formInline.brand
            }
            api.getGoodsLists(Object.assign(search, p)).then(response => {
                this.lists = response;
            })
        },
        //选择分类
        cateChange(cateIds){
            const cates = cateIds;
            this.formInline.types = cates[cates.length - 1];
        }
    }

}
</script>
<style>
.selectSearch .ivu-select-selection {
    height: 32px!important;
}
</style>
