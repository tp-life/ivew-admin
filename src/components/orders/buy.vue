<template>
    <div>
        <Card>
            <p slot="title" style="color:#32c5d2">
                <Icon type="bag"></Icon>
                &nbsp;代客下单
            </p>
             
            <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="100" inline>
                <Form-item  label='所在门店' prop="seller" >
                    <Select v-model="formItem.seller" style="width:340px;" @on-change="getSellerName" >
                       <Option v-for="(item,key) in seller" :value="item.id" :key="key">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="来电用户手机" prop="buyer_phone" >
                    <Input  v-model="formItem.buyer_phone" style="width:400px;"  placeholder="请输入来电电话"></Input>
                </Form-item>
                  <Form-item label="收货地址" >
                         <Cascader :render-format="format"  style="width:340px;" :data="area" :load-data="loadArea"  ></Cascader>
                    </Form-item>
               
                <Form-item label="详细地址" prop="address" >
                    <Input v-model="formItem.address" style="width:400px;"  placeholder="请输入详细地址"></Input>
                </Form-item>
                <hr/>
                <Form-item label="商品搜索" >
                    <Input style="width:400px;"  v-model="formItem.goodsName" placeholder="如：农夫山泉"></Input>
                    <Button style="margin-left:20px;" type="primary" @click="search()"  icon="ios-search">搜索</Button>
                </Form-item>
                <div style="height:400px; overflow: scroll;">
                    <!-- 搜索商品信息 -->
               <p>商品信息：</p> 
              <table    class="table table-bordered table-responsive" style="width:100%;text-align: center;">
                  <thead>
                <tr  class="titleTr">
                <th>商品名称</th><th>单价</th><th>操作</th>
                </tr>
                  </thead>
                <template v-for="(item,key) in goodslist">
                <tr style="height:50px">
                   
                    <td>{{item.name}}</td>
                    <td>￥{{item.price}}</td>
                    <td><Button type="success" v-on:click="addbuy($event,key)">加入购买</Button></td>    
                </tr>          
                </template>
              </table>
                 </div>    
                
                <hr/>
                 <!-- 采购单列表 -->
                 <p>订单信息：</p> 
                 
              <div style="height:400px; overflow: scroll;">
              
              <table   class="table text-center table-bordered" >
                  <thead>
                <tr class="titleTr" >
                
                 <th>商品名称</th>
                 <th>单价</th>
                 <th>数量</th>
                 <th>库存</th>
                 <th>金额</th>
                 <th>删除</th>
                </tr>
                  </thead>
                <template v-for="(item,key) in buylist">
                <tr style="height:50px;text-align:center;">
                  
                    <td>{{item.name}}</td>
                    <td>￥{{item.price}}</td>
                    <td style="text-align: center;width:100px;">
                        <input v-model="item.num" v-on:blur="numberCheck($event,key)" v-on:click="numberCheck($event,key)" maxlength="4" class="form-control numInput" style="text-align:center;" type="number"></input>
                    </td>
                    <td>{{item.save}}</td>
                    <td>￥{{(item.num*item.price).toFixed(2)}}</td>
                    <td><Button type="error" v-on:click="deleteGoods(key)">删除</Button></td>            
                </tr>         
                </template>
              </table>
              
                  <p style="float:right;margin-right: 30px;font-size:18px;"><span>订单总金额：<span style="color:red;">￥{{allMoney}}</span></span></p> 
                 </div>    
               <div>
                   <hr/>
               
                <p>
                       客户备注：
                  <Input inline style="width:90%"  v-model="formItem.note" type="textarea" :rows="3" placeholder="客户备注..."></Input>
               </p>
                </div>
                   <Form-item>            
                       <p style="margin-top: 20px; margin-left: -50px;">
                    <!-- <Button  type="primary" @click="handleSubmit('formValidate')">确定下单</Button> -->
                    <Button type="primary" :loading="loading"  @click="handleSubmit('formValidate')">
                    <span v-if="!loading">确定下单</span>
                    <span v-else>提交中...</span>
                    </Button>
                    <Button style=" margin-left: 10px;"  @click="handleReset('formValidate')">清空</Button>
                     </p>
                </Form-item>
            </Form>
            
        </Card> 
    </div>
</template>
<script>

import * as fn from '../../until/common.js';
import * as api from '../../api/common.js';

