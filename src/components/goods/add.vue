<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person-add"></Icon>
                &nbsp;添加商品
            </p>
    
            <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
                <Form-item label="商品名称" prop="name">
                    <Input v-model="formItem.name" placeholder="请输入商品名称"></Input>
                </Form-item>
                <Form-item label="商品别名">
                    <Input v-model="formItem.tags" placeholder="请输入商品别名，用于查询"></Input>
                </Form-item>
                <Row>
                    <Col span="11">
                    <Form-item label="所属类别">
                        <cate @change="checkCate"></cate>
                    </Form-item>
                    </Col>
                    <Col span="2">&nbsp;</Col>
                    <Col span="11">
    
                    <Form-item label="商品品牌" prop="brand">
                        <Select placeholder="请选择商品品牌" v-model="formItem.brand">
                            <Option v-for="item in brand" :value="item.id" :key="item.id">{{item.name}}</Option>
                        </Select>
                    </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <Form-item label="生产产地" prop="">
                        <Input placeholder="请输入生产产地" v-model="formItem.origin"></Input>
                    </Form-item>
                    </Col>
                    <Col span="2">&nbsp;</Col>
                    <Col span="11">
                    <Form-item label="生产厂家" prop="">
                        <Input placeholder="请输入生产厂家" v-model="formItem.company"></Input>
                    </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <Form-item label="质保期(天)" prop="">
                        <Input placeholder="" v-model="formItem.shelf_life"></Input>
                    </Form-item>
                    </Col>
                    <Col span="2">&nbsp;</Col>
                    <Col span="11">
                    <Form-item label="质保期到期提醒天数" prop="">
                        <Input placeholder="" v-model="formItem.warning_date"></Input>
                    </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <Form-item label="主供应商" prop="">
                        <Input placeholder="请输入主供应商" v-model="formItem.provider"></Input>
                    </Form-item>
                    </Col>
                    <Col span="2">&nbsp;</Col>
                </Row>
                <Row>
                    <Col span="11">
                    <Form-item label="商品单位">
                        <Input placeholder="请输入商品单位" v-model="unit"></Input>
                    </Form-item>
                    </Col>
                    <Col :offset="1" span="4">
                    <div style="padding-top:8px">
                        <Checkbox v-model="hasFactor">添加转换因子</Checkbox>
                        <Tooltip content="用于商品不同单位之间的转换">
                            <Icon type="help-circled" color="#2d8cf0"></Icon>
                        </Tooltip>
    
                    </div>
                    </Col>
                </Row>
                <Row v-show="hasFactor">
                    <Col span="15">
                    <Form-item label="">
                        <table class="table text-center table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center">单位名</th>
                                    <th class="text-center">单位换算数量</th>
                                    <th class="text-center">是否作为默认</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) of formItem.unit">
                                    <td>
                                        <Input v-model="item.name"></Input>
                                    </td>
                                    <td>
                                        <Input v-model="item.factor"></Input>
                                    </td>
                                    <td>
                                        <p style="padding-top:5px">
                                            <Radio v-model="item.default" @on-change="setUnitDedault(index,item.default)">默认</Radio>
                                        </p>
                                    </td>
                                    <td>
                                        <Button type="warning" size="small" @click="removeUnit(index)">删除</Button>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="4" class="text-left">
                                        <Button type="primary" @click="appendUnit">添加换算因子</Button>
                                    </td>
                                </tr>
    
                            </tfoot>
                        </table>
                    </Form-item>
                    </Col>
    
                </Row>
    
                <Form-item label="商品属性">
                    <div style="padding-bottom:8px">
                        <Button type="info" size="small" @click="getAttrTemp">载入模板</Button>
                        <Button type="success" size="small" @click="cerateAttr">增加属性</Button>
                    </div>
                    <Card v-if="attrData.attr && attrData.attr.length > 0">
                        <template v-for="(a,i) in attrData.attr">
                            <Row>
                                <Col span="2">
                                <Button type="ghost" size="small" @click="appendAttr(i)">添加属性值</Button>
                                </Col>
                                <Col span="20">
                                <Form-item :label="a.keys" :key="i">
                                    <Row>
                                        <Col span="4" v-for="(s,ins) in a.vs" :key="ins">
                                        <Checkbox :key="ins" :label="i+'_'+a.alias +'_'+ s" style="padding-left:15px" @on-change="checkSpec($event,a.alias+'_'+ins,i,a.keys)">
                                        </Checkbox>
                                        <span :class="a.alias+'_'+ins +'  '" @click="editSpec(a.alias+'_'+ins)">{{s}}</span>
                                        <Input type="text" size="small" :class="'hide '+  a.alias+'_'+ins+'_input'" style="width:120px" :value="s" @on-blur="complateSpec(a.alias+'_'+ins)"></Input>
                                        </Col>
                                    </Row>
                                </Form-item>
                                </Col>
                            </Row>
                        </template>
                    </Card>
                </Form-item>
                <Form-item label="商品规格">
                    <table class="table text-center">
                        <thead>
                            <tr>
                                <th class="text-center">规格属性</th>
                                <th class="text-center">国际条码</th>
                                <th class="text-center">进价</th>
                                <th class="text-center">售价</th>
                                <!-- <th class="text-center">最低售价</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,ins) in attrData.checkAttr" :key="ins">
                                <td class="text-left">
                                    <div>
                                        <!-- <template v-for="up in getUploadList('uploadSKU'+ins)" v-if="getUploadList('uploadSKU'+ins)">
                                                                                          <img :src="item.imgurl"/>
                                                                                        </template> -->
                                        <Upload :ref="'uploadSKU'+ins" name="photo" :data="{frontend:ins}" :show-upload-list="false" :on-success="skuHandleSuccess" :format="['jpg','jpeg','png','gif']" :max-size="500" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="select" :action="uploadUrl" style="display: inline-block;width:58px;">
                                            <div class="upload-list upload-list-table" style="">
                                                <img :src="item.imgUrl" v-if="item.imgUrl" width="54" height="54" />
                                                <Icon type="camera" size="20" v-else></Icon>
                                            </div>
                                        </Upload>
                                        <span style="padding-left:10px;">{{item.item}}</span>
                                    </div>
                                </td>
                                <td style="width:200px;">
                                    <Input @on-blur="skuInput('sku_'+ins+'_codes',item.id,'codes')" :number="true" :value="('codes' in skuValues[item.id])?skuValues[item.id].codes:''" :class="'sku_'+ins+'_codes'"></Input>
                                </td>
                                <td style="width:150px;">
                                    <Input @on-blur="skuInput('sku_'+ins+'_who_price',item.id,'who_price')" :number="true" :value="('who_price' in skuValues[item.id])?skuValues[item.id].who_price:''" :class="'sku_'+ins+'_who_price'"></Input>
                                </td>
                                <td style="width:150px;">
                                    <Input @on-blur="skuInput('sku_'+ins+'_price',item.id,'price')" :number="true" :value="('price' in skuValues[item.id])?skuValues[item.id].price:''" :class="'sku_'+ins+'_price'"></Input>
                                </td>
                                <!-- <td style="width:150px;">
                                                                        <Input @on-blur="skuInput('sku_'+ins+'_small_price',item.id,'small_price')" :number="true" :value="('small_price' in skuValues[item.id])?skuValues[item.id].small_price:''" :class="'sku_'+ins+'_small_price'"></Input>
                                                                    </td> -->
                            </tr>
                        </tbody>
                    </table>
                </Form-item>
                <Form-item label="商品图片">
                    <div class="demo-upload-list" v-for="item in uploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png','gif']" :max-size="500" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" name="photo" :before-upload="handleBeforeUpload" type="select" :action="uploadUrl" multiple style="display:block;width:80px;float:left">
                        <div class="upload-list upload-list-warap" style="">
                            <Icon type="camera" size="20"></Icon>
                        </div>
                    </Upload>
                </Form-item>
                <Form-item label="商品描述">
                    <edit :input-content="inputContent" @on-change="getDesc"></edit>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </Form-item>
            </Form>
        </Card>
        <Modal v-model="selectTemp" title="请选择您要载入的具体模板" :mask-closable="false" @on-ok="ensureTemp">
            <Select placeholder="选择属性模板" v-model="tempId">
                <Option v-for="item in temps" :value="String(item.id)" :key="item.id">{{item.name}}</Option>
            </Select>
        </Modal>
        <Modal v-model="createAttrShow" title="添加新属性" :mask-closable="false" @on-ok="complteAttr" :width="1200">
            <attr ref="createAttr"></attr>
        </Modal>
        <Modal title="查看图片" v-model="visible">
            <img :src="imgName" v-if="visible" style="width: 100%">
            <p slot="footer"></p>
        </Modal>
    </div>
