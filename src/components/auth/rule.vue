
<template>
    <div>
        <Card>
            <p slot="title" style="color:#32c5d2">
                <Icon type="locked"></Icon>
                角色分组
            </p>
            <router-link slot="extra" to="/sys/group/add" >
                <Icon type="ios-plus"></Icon>
                添加分组
            </router-link>
            <div style="text-align:right">
                <Form ref="userSearchFrom" :model="formInline" inline>
                    <Form-item prop="name">
                        <Input type="text" v-model="formInline.name" placeholder="组名">
                        </Input>
                    </Form-item>
                    <Form-item prop="status">
                        <Select size="large" style="width:100px;height:32px;text-align:left" v-model="formInline.status" placeholder="状态" class="selectSearch">
                            <Option value="0">已禁用</Option>
                            <Option value="1">正常</Option>
                        </Select>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" icon="ios-search" @click="searchData">搜索</Button>
                    </Form-item>
                </Form>
            </div>
    
            <Table border :context="self" :columns="columns7" :data="lists"></Table>
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
            self: this,
            pageNum: 10,
            modal: false,
            id: 0,
            columns7: [
                {
                    type: 'selection',
                    width: 40,
                    align: 'center'
                },
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '权限组名',
                    key: 'name',
                    width:150
                },
                {
                    title: '权限描述',
                    key: 'desc'
                },
                {
                    title: '当前状态',
                    key: 'status',
                    align: 'center',
                    width: 100,
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
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        let id = params.row.id;
                        let status = params.row.status;
                        return h('div', [
                            fn.newEdit('group_edit', h, this.lo, '/sys/group/edit',id),
                            status ==1 ? fn.newStatR('group_state', h, this.setSta, id) : fn.newStatO('user_state', h, this.setSta,id),
                            fn.newDel('group_state', h, this.del, id)
                        ]);
                    }
                }
            ],
            formInline: {
                name: '',
                status: ''
            }
        }
    },
    created() {
        this.dispatch();
    },
    computed: Object.assign(mapGetters({
        ruleList: "getGroup"
    }), {
            lists() {
                if (!this.ruleList || typeof this.ruleList !== 'object') {
                    return [];
                }
                return this.ruleList.groupList;
            },
            totals() {
                return this.ruleList ? parseInt(this.ruleList.allCount) : 0;
            },
            placement() {
                return this.lists.length > 9 ? 'top' : 'bottom';
            }

        }),
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
            this.dispatch({
                gname:this.formInline.name,
                gisvalid:this.formInline.status
            });
        },
        info(id) {
            this.modal = true;
            this.id = parseInt(id);
        },
        close() {
            this.modal = false;
        },
        del(id) {
            fn.handleDel(() => {
                api.delGroup({ gid: id }).then(() => {
                    fn.notice('分组删除成功', this.searchData);
                });
            });
        },
        setSta(id, sta) {
            fn.handleSta(() => {
                api.changeGroup({ gid: id }).then(() => {
                    fn.notice('分组状态更改成功', this.searchData);
                });
            }, '', '您确定要更改当前分组的状态吗？');
        },
        lo(url,id) {
            this.$router.push({
                path:url,
                query:{id:id}
            });
        },
        dispatch(searchParams) {
            let defaultParams = {
                startCount: 0,
                needCount: this.pageNum,
                gname:this.formInline.name,
                gisvalid:this.formInline.status
            };
            searchParams = typeof searchParams === 'object' ? searchParams : {};
            let searchData = Object.assign(defaultParams, searchParams);
            this.$store.dispatch('getGroupList', searchData);
        }
    }
}
</script>
<style>
.selectSearch .ivu-select-selection {
    height: 32px!important;
}
</style>
