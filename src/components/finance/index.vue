<template>
 <div>
  <Card>
    <p slot="title" style="color:#32c5d2">
        <Icon type="locked"></Icon>
        支付记录
    </p>
    <Tabs>
        <Tab-pane label="消费者支付记录" icon="android-contacts">
            <userorders></userorders>
        </Tab-pane>
        <Tab-pane label="消费者退款记录" icon="social-tux">
            <urefund></urefund>
        </Tab-pane>
        <Tab-pane label="门店采购支付记录" icon="ios-cart">
             <purlist></purlist>   
        </Tab-pane>
        <Tab-pane label="门店结算记录" icon="social-yen">
              <payment></payment>   
        </Tab-pane>
    </Tabs>
   </Card>   
 </div>  
</template>
<script>
import * as api from '../../api/common.js';
import userorders from './userorders';
import urefund from './urefund';
import purlist from './purlist';
import payment from './payment';
    export default {
          components: {
            userorders,
            urefund,
            purlist,
            payment,

        },
    }
</script>