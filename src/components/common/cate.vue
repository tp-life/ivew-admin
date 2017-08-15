<template>
    <div>
        <Cascader v-model="cates" :data="orginData" filterable @on-change="changeData"></Cascader>
    </div>
</template>
<script>
import * as api from '../../api/common';
export default {
    props: ['active'],
    data() {
        return {
            orginData: [],
            cates: [],
            baseData: {},
        }
    },
    created() {
        api.getCate().then(response => {
            this.orginData = this.treeData(response);
        })
    },
    watch: {
        active() {
            if (this.active) {
                setTimeout(() => {
                    this.getDefauleCate(this.active);
                }, 50);
            }
        }
    },
    methods: {
        //组装菜单树
        treeData(treeData) {
            let j = 0;
            let baseSize = new Set();
            while (true) {
                let size = treeData.length;
                let a = false;  //元素删除控制位
                j = j >= size ? size - 1 : j;
                if (size < 1 || size == baseSize.size) {
                    break;
                }
                if (!this.baseData.hasOwnProperty(treeData[j].id)) {
                    this.baseData[treeData[j].id] = treeData[j];
                }
                if (treeData[j].pid == 0) {
                    baseSize.add(treeData[j].id);
                }
                for (let i = 0; i < size; i++) {
                    treeData[i].value = String(treeData[i].id);
                    treeData[i].label = treeData[i].name;
                    if (treeData[i].pid == treeData[j].id) {
                        a = true;
                    }
                    //解决数据位置顺序错乱导致误删
                    if (treeData[i].id == treeData[j].pid) {
                        // console.log(treeData[i].name,treeData[j].name);
                        if (!treeData[i].hasOwnProperty('children')) {
                            treeData[i].children = [];
                        }
                        treeData[i].children[treeData[j].id] = treeData[j];
                    }
                }
                if (!a && treeData[j].pid != 0) {
                    treeData.splice(j, 1);
                } else {
                    j++;
                }
                if (j > size - 1) {
                    j = 0;
                }
            }
            let datas = this.filterData(treeData);
            return datas;
        },
        //过滤空数组
        filterData(data) {
            let size = data.length;
            for (let i = 0, j = 0; i < size; i++) {
                if (!data[j]) {
                    data.splice(j, 1);
                    continue;
                }
                delete data[j].id;
                delete data[j].name;
                // delete data[j].pid;
                delete data[j].status;
                if (data[j].hasOwnProperty('children')) {
                    data[j].children = this.filterData(data[j].children);
                }
                j++;
            }
            return data;
        },
        getDefauleCate(active) {
            while (active) {
                if (!this.baseData.hasOwnProperty(active)) {
                    break;
                }
                let id = String(active);
                this.cates.unshift(id);
                active = this.baseData[active].pid;
            }
        },
        changeData(value, selectedData) {
            this.$emit('change', value);
        }
    }
}    
</script>
<style>
.ivu-cascader-menu {
    min-width: 160px;
    height: 200px;
}
</style>

