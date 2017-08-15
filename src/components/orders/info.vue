<template>
    <div>
        <div style="position: relative;">
                <Spin size="large" fix v-show="spinShow"></Spin>
        </div>
        <Card v-show="!spinShow">
            <p slot="title">
                <Icon type="bag"></Icon>
                订单详情
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
            spinShow:true,
            order: {
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
            goods: []
        }
    },
    created() {
        let id = this.$route.query.id;
        api.orderInfo({ order_id: id, needCount: 30 }).then(res => {
            this.spinShow = false;
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
</style>

