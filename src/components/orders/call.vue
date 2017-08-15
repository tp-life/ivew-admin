<template>
    <div>
        <Card>
            <p slot="title" style="color:#32c5d2">
                <Icon type="locked"></Icon>
                呼叫记录
            </p>
            <Form ref="userSearchFrom" :model="formInline" inline style="text-align:right">
                    <Form-item >
                        <Input type="text"  v-model="formInline.phone" style="width: 250px"  placeholder="来电电话">
                        </Input>
                    </Form-item>
                    <Form-item >
                        <Select v-model="formInline.call_type"  style="width:100px;text-align:left" >
                            <Option v-for="(item,key) in call_type" :value="key" :key="key">{{item}}</Option>
                        </Select>
                    </Form-item>
            
                     <Form-item>
                        <Button type="primary" icon="ios-search" @click="searchData">搜索</Button>
                    </Form-item> 
                      <Form-item>
                    <Button type="primary" @click="modal1 = true">添加记录</Button>
                      </Form-item>
                </Form>
                           <!--{{addCallOrder}}-->
                <Modal
                    v-model="modal1"
                    title="添加来电记录"
                    @on-ok="addCallOrder"
                 >
                     <Form ref="userSearchFrom" :model="formInline2" inline >
                           <p>    
                               来电电话：   
                           <Input type="text"  v-model="formInline2.phone" style="width: 250px"  placeholder="来电电话">
                          </Input>
                          </p>  
                        来电类型：
                        <Select v-model="formInline2.call_type"  style="width:100px;" >
                            <Option v-for="(item,key) in call_type" :value="key" :key="key">{{item}}</Option>
                        </Select>
                        <p style="margin-top:15px">
                            来电记录：
                        <Input v-model="formInline2.note" type="textarea" :rows="4" placeholder="请输入来电记录..."></Input>
                        </p>   
                    </Form>
                </Modal>
                <Table border :columns="columns1" :data="tableData"></Table>

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
                        <Page :total="totals" :current="1"  @on-change="changePage"  :page-size="pageNum"></Page>
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
        data(){
            return {
                 curr:1,
                 phone:'',
                 pageNum: 10,
                 totals:0,
                 id: 0,
                modal1: false,
                formInline: {
                call_type: '0',
              },
               formInline2: {
                phone: '',
                call_type:'0',
                note:''

              },
              call_type:{
                '0':'来电类型',  
                问题咨询:'问题咨询',
                商品购买:'商品购买',
                外卖外送:'外卖外送',
                其他:'其他'
            },
            columns1: [
                    {
                         type: 'index',
                         width: 80,
                         align: 'center'
                    },
                    {
                        title: '电话号',
                        key: 'phone'
                    },
                    {
                        title: '用户名',
                        key: 'name'
                    },
                    {
                        title: '来电类型',
                        width:100,
                        key: 'call_type'
                    },
                    {
                        title:'来电时间',
                        key:'created_at'
                    },
                    {
                        title:'备注',
                         width:320,
                        key:'note'
                    }
                    
                ],
                 tableData: [

                 ],
          }
        },
        created(){
          this.dispatch(); 
        },
        computed: {
            placement() {
                return this.tableData.length > 9 ? 'top' : 'bottom';
            }
        },
        methods:{
            searchData(){
              this.pageNum = 10;
              this.dispatch(this.formInline);
            },
            changePage(page) {
              page = page ? page : 1;
              this.dispatch({ startCount: (page - 1) * this.pageNum });
            },
            changePageNum(num) {
              this.pageNum = parseInt(num);
              this.dispatch({ needCount: num });
            },
             dispatch(searchParams) {
            let defaultParams = {
                startCount: 0,
                needCount: this.pageNum
            };
            defaultParams = Object.assign(defaultParams,this.formInline);
            searchParams = typeof searchParams === 'object' ? searchParams : {};
            let searchData = Object.assign(defaultParams, searchParams);
            api.orderCallList(searchData).then((response)=>{
                this.tableData = response.list;
                this.totals = response.allCount;
             });
           },
           addCallOrder() {
              api.addCall( this.formInline2).then((response)=>{
                   fn.notice('添加来电记录成功', () => {
                       this.formInline2.phone= '';
                       this.formInline2.call_type='';
                       this.formInline2.note='';
                       this.modal1 = false; 
                   });   
                   this.dispatch(this.formInline);
              });
            },
            
        },
       


    }
</script>
