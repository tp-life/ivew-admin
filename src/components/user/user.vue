
<template>
    <div>
        <Card>
            <p slot="title" style="color:#32c5d2">
                <Icon type="person-stalker"></Icon>
                用户列表
            </p>
            <router-link slot="extra" to="/sys/user/add">
                <Icon type="ios-plus"></Icon>
                添加用户
            </router-link>
            <div style="text-align:right">
                <Form ref="userSearchFrom" :model="formInline" inline>
                    <Form-item prop="user">
                        <Input type="text" v-model="formInline.uname" placeholder="姓名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item prop="tel">
                        <Input type="text" v-model="formInline.uphone" placeholder="电话">
                        <Icon type="ios-telephone-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item prop="status">
                        <Select size="large" style="width:100px;height:32px;text-align:left" v-model="formInline.uisvalid" placeholder="用户状态" class="selectSearch">
                            <Option value="0">已禁用</Option>
                            <Option value="1">正常</Option>
                        </Select>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" icon="ios-search" @click="searchData">搜索</Button>
                    </Form-item>
                </Form>
            </div>
    
            <Table border :columns="columns7" :data="lists"></Table>
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
                        <Page :total="totals" :current="1" @on-change="changePage" :page-size="pageNum"></Page>
                    </div>
                </div>
    
                </Col>
            </Row>
            <!--{{userInfo}}-->
            <user-info :userId="userId" :modal="modal" @close="close"></user-info>
        </Card>
    </div>
</template>
<script>
import userInfo from './info.vue';
import { mapGetters } from 'vuex';
import * as fn from '../../until/common.js';
import * as api from '../../api/common.js';
export default {
    data() {
        return {
            self: this,
            pageNum: 10,
            modal: false,
            userId: 0,
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
                    title: '姓名',
                    key: 'name',
                    render(h, param) {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: "person"
                                }
                            }),
                            h('strong', `  ${param.row.name}`)
                        ]);
                    }
                },
                {
                    title: '电话',
                    key: 'phone',
                    width: 150,
                },
                {
                    title: '邮件',
                    key: 'email'
                },
                {
                    title: '状态',
                    key: 'status',
                    align: 'center',
                    width: 80,
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
                    title: '添加日期',
                    key: 'created_at'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                        let id = params.row.id;
                        let status = params.row.status;
                        return h('div', [
                            fn.newShow('user_info', h, this.info, id),
                            fn.newEdit('user_edit', h, this.lo, '/sys/user/edit',id),
                            status ==1? fn.newStatR('user_state', h, this.setSta, id) : fn.newStatO('user_state', h, this.setSta,id),
                            fn.newDel('user_del', h, this.del, id)
                        ]);
                    }
                }
            ],
            formInline: {
                uname: '',
                uphone: '',
                uisvalid: ''
            }
        }
    },
    components: {
        'user-info': userInfo
    },
    created() {
        this.dispatch();
    },
    computed: Object.assign(mapGetters({
        userList: "getUserList"
    }), {
            lists() {
                if (!this.userList || typeof this.userList !== 'object') {
                    return [];
                }
                return this.userList.list;
            },
            totals() {
                return this.userList ? parseInt(this.userList.allCount) : 0;
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
            this.dispatch(this.formInline);
        },
        info(id) {
            this.modal = true;
            this.userId = parseInt(id);
        },
        close() {
            this.modal = false;
        },
        del(id) {
            fn.handleDel(() => {
                api.delUser({ uid: id }).then(() => {
                    fn.notice('用户删除成功', this.searchData);
                });
            }, '用户删除确认。');
        },
        setSta(id) {
            fn.handleSta(() => {
                api.changeUser({ uid: id }).then(() => {
                    fn.notice('用户状态更改成功', this.searchData);
                });
            }, '', '您确定要更改当前用户的状态吗？');
        },
        lo(url, id) {
            this.$router.push({
                path: url,
                query: { userId: id }
            });
        },
        dispatch(searchParams) {
            let defaultParams = {
                startCount: 0,
                needCount: this.pageNum
            };
            searchParams = typeof searchParams === 'object' ? searchParams : {};
            let searchData = Object.assign(defaultParams,this.formInline, searchParams);
            this.$store.dispatch('getUserList', searchData);
        }
    }
}
</script>
<style>
.selectSearch .ivu-select-selection {
    height: 32px!important;
}
</style>
