<template>
    <div>
        <Table ref="attrTable" border :columns="columns" :data="dataMap">
            <div slot="footer" style="padding-left:20px;">
                <Button type="info" @click="pushAttrTable">
                    <Icon type="ios-plus"></Icon>
                    添加属性
                </Button>
            </div>
        </Table>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    props: ['attr'],
    data() {
        return {
            columns: [
                {
                    title: '属性名',
                    key: "keys",
                    algin: 'center',
                    width: 280,
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    content: "删除属性"
                                }
                            }, [h('Icon', {
                                props: {
                                    type: "ios-minus",
                                    size: 18,
                                    color: 'red'
                                },
                                style: {
                                    marginRight: '18px',
                                    marginTop: '5px',
                                    cursor: 'pointer'
                                },
                                nativeOn: {
                                    click: () => { this.removeAttr(params.index) }
                                }
                            })]
                            ),
                            h('Input', {
                                style: {
                                    width: '210px',
                                },
                                attrs: {
                                    placeholder: "请输入属性名......"
                                },
                                props: {
                                    value: params.row.keys
                                },
                                on: {
                                    'on-blur': (text) => { this.pushAttrKeys(text.target.value, params.index); }
                                },
                            })
                        ]);
                    }
                },
                {
                    title: "属性标识(英文字段)",
                    key: "alias",
                    width: 220,
                    render: (h, params) => {
                        return h('Input', {
                            style: {
                                width: '190px',
                            },
                            attrs: {
                                placeholder: "英文字段，用以对应属性名......"
                            },
                            props: {
                                value: params.row.alias
                            },
                            on: {
                                'on-blur': (text) => { this.pushAttrAlias(text.target.value, params.index); }
                            },
                        })
                    }
                }, {
                    title: '属性值',
                    key: "vs",
                    render: (h, params) => {
                        let row = Array.from(params.row.vs);
                        let v = '';
                        let c = row.map(item => {
                            return h('Tag', {
                                props: { color: 'green', closable: true, type: "dot" },
                                on: {
                                    'on-close': () => {
                                        this.removeProps(item, params.index);
                                    }
                                }
                            }, item);
                        })

                        return h('div', {
                            style: {
                                paddingTop: '8px'
                            }
                        }, [
                                h('Input', {
                                    style: {
                                        width: '450px',
                                        height: '34px'
                                    },
                                    attrs: {
                                        placeholder: "请输入属性值......",
                                    },

                                    on: {
                                        'on-blur': (text) => { this.addProps(text.target.value, params.index); text.target.value = '' },
                                        'on-enter': (text) => {
                                            this.addProps(text.target.value, params.index); text.target.value = '';
                                        },
                                    },
                                }, [
                                        h("Button", {
                                            slot: "append",
                                            props: {
                                                icon: 'ios-plus'
                                            },
                                        })
                                    ]
                                ),
                                h('div', {
                                    style: { paddingTop: '8px', paddingBottom: '5px' }
                                }, c)
                            ]
                        );
                    }
                }
            ],
            datas: [{ keys: '', alias: '', vs: new Set() }]
        }
    },

    computed: {
        dataMap() {
            return this.datas;
        }
    },
    watch: {
        attr() {
            if (this.attr && typeof this.attr === 'object') {
                this.datas = this.attr;
            }
        }
    },
    methods: {
        pushAttrTable() {
            this.dataMap.push({ keys: '', alias: '', vs: new Set() });
        },
        addProps(v, index) {
            if (!v) return false;
            let old = this.dataMap[index];
            old.vs.add(v.trim());
            this.dataMap.splice(index, 1, old);
            this.focusIndex = index;
        },
        removeProps(v, index) {
            if (!v) return false;
            let old = this.dataMap[index];
            old.vs.delete(v);
            this.dataMap.splice(index, 1, old);
        },
        pushAttrKeys(v, index) {
            if (!v) return false;
            this.dataMap[index].keys = v.trim();
        },
        pushAttrAlias(v, index) {
            if (!v) return false;
            this.dataMap[index].alias = v.trim();
        },
        removeAttr(index) {
            this.dataMap.splice(index, 1);
        }
    }
}
</script>