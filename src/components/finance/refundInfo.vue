<template>
    <div>
        <div style="position: relative;">
                <Spin size="large" fix v-show="spinShow"></Spin>
        </div>
        <Card v-show="!spinShow">
            <p slot="title">
                <Icon type="bag"></Icon>
                退款单详情（<span style="color:red">{{refund.refund_status_name}}</span> ）
            </p>
            <Row class="mt20">
                <Col span="18" offset="1"> 收货地址：&nbsp; <strong>{{order.buyer}}&nbsp;&nbsp; {{order.shipping_phone}}&nbsp;&nbsp;&nbsp; {{order.shipping_address}}</strong>
                </Col>
    
            </Row>
            <Row class="mt20">
                <Col span="18" offset="1"> 配送方式： &nbsp;{{order.delivery_type}}
                </Col>
    
            </Row>
            <Row class="mt20">
                <Col span="18" offset="1"> 配送信息： &nbsp;{{order.delivery_person}} &nbsp;&nbsp;&nbsp;{{order.delivery_phone}}
                </Col>
            </Row>
            <Row class="mt20">
                <Col span="22" offset="1">
                <Row>
                    <Col span="8"> 订单编号：&nbsp; {{order.order_sn}}
                    </Col>
                    <Col span="8"> 付款方式： &nbsp;{{order.pay_type_name}}
                    </Col>
                    <Col span="8"> 订单状态：&nbsp; {{order.order_status_name}}
                    </Col>
                </Row>
                </Col>
            </Row>
            <Row class="mt20">
                <Col span="22" offset="1">
                <Row>
                    <Col span="8"> 下单时间：&nbsp; {{order.created_at}}
                    </Col>
                    <Col span="8"> 付款时间：&nbsp; {{order.pay_time}}
                    </Col>
                    <Col span="8"> 完成时间：&nbsp; {{order.completeTime}}
                    </Col>
                </Row>
                </Col>
            </Row>
            <Row class="mt40">
                <Col span="22" offset="1">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th class="text-center">商品名称</th>
                            <th class="text-center">单价</th>
                            <th class="text-center">数量</th>
                            <th class="text-center">商品价格</th>
                            <th class="text-center">优惠信息</th>
                            <th class="text-center">商品总价</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,key) in goods" :key="key">
                            <td>
                                <div class="col-xs-4">
                                    <img :src="item.image" width="120" height="90" />
                                </div>
                                <div class="col-xs-6" style="padding-top:10px">
                                    <p>{{item.name}}</p>
                                    <p>{{item.barcode}}</p>
                                </div>
                            </td>
                            <td style="text-align:center;vertical-align:middle;" width="100">{{item.price}}</td>
                            <td style="text-align:center;vertical-align:middle;" width="100">{{item.goodsNum}}</td>
                            <td style="text-align:center;vertical-align:middle;" width="100">{{item.amount}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.fav}}</td>
                            <td rowspan="20" v-if="key < 1" style="text-align:center;vertical-align:middle;" width="100">
                                {{order.amount}}
                            </td>
                        </tr>
                    </tbody>
                </table>
                 <p></p>
                <h4 style="color:#00f">退款信息</h4 >
                <hr style="border-color:#00f;"/>
                <p><span class="font01">订单总金额：</span> <span style="color:red;font-size:17px;">￥</span>{{refund.price}} </p>
                <p><span class="font01">退款金额：<span style="color:red;font-size:17px;">￥</span>{{refund.refund_price}}</span></p> 
                <p><span class="font01">退款结果：</span>{{refund.refund_status_name}}</p> 
                <p><span class="font01">退款时间：</span>{{refund.refund_time}}</p>
                <p><span class="font01">退款说明：</span>{{refund.note}}</p>     
                <template v-if="refundEdit">
                     <p></p>
                         <hr/>
                   <h4 style="color:#00f">审核信息</h4 >
                <hr style="border-color:#00f;"/>
                <p style="padding-left:30px;">
                    审批备注：
                    <p></p>
                    
                    <Input  style="margin-left:30px;" v-model="note" type="textarea" :rows="4" placeholder="请输入..."></Input>
                    <p class="buttonP">
                    <Button loading  v-if="isLoading01"  type="primary">同意审批中...</Button>
            
                    <Button @click="ok"  style="width:120px;"   v-if="!isLoading01"  v-bind:disabled="isLoading02"  type="primary">同意退款</Button>
                    <Button loading  v-if="isLoading02" type="warning">拒绝审批中...</Button> 
                    <Button @click="donot" style="width:120px;"  v-if="!isLoading02" v-bind:disabled="isLoading01" type="warning">不同意退款</Button>
                    </p>
                    </p>
                  
                </template>
                    
                </Col>
            </Row>
        </Card>
    
    </div>
