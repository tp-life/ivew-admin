<template>
    <div id="goods_content" type="text/plain">
        <span v-html="inputContent"></span>
    </div>
</template>
<script>

import WangEditor from 'wangeditor';

import config from '../../../config/config.js';
export default {
    props: ['inputContent'],
    data() {
        return {
            dataInterface: {
                editorUpImgUrl: config.imgUpload // 编辑器插入的图片上传地址
            },
            editor: null,  // 存放实例化的wangEditor对象，在多个方法中使用
            editorContent: '',
        }
    },
    mounted() {
        this.createEditor();
    },
    watch: {
        inputContent() {
            // console.log(this.editorContent);
        }
    },
    methods: {
        createEditor() {
            this.editor = new WangEditor('#goods_content');
            this.editor.customConfig.uploadImgServer = config.imgUpload;
            this.editor.customConfig.uploadFileName = "photo";
            // this.editor.customConfig.withCredentials = true;
            this.editor.customConfig.uploadImgMaxSize= 1024 * 1024;
            this.editor.customConfig.uploadImgHooks = {
                customInsert: function (insertImg, result, editor) {
                    var url = result.data.set_uri
                    insertImg(url)

                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            };
            this.editor.customConfig.onchange = (html) => {
                this.editorContent = html
                this.$emit('on-change',html)
            }
            this.editor.create()
        },
    }
}
</script>
<style>
#goods_content {
    height: auto;
}
</style>