</template>
<script>
import * as fn from '../../until/common.js';
import * as api from '../../api/common.js';
import { Map } from "immutable";
import attr from '../common/temp';
import edit from '../common/edit';
import cate from '../common/cate';
export default {
    data() {
        return {
            uploadUrl: api.uploadUrl,
            uploadList: [],
            selectTemp: false,
            createAttrShow: false,
            tempId: 0,
            temps: [],
            classify: [],
            brand: [],
            unit: '',
            imgName: '',
            visible: false,
            attrData: {
                attr: [],
                checkAttr: []
            },
            hasFactor: false,
            skuValues: {},
            attrDataSpec: [],
            inputContent: '请输入商品描述',
            appendAttrValue:'',
            formItem: {
                name: '',
                tags: '',
                types: 0,
                brand: '',
                status: 1,
                goods_description: '',
                origin: '',
                company: '',
                provider: '',
                unit: [{
                    name: '',
                    factor: '',
                    default: false
                }],
                shelf_life: '',
                warning_date: 0,
                img: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '组名不能为空', trigger: 'blur' }
                ],
                types: [
                    { required: true, type: 'integer', message: '请选择一个分类', trigger: 'change' }
                ],
                brand: [
                    { required: true, type: 'integer', message: '请选择商品品牌', trigger: 'change' }
                ],
                unit: [
                    { required: true, type: 'integer', message: '请选择商品单位', trigger: 'change' }
                ]
            },

        }
    },
    components: {
        attr,
        edit,
        cate
    },
    created() {
        api.getBrand().then(lists => {
            this.brand = lists.datas;
        })
    },
    mounted() {
        this.$store.dispatch('actbreadcrumbions', {
            first: '商品管理',
            last: '添加商品'
        });
        this.uploadList = this.$refs.upload.fileList;
    },
    watch: {

    },
    methods: {
        skuHandleSuccess(res, file) {
            if (!res.success) {
                return false;
            }
            let ins = res.data.frontend;
            let newData = this.attrData.checkAttr;
            newData[ins].imgUrl = res.data.set_uri;
            newData[ins].imgName = res.data.hash;
            this.attrData.checkAttr = newData.concat();
        },
        handleSuccess(res, file, fileL) {
            if (!res.success) {
                return false;
            }
            file.url = res.data.set_uri;
            file.name = res.data.hash;
            const fileList = this.$refs.upload.fileList;
            let index = fileList.indexOf(file);
            if (index > 0) {
                this.$refs.upload.fileList.splice(index - 1, 1);
            }

        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg、gif 或 png 格式的图片。'
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 1M。'
            });
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < 2;
            if (!check) {
                this.$Notice.warning({
                    title: '最多只能上传 5 张图片。'
                });
            }
            return check;
        },
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {
            // 从 upload 实例删除数据
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        //添加属性值
        appendAttr(index){
            this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                autofocus: true,
                                placeholder: '请输入属性值'
                            },
                            style:{
                                marginTop:'20px'
                            },
                            on: {
                                input: (val) => {
                                    this.appendAttrValue = val;
                                }
                            }
                        })
                    },
                    title:'添加属性值',
                    onOk:()=>{
                        if(this.appendAttrValue){
                            this.attrData.attr[index].vs.push(this.appendAttrValue);
                        }
                    }
            })
        },
        //商品描述
        getDesc(html) {
            this.formItem.goods_description = html;
        },
        //获取分类
        getAttrTemp() {
            if (!this.formItem.types) {
                this.$Message.error('请先选择商品所属分类');
                return false;
            }
            api.getAttrLists({ cateid: this.formItem.types, needCount: 20 }).then(attr => {
                this.selectTemp = true;
                this.temps = attr.datas;
            });
        },
        //根据当前分类，获取规格属性模板
        ensureTemp() {
            if (!this.tempId) {
                return false;
            }
            let attrTemp = [];
            const spec = this.temps;
            spec.map(item => {
                if (item.id == this.tempId) {
                    let attr = typeof item.attr == 'object' ? item.attr : JSON.parse(item.attr);
                    let b = attr.map(v => {
                        let a = {
                            keys: v.attribute_name,
                            alias: v.attribute_id,
                            vs: v.options
                        };
                        return a;
                    });
                    attrTemp = b;
                }
            });
            this.attrData.attr = attrTemp;
        },
        //显示属性规格
        cerateAttr() {
            this.createAttrShow = true;
        },
        //创建属性规格
        complteAttr() {
            let attr = this.$refs.createAttr.dataMap;
            attr.map(item => {
                item.vs = Array.from(item.vs);
                return item;
            })
            this.attrData.attr.push(...attr);
        },
        //选择属性事件
        checkSpec(b, event, index, spec) {
            let text = document.querySelector('.' + event).innerHTML;
            let base = event.split('_');
            if (b) {
                if (!this.attrDataSpec[index]) {
                    this.attrDataSpec[index] = {};
                }
                let temp = { spec_key: base[0], spec_val: spec };
                Object.assign(this.attrDataSpec[index], temp);
                if (!('values' in this.attrDataSpec[index])) {
                    this.attrDataSpec[index].values = [];
                }
                this.attrDataSpec[index].values[base[1]] = text;
            } else {
                this.attrDataSpec[index].values.splice(base[1], 1, null);
                let bs = true;
                this.attrDataSpec[index].values.map(item => {
                    if (item !== null) {
                        bs = false
                    }
                    return item;
                })
                if (bs) {
                    this.attrDataSpec.splice(index, 1, null);
                }
            }
            this.SKUinfo();
        },
        //生成SKU信息
        SKUinfo() {
            var attrs = [].concat(this.attrDataSpec).filter(item => item);
            let base;
            let spec = [];
            let obj = {};
            while ((base = attrs.shift())) {
                if (!base) {
                    continue;
                }
                let temp = base.values;
                if (spec.length < 1) {
                    spec = temp.filter(it => it).map((item) => {
                        let one_value = { key: base.spec_key + '_' + base.spec_val + '_' + item, item: item, id: escape(item) }
                        if (one_value.id in this.skuValues) {
                            obj[one_value.id] = this.skuValues[one_value.id];
                        } else {
                            obj[one_value.id] = {};
                        }
                        return one_value;
                    });
                    continue;
                }
                let mer = [];
                for (let i = 0; i < spec.length; i++) {
                    if (!spec[i].item) continue;
                    for (let j = 0; j < temp.length; j++) {
                        if (!temp[j]) continue;
                        let v = spec[i].item + ' + ' + temp[j]
                        let o = {
                            key: spec[i].key + '#' + base.spec_key + '_' + base.spec_val + '_' + temp[j],
                            item: v,
                            id: escape(v)
                        };
                        if (o.id in this.skuValues) {
                            obj[o.id] = this.skuValues[o.id];
                        } else {
                            obj[o.id] = {};
                        }
                        mer.push(o);
                    }
                }
                spec = mer;
            }
            this.attrData.checkAttr = spec;
            Object.assign(this.skuValues ,obj);
        },
        //保存sku信息的相关值
        skuInput(e, hash, type) {
            let d = document.querySelector('.' + e);
            let v = d.getElementsByTagName('input')[0].value;
            this.skuValues[hash][type] = v;
        },
        //编辑属性，添加input框
        editSpec(e) {
            let d = document.querySelector('.' + e);
            let i = document.querySelector('.' + e + '_input');
            d.className += 'hide'
            i.className = e + '_input ivu-input-wrapper ivu-input-wrapper-small ivu-input-type';
            i.getElementsByTagName('input')[0].focus();
        },
        //完成编辑属性事件
        complateSpec(e) {
            let d = document.querySelector('.' + e);
            let i = document.querySelector('.' + e + '_input');
            d.className = e + ' ';
            i.className = e + '_input ivu-input-wrapper ivu-input-wrapper-small ivu-input-type hide';
            d.innerHTML = i.getElementsByTagName('input')[0].value;
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    const attrData = this.attrData;
                    const formItem = this.formItem;
                    const skuVaule = this.skuValues;
                    let attr = {};
                    let sku = [];
                    for (let item of attrData.checkAttr) {
                        let spec = item.key.split("#");
                        let skuAttr = {};
                        for (let spec_item of spec) {
                            let spec_item_arr = spec_item.split('_');
                            if (attr.hasOwnProperty(spec_item_arr[0])) {
                                if (attr[spec_item_arr[0]].options.indexOf(spec_item_arr[2]) == -1)
                                    attr[spec_item_arr[0]].options.push(spec_item_arr[2]);
                            } else {
                                attr[spec_item_arr[0]] = {
                                    id: spec_item_arr[0],
                                    name: spec_item_arr[1],
                                    options: [spec_item_arr[2]]
                                }
                            }
                            skuAttr[spec_item_arr[0]] = spec_item_arr[2];
                        }
                        let skuItem = skuVaule[item.id];
                        let skuVal = {};
                        if (skuItem) {
                            skuVal = {
                                barcode: skuItem.codes,
                                price: skuItem.price,
                                wholease_price: skuItem.who_price
                            }
                        }
                        let temp = {
                            image: item.imgName ? item.imgName : '',
                            sku_name: item.item,
                            attribute_data: skuAttr
                        };
                        sku.push(Object.assign(temp, skuVal));
                    }
                    if (sku.length < 1) {
                        this.$Notice.warning({
                            title: 'SKU 信息不正确',
                            desc: '请填写正确的SKU信息'
                        });
                    }
                    let imgs = this.uploadList.map(imgs => {
                        return imgs.name
                    });
                    if (imgs.length < 1) {
                        this.$Notice.warning({
                            title: '错误警告',
                            desc: '请上传商品图片'
                        });
                    }
                    let u = formItem.unit.concat([]);
                    let formUnit = u.map(status => {
                        let tem = Map(status);
                        tem.default = Number(tem.default);
                        return tem;
                    })
                    
                    let unit = !this.hasFactor ? this.unit : formItem.unit;
                    if (!unit) {
                        this.$Notice.warning({
                            title: '错误警告',
                            desc: '请填写商品单位信息'
                        });
                    }
                    let map = {
                        attributes: Object.values(attr),
                        skus: sku,
                        seller: formItem.provider,
                        units: unit,
                        imgs: imgs.join(','),
                        name: formItem.name,
                        company: formItem.company,
                        place: formItem.origin,
                        brand: formItem.brand,
                        alias: formItem.tags,
                        status: formItem.status,
                        life: formItem.shelf_life,
                        category: formItem.types,
                        desc: formItem.goods_description,
                        warning: formItem.warning_date
                    }
                    // console.log(map,);
                    api.goodsCreate(map).then(() => {
                        fn.notice('新增商品成功', () => { this.$router.push('/pro/goods'); });
                    });

                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },



        //分类选择
        checkCate(cateIds) {
            const cates = cateIds;
            this.formItem.types = cates[cates.length - 1];
        },
        //添加单位换算因子
        appendUnit() {
            let value = { name: '', factor: '', default: false };
            this.formItem.unit.push(value);
        },
        //删除单位换算因子
        removeUnit(index) {
            this.formItem.unit.splice(index, 1);
        },
        //更改默认单位
        setUnitDedault(index, status) {
            let data = this.formItem.unit;
            data[index].default = true;
            let newUnit = data.map((item, keys) => {
                item.default = false;
                if (keys == index) {
                    item.default = true;
                }
                return item;
            });
            this.formItem.unit = newUnit;
        },
        //sku上传队列
        getUploadList(ref) {
            return this.$refs[ref].fileList;
        }
    },

}
</script>
<style>
.upload-list {

    text-align: center;
    border: 1px dashed #d7dde4;
    cursor: pointer;
    transition: border-color .2s ease;
    border-radius: 4px;
}

.upload-list-table {
    width: 58px;
    height: 58px;
    line-height: 58px;
}

.upload-list-warap {
    width: 80px;
    height: 80px;
    line-height: 80px;
}

.upload-list:hover {
    border: 1px dashed #39f;
}

.demo-upload-list {
    display: block;
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
    float: left;
}

.demo-upload-list img {
    width: 100%;
    height: 100%;
}

.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
}

.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}

.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>