export default {
    data() {
        return {
            uploadUrl: api.uploadUrl,
            classify: [],
            area:[],
            uploadList:[],
            seller:{},
            goodslist:{}, 
            buylist:[],
            sellerName:'',
            loading: false,
          
            formItem: {
                buyer_phone:'',
                address:'',
                location:'',
                seller:'',
                goodsName:'',  
                payMoney:'',
                fav:'',
                note:'',
            },
            selectArea:[],
            ruleValidate: {
                buyer_phone: [ 
                    { required: true, message: '来电电话不能为空', trigger: 'blur' }
                ],
                
               
                address:[
                    { required: true, message: '详细地址不能为空', trigger: 'blur' }
                ],
                seller:[
                        { required: true,type: 'integer', message: '请选择门店', trigger: 'change' }
                ] 
            },
        }
    },
    created(){
        
        this.formItem.seller_id = this.$route.query.id;
        let area =  this.getArea().then(list=>{
           this.area = list;
       });
       api.sellerLists({needCount:100}).then((response)=>{
          this.seller=response.list;
       });   
    },
    mounted() {
       
    },
    watch: {
         
    },
    methods: {
    
        loadArea(item,callback){
            // console.log(item);
            item.loading = true;
            let area_id = item.value;
            this.getArea(area_id).then(area=>{
                item.children= area;
                item.loading = false;
                callback();
            })
            
        },
    
        getSellerName(item){
        this.sellerName = this.seller[item-1].name;
        },
        search(){  //搜索商品
        if(''==this.formItem.seller){
            this.$Notice.warning({
                    title: '错误',
                    desc: '请先选择门店',
                    duration: 1.5
                });
                return false;
        }
        let name   = this.formItem.goodsName;
        let seller = this.formItem.seller;
        var data = {'goods_name':name,'seller_id':seller,'needCount':100};
        
        api.sellerGoods(data).then((response)=>{
           
            if(0==response.allCount){
                  this.$Notice.warning({
                    title: '抱歉',
                    desc: '暂无符合要求的商品',
                    duration: 2
                });
                return false;
            }
         
         this.goodslist = response.list;
        });
        

        },
        //数量判断
        numberCheck:function ($enevt,key){
         //  this.getMoeny(key);
           var inputDom = $enevt.srcElement;
           var number =   inputDom.value;
           
           this.$set(this.buylist[key],'num',number);
           // console.log(this.buylist[key]);
          
           var save =  this.buylist[key].save; 
           //重新赋值 
            this.buylist =  this.buylist.concat([]);  
           if(number<1){
             inputDom.value=1;  
           }
           if(number>save){
                inputDom.value=save;  
           }
          
         
           
        },
        //加入购买
        addbuy:function($enevt,key){

           
           this.goodslist[key].num = 1; 
           this.buylist.push(this.goodslist[key]);
           this.goodslist.splice(key,1);
        
        },
        deleteGoods:function(key){
            this.goodslist.push(this.buylist[key]);
             this.buylist.splice(key,1);
        },
        getArea(area){
            let requestData ={};
            area =area? Number(area):0;
            if(area){
                requestData={
                    area_id : area
                }
            }
           return api.area(requestData).then(res=>{
                let list = res.list.map(item=>{
                    let temp ={
                        label:item.name,
                        value:item.id,
                        deep:item.deep
                    }
                    if(item.deep < 3){
                        temp.children =[];
                        temp.loading= false
                    }
                    return temp;
                })
                return list;
            });
        },
        //级联自定义显示
         format (labels, selectedData) {
                const index = labels.length - 1;
                const data = selectedData[index] || false;
                if (data && data.code) {
                    return labels[index] + ' - ' + data.code;
                }
                if( typeof(labels[index])=='undefined'){
                    return '选择收货区域';
                }else{
                    this.formItem.area = labels[index-1]+ ' ' +labels[index];
                     return labels[index-1]+ ' ' +labels[index];
                }
               
            },
            
         allMoneyCheck:function($event){
            var payMoney = $event.srcElement.value;
             if(isNaN(payMoney)){
                  this.$Notice.warning({
                            title: '错误',
                            desc: '请输入数字金额',
                            duration: 2
                            });
                     $event.srcElement.value='';         
                     return false;
             }
             if(payMoney<0){
                    $event.srcElement.value='0.00';         
             }
           
            
        },
        //提交订单
        handleSubmit(name){
            
            this.$refs[name].validate((valid) => {
                if (valid) {
                    var area = this.formItem.area;
                  if(typeof(area)=='undefined'){
                       this.$Notice.warning({
                            title: '错误',
                            desc: '请选择送货区域',
                            duration: 2.5
                            });
                     return false;
                  }
                   
                   var buylist = this.buylist;
                   if(buylist.length==0){
                    this.$Notice.warning({
                            title: '错误',
                            desc: '未购买任何商品',
                            duration: 2.5
                            });
                   }
                     this.loading = true;
                   var address =  this.formItem.area+" "+this.formItem.address;
                   var goodsinfo =[];
                 //   console.log(buylist);
                   for(var i=0;i<buylist.length;i++){
                       goodsinfo[i] = [];
                        goodsinfo[i]['sku_id']= buylist[i].sku_id;
                        // console.log(goodsinfo);
                        goodsinfo[i]['goods_price']=buylist[i]['price'] ;
                        goodsinfo[i]['goods_amount']= buylist[i]['price']*buylist[i]['num'];
                        goodsinfo[i]['goods_num']= buylist[i]['num'];
                        goodsinfo[i]['goods_unit']=buylist[i]['unit'] ;
                   }
                    let data ={
                        buyer_phone:this.formItem.buyer_phone,
                        seller_id:this.formItem.seller,
                        seller_name:this.sellerName,
                        amount:this.allMoney,
                        payMoeny:this.payMoney?this.payMoney:this.allMoney,
                        fav:this.formItem.fav,
                        user_address:address,
                        note:this.formItem.note,
                        goods:goodsinfo
                    }
                     api.addOrder(data).then((response)=>{
                        //  console.log(response);
                        if(response){
                        this.$Notice.success({
                            title: '成功',
                            desc: '订单创建成功！',
                            duration: 2.5
                            });
                         this.buylist = [];
                         this.goodslist= [];   
                         this.loading = false;
                         this.$router.push('/order/index');
                        
                        }
                        
                     });
                    
                }else{
                    this.$Notice.warning({
                    title: '错误',
                    desc: '订单信息不完整！',
                    duration: 2.5
                });
                }
            })
        },
        handleReset(name) {
            if(typeof(name)!='undefined'){
                this.$refs[name].resetFields();
            }
            this.buylist = [];
            this.goodslist= [];   
            this.formItem.note='';
           
        },
    },
    computed:{
        allMoney:function(){
           var allMoney = 0;
           for(var i=0;i<this.buylist.length;i++){
               allMoney+=((this.buylist[i].num)*(this.buylist[i].price));
           }
           return allMoney.toFixed(2);
        }
    }
}
</script>
<style>
th{
    text-align: center;
   
}
td{
    text-align: center;
}


</style>


