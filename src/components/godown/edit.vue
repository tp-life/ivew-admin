<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person-add"></Icon>
                &nbsp;修改仓库
            </p>
            <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="100">
                <Form-item label="仓库名称" prop="name">
                    <Input v-model="formItem.name" placeholder="请输入仓库名称"></Input>
                </Form-item>
                <Row>
                    <Col span="11">
                    <Form-item label="仓库地址">
                        <Cascader :data="area" :load-data="loadArea" v-model="selectArea" @on-change="handleChange"></Cascader>
                    </Form-item>
                    </Col>
                    <Col offset="1" span="12">
                    <Form-item label="详细地址" prop="address">
                        <Input v-model="formItem.address" placeholder="详细地址"></Input>
                    </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <Form-item label="坐标经纬度">
                        <Input placeholder="仓库坐标地址" v-model="formItem.location"></Input>
                        <p class="help-block">可通过
                            <a href="http://lbs.amap.com/console/show/picker" target="_blank">坐标拾取工具</a>，拾取地址后进行复制。例如：116.369774,39.919141</p>
                    </Form-item>
                    </Col>
                    <Col offset="1" span="12">
                    </Col>
                </Row>
                <div style="margin-bottom:35px"></div>
                <Form-item>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
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
            classify: [],
            area: [],
            formItem: {
                id: 0,
                name: '',
                address: '',
                location: '',
                status: 1
            },
            selectArea: [],
            ruleValidate: {
                name: [
                    { required: true, message: '门店名不能为空', trigger: 'blur' }
                ],

                address: [
                    { required: true, message: '门店地址不能为空', trigger: 'blur' }
                ]
            },

        }
    },
    created() {
        let area = this.getArea().then(list => {
            this.area = list;
        });
        let id = this.$route.query.id;
        this.formItem.id = id;
        api.godownInfo({ id: id }).then(res => {
            // let address = res.address.split(' ');
            this.formItem.address=res.address;
            this.formItem.name = res.name;
            this.selectArea=[res.city_id,res.area_id];
            // console.log(address);
            this.formItem.location = res.location.replace(' ',',');
        });
    },
    mounted() {
        this.$store.dispatch('actbreadcrumbions', {
            first: '仓库管理',
            last: '修改仓库'
        });
    },
    methods: {
        loadArea(item,callback){
            item.loading = true;
            let area_id = item.value;
            this.getArea(area_id).then(area=>{
                item.children= area;
                item.loading = false;
                callback();
            }) 
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let map = this.formItem;
                    let requestData = {
                        city_id: this.selectArea[0],
                        area_id: this.selectArea[1],
                    }
                    console.log(map);
                    api.godownUpdate(Object.assign(requestData, map)).then(() => {
                        fn.notice('编辑仓库成功', () => { this.$router.push('/godown/index'); });
                    });
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        handleChange(item) {
            this.selectArea = item;
        },
        getArea(area) {
            let requestData = {};
            area = area ? Number(area) : 0;
            if (area) {
                requestData = {
                    area_id: area
                }
            }
            return api.area(requestData).then(res => {
                let list = res.list.map(item => {
                    let temp = {
                        label: item.name,
                        value: item.id,
                        deep: item.deep
                    }
                    if (item.deep < 3) {
                        temp.children = [];
                        temp.loading = false
                    }
                    return temp;
                })
                return list;
            });
        }
    }
}
</script>