</template>
<script>
import * as api from '../../api/common';
export default {
    data() {
        return {
              note:'',
            isLoading01:false,
            isLoading02:false,
            spinShow:true,
            order: {
                id:'',
                order_sn: '',
                buyer: '',
                shipping_address: '',
                shipping_phone: '',
                delivery_type: '',
                delivery_person: '',
                delivery_phone: '',
                pay_type_name: '',
                order_status_name: '',
                created_at: '',
                pay_time: '',
                completeTime: '',
                amount: ''
            },
            goods: [],
            refund:{
                id:'',
                price:'',
                refund_price:'',
                refund_status:'',
                note:'',
                refund_time:'',
                refund_status_name:''
            }
        }
    },
    computed:{
       refundEdit: function(){
           if(this.refund.refund_status=='wait'){
               return true;
           }else{
               return false;
           }
       } 
    },
    created() {
        let id = this.$route.query.id;
        api.orderInfo({ order_id: id, needCount: 30 }).then(res => {
           // console.log(res);
            this.spinShow = false;
            this.order.id = res.order_id;
            this.order.order_sn = res.order_sn;
            this.order.buyer = res.buyer;
            this.order.shipping_address = res.shipping_address;
            this.order.shipping_phone = res.shipping_phone;
            this.order.delivery_type = res.delivery_type;
            this.order.delivery_person = res.delivery_person;
            this.order.delivery_phone = res.delivery_phone;
            this.order.pay_type_name = res.pay_type_name;
            this.order.order_status_name = res.order_status_name;
            this.order.created_at = res.created_at;
            this.order.pay_time = res.pay_time;
            this.order.completeTime = res.completeTime;
            this.order.amount = res.amount;
            this.goods = res.goodslist;
        });
        //获取退单信息
        
        api.refundInfo({id:id}).then(response=>{
            this.refund.id=response.id;
            this.refund.note = response.note;
            this.refund.refund_price= response.refund_price;
            this.refund.refund_status=response.refund_status;
            this.refund.refund_time=response.refund_time;
            this.refund.price = response.price;
            this.refund.refund_status_name=response.refund_status_name;
            // console.log(response);
        });
    },
     methods:{
        ok(){   //审核通过
            this.isLoading01=true;
            let id   = this.refund.id;
            let info = this.note;
            let data = {id:id,refundInfo:info,status:'succ'};
            api.refundSure(data).then((response)=>{
                if(response){
                  
                    this.modal1=false;
                    this.$Notice.success({
                            title: '审批成功',
                            desc: '退款申请已同意！',
                            duration: 2.5
                        });
                   this.refund.refund_status = 'succ';
                   this.refund.refund_status_name='同意退款';
                }
                    this.isLoading01=false;
                    this.isLoading02=false;
                
                 
            });


        },
        donot(){ //审批拒绝
         this.isLoading02=true;
           let id   = this.refund.id;
         let info = this.note;
            let data = {id:id,refundInfo:info,status:'reject'};
            api.refundSure(data).then((response)=>{
                if(response){
                    
                    this.modal1=false;
                      this.$Notice.success({
                            title: '审批成功',
                            desc: '退款申请已拒绝！',
                            duration: 2.5
                        });
                         this.refund.refund_status = 'reject';
                           this.refund.refund_status_name='拒绝退款';
                }
                     this.isLoading01=false;
                    this.isLoading02=false;
                
                 
            });
       
        },
    }
}
</script>
<style scoped>
.mt20 {
    margin-top: 15px!important;
}

.mt40 {
    margin-top: 40px!important;
}
.font01{
    color: #666;
}
.buttonP button {
    float: right;
    margin-left: 20px;
    margin-top: 20px;
}
</style>

