<template>
    <div>
        <p slot="title" style="color:#32c5d2">
                <Icon type="locked"></Icon>
                提现审批
            </p>
        <div style="text-align:right">
                <Form ref="userSearchFrom" :model="formInline" inline>
                     <Form-item >
                        <Input type="text" style="width: 250px" v-model="formInline.keywords" placeholder="电话或门店名">
                        </Input>
                    </Form-item>
                   
                    <Form-item>
                        <Button type="primary" icon="ios-search" @click="search()">搜索</Button>
                    </Form-item>
                </Form>
     </div>
        <Table disabled-hover no-data-text="暂无未审批的提现申请" border :columns="settlementColumn" :data="settlement"></Table>
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
         <Modal
        v-model="modal1"
        title="门店结算审核"
        @on-cancel="reset"
        ok-text='同意'
        cancel-text='不同意'
        :mask-closable='false'
        
        >
        <p> <span style="color:#666">门店：</span>{{cashInfo.seller}} </p>
        <p> <span style="color:#666">提现金额：</span> <span style="color:red;font-size:18px;">￥</span>{{cashInfo.money}} </p>
         <p> <span style="color:#666">申请时间：</span>{{cashInfo.time}} </p>
        审核原因：
        <p></p>
        <Input v-model="cashInfo.reason" type="textarea" :rows="4" placeholder="请输入审核原因..."></Input>
          <div slot="footer">
              
              <Button loading  v-if="isLoading01"  type="primary">同意审批中...</Button>
              <Button @click="ok"  style="width:120px;"   v-if="!isLoading01"  v-bind:disabled="isLoading02"  type="primary">同意</Button>
              <Button loading  v-if="isLoading02" type="warning">拒绝审批中...</Button> 
              <Button @click="refund" style="width:120px;"  v-if="!isLoading02" v-bind:disabled="isLoading01" type="warning">不同意</Button> 
          </div>
      </Modal>
        
    </div>
</template>
<script>
import * as api from '../../api/common.js';
export default {
   
    data() {
        return {
            modal1:false,
            isLoading01:false,
            isLoading02:false,
            cashInfo:{
                cashid:'',
                seller:'',
                money:'',
                time:'',
                reason:'',
                index:''
            },
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
                    title: '申请时间',
                    key: 'time'
                },
               
                {
                    title:'操作',
                    key: 'action',
                    width: 180,
                    align: 'center',
                    render: (h, params,fun) => {
                        let id = params.row.id;
                        let index = params.index;
                     
                        fun = this.cash;
                         return  h('Button',{
                            attrs: {
                                    type: 'primary',
                                    shape:'circle'
                                    },
                           on: {
                             'click':()=>{
                                  fun(id,index);
                                 }
                               }
                            }, '提现审批')
                    },
                    
                    }
                
            ],
            formInline:{
                keywords:'',

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
            api.approvallist(searchData).then((res) => {
                console.log(res);
                this.settlement = res.list;
                this.totals = res.allCount;
            });
        },
        search(){
            this.dispatch(this.formInline);
        },
        cash:function(id,index){
           
           this.cashInfo.cashid=id;
           this.cashInfo.seller=this.settlement[index].name;
           this.cashInfo.money=this.settlement[index].money;
           this.cashInfo.time=this.settlement[index].time;
           this.cashInfo.index=index;
           this.modal1=true;
        },
        ok(){   //审核通过
            this.isLoading01=true;
            let id   = this.cashInfo.cashid;
            let info = this.cashInfo.reason;
            let data = {id:id,status:'1'};
            api.approval(data).then((response)=>{
                if(response){
                    this.reset();
                    this.modal1=false;
                      this.$Notice.success({
                            title: '审批成功',
                            desc: '该申请已同意！',
                            duration: 2.5
                        });
                  this.settlement.splice(this.cashInfo.index,1);  
                }
            });


        },
        refund(){ //审批拒绝
         this.isLoading02=true;
         let id   = this.cashInfo.cashid;
         let info = this.cashInfo.reason;
         let data = {id:id,status:'2'};
         api.approval(data).then((response)=>{
            if(response){
                this.reset();
                this.modal1=false;
                    this.$Notice.success({
                        title: '审批成功',
                        desc: '该申请已拒绝！',
                        duration: 2.5
                    });
                this.settlement.splice(this.cashInfo.index,1);    
            }
            });
       
        },
        reset(){ //取消
            this.isLoading01=false;
            this.isLoading02=false;
            this.cashInfo.reason='';
        }

    }

}
</script>
