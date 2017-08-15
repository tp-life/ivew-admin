<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person-add"></Icon>
                &nbsp;添加门店
            </p>
            <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="100">
                <h4>门店信息</h4>
                <hr />
                <Form-item label="门店名称" prop="sname">
                    <Input v-model="formItem.sname" placeholder="请输入门店名称"></Input>
                </Form-item>
                <Row>
                    <Col span="11">
                    <Form-item label="门店电话" prop="sphone">
                        <Input v-model="formItem.sphone" placeholder="门店电话"></Input>
                    </Form-item>
                    </Col>
                    <Col offset="1" span="12">
                    <Form-item label="门店地址">
                         <Cascader :data="area" :load-data="loadArea" @on-change="handleChange"></Cascader>
                    </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <Form-item label="详细地址" prop="address">
                        <Input v-model="formItem.address" placeholder="详细地址"></Input>
                    </Form-item>
                    </Col>
                    <Col offset="1" span="12">
                    <Form-item label="坐标经纬度">
                        <Input placeholder="门店坐标地址" v-model="formItem.location"></Input>
                        <p class="help-block">可通过
                            <a href="http://lbs.amap.com/console/show/picker" target="_blank">坐标拾取工具</a>，拾取地址后进行复制。例如：116.369774,39.919141</p>
                    </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <Form-item label="门店图片">
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
                    </Col>
                </Row>
                <div style="margin-bottom:35px"></div>
                <h4>门店管理员信息</h4>
                <hr />
                <Row style="margin:30px 0;">
                    <Col span="11">
                        <Form-item label="管理员姓名" prop="sadminName">
                            <Input v-model="formItem.sadminName" placeholder="门店管理员姓名"></Input>
                        </Form-item>
                    </Col>
                    <Col offset="1" span="12">
                        <Form-item label="管理员电话" prop="sadminPhone">
                            <Input v-model="formItem.sadminPhone" placeholder="门店管理员电话"></Input>
                        </Form-item>
                    </Col>
                </Row>
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
            uploadUrl: api.uploadUrl,
            classify: [],
            uploadList:[],
            area:[],
            formItem: {
                sname: '',
                sphone:'',
                address:'',
                location:'',
                sadminName:'',
                sadminPhone:'',
            },
            selectArea:[],
            ruleValidate: {
                sname: [
                    { required: true, message: '门店名不能为空', trigger: 'blur' }
                ],
                sphone:[
                    { required: true, message: '门店电话不能为空', trigger: 'blur' }
                ],
                address:[
                    { required: true, message: '门店地址不能为空', trigger: 'blur' }
                ],
                sadminName: [
                    { required: true, message: '管理员不能为空', trigger: 'blur' }
                ],
                sadminPhone:[
                    { required: true, message: '管理员电话不能为空', trigger: 'blur' }
                ],
            },

        }
    },
    created(){
       let area =  this.getArea().then(list=>{
           this.area = list;
       });
    //    console.log(area);
    },
    mounted() {
        this.$store.dispatch('actbreadcrumbions', {
            first: '门店管理',
            last: '添加门店'
        });
        this.uploadList = this.$refs.upload.fileList;
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
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let map = this.formItem;
                    let requestData = {
                        city_id:this.selectArea[0],
                        area_id:this.selectArea[1],
                        image:this.uploadList[0].name
                    }
                    console.log(requestData,map);
                    api.sellerCreate(Object.assign(requestData,map)).then(() => {
                        fn.notice('新增门店成功', () => { this.$router.push('/seller/store'); });
                    });
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        handleChange(item){
            this.selectArea = item;
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
        }
    }
}
</script>
<style scoped>
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
