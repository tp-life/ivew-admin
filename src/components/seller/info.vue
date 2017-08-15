<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="android-bookmark"></Icon>
                &nbsp;门店详细资料
            </p>
            <Row>
                <Col span="6">
                <div>
                    <img :src="sellerInfo.img" style="width:248px;height:178px; border-radius:5px" />
                </div>
                </Col>
                <Col span="15">
                <h4>{{sellerInfo.name}}</h4>
                <br />
                <p>地址： {{sellerInfo.address}}</p>
                <p>电话： {{sellerInfo.phone}}</p>
                <p>门店管理员： {{sellerInfo.manger}}</p>
                <p>管理员电话: {{sellerInfo.manger_phone}}</p>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <div style="height:50px"></div>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <Tabs @on-click="checkTabs">
                    <Tab-pane label="店员" name="clerk" icon="person-stalker">
                        <clerk :seller="seller_id"></clerk>
                    </Tab-pane>
                    <Tab-pane label="在售商品" name="goods" icon="android-playstore">
                        <goods :seller="seller_id"></goods>
                    </Tab-pane>
                    <Tab-pane label="采购记录" name="purchase" icon="soup-can">
                        <purchase :seller="seller_id"></purchase>
                    </Tab-pane>
                    <Tab-pane label="结算记录" name="payment" icon="paper-airplane">
                        <settlement :seller="seller_id"></settlement>
                    </Tab-pane>
                </Tabs>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
import * as api from '../../api/common.js';
import clerk from './clerk';
import goods from './goods';
import purchase from './purchase';
import settlement from './settlement';
export default {
    data() {
        return {
            seller_id: 0,
            sellerInfo: {
                img: '',
                name: '',
                address: '',
                phone: '',
                manger: '',
                manger_phone: ''
            }
        };
    },
    components: {
        clerk,
        goods,
        purchase,
        settlement
    },
    created() {
        let id = this.$route.query.id;
        this.seller_id = id;
        api.sellerInfo({ seller_id: id }).then(res => {
            this.sellerInfo.address = res.address;
            this.sellerInfo.name = res.name;
            this.sellerInfo.phone = res.phone;
            this.sellerInfo.manger = res.admin;
            this.sellerInfo.manger_phone = res.adminPhone;
            this.sellerInfo.img = res.image.url
        });
    },
    mounted() {
        this.$store.dispatch('actbreadcrumbions', {
            first: '门店管理',
            last: '门店详情'
        });
    },
    methods: {
        checkTabs(name) {
            console.log(name);
        }
    }
}
</script>
