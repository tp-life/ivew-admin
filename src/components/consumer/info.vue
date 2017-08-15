<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="android-bookmark"></Icon>
                &nbsp;消费者详细资料
            </p>
            <Row>
                <Col offset="1" span="15">
                <h4>{{sellerInfo.name}}</h4>
                <br />
                <p>地址： {{sellerInfo.address}}</p>
                <p>电话： {{sellerInfo.phone}}</p>
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
                    <Tab-pane label="消费记录" name="clerk" icon="bookmark">
                        <expend :consumer_id="consumer_id"></expend>
                    </Tab-pane>
                    <Tab-pane label="来电记录" name="goods" icon="social-whatsapp">
                        <tel :user="consumer_id"></tel>
                    </Tab-pane>
                </Tabs>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
import * as api from '../../api/common.js';
import expend from './expend';
import tel from './tel';
export default {
    data() {
        return {
            consumer_id: 0,
            sellerInfo: {
                name: '',
                address: '',
                phone: '',

            }
        };
    },
    components: {
        expend,
        tel
    },
    created() {
        let id = this.$route.query.id;
        this.consumer_id = id;
        api.consumerInfo({ id: id }).then(res => {
            this.sellerInfo.address = res.address;
            this.sellerInfo.name = res.name;
            this.sellerInfo.phone = res.phone;
        });
    },
    mounted() {
        this.$store.dispatch('actbreadcrumbions', {
            first: '消费者管理',
            last: '消费者详情'
        });
    },
    methods: {
        checkTabs(name) {
            // console.log(name);
        }
    }
}
</script>
