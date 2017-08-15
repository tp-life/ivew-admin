import Mock from 'mockjs';
import config from '../../config/config.js';
const URI = config.apiDomain;

//图片上传
Mock.mock(config.imgUpload,{
    "success": true,
    "errors": [],
    "data": {
        "url": "http://localhost:8082/f4f791f9a2ff6341525a418e9f1f8ccb",
        "name": "测试的图片.jpg",
        "set_uri": "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar",
        "hash": "f4f791f9a2ff6341525a418e9f1f8ccb",
        "frontend": []
    }
});

//权限信息
Mock.mock(URI + '/rule/uroles', {
    "success": true,
    "errors": [],
    "data": {
        "ids": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
        "rules": ["user.list", "user.info", "user.add", "user.update", "user.stat", "user.delete", "user.search", "rule.list", "rule.uroles", "rule.group", "rule.addgroup", "rule.groupinfo", "rule.groupupdate", "rule.stat", "rule.gdelete", "rule.gsearch", "brand.lists", "brand.create", "brand.update", "brand.state", "brand.delete", "brand.info", "category.lists", "category.create", "category.update", "category.delete", "attr.create", "attr.update", "attr.list", "attr.info", "attr.delete", "goods.create", "goods.update", "goods.info", "goods.list", "goods.unitfactor", "goods.skuinfo", "goods.uupdate", "seller.create", "seller.update", "seller.info", "seller.stat", "seller.delete", "seller.asslist", "seller.orderlist", "seller.goodslist", "seller.list", "consumer.list", "consumer.orderlist", "consumer.orderinfo", "consumer.callorders", "order.list", "order.stat", "order.info", "order.add", "finance.userorders", "finance.userrefund", "finance.purlist", "finance.settlement", "finance.approvallist", "finance.approval", "finance.refundlist", "finance.refund", "seller.allasslist", "consumer.info", "godown.list", "godown.create", "godown.info", "godown.update", "godown.status", "godown.delete", "godown.adduser", "godown.userlist", "godown.deleteuser"]
    }
})
//登陆
Mock.mock(URI + '/user/login', { "success": true, "errors": [], "data": { "userName": "adminTest", "id": 1, "img": null, "token": "35882fc40f9f2f224cc7486f41676110" } })

//单个用户列表用户详细数据
Mock.mock(URI +'/user/search', {
    "success": true,
    "errors": [],
    "data": {
        "list": [
            {
                "id": 1,
                "name": "admin",
                "alias": "老板",
                "pwd": "08036c3a05dead0a9e62540ec801461a",
                "status": "1",
                "phone": "18080091166",
                "deleted_at": null,
                "created_at": "2017-07-06 10:41:30",
                "updated_at": "2017-08-14 18:29:23",
                "extend": "{\"loginToken\":\"35882fc40f9f2f224cc7486f41676110\"}"
            },
            {
                "id": 4,
                "name": "root",
                "alias": "老板",
                "pwd": "4846bb538463e7a0a98accecdc0355dc",
                "status": "1",
                "phone": "18080091133",
                "deleted_at": null,
                "created_at": "2017-07-06 10:41:30",
                "updated_at": "2017-07-10 09:47:19",
                "extend": null
            },
            {
                "id": 7,
                "name": "hahhah",
                "alias": null,
                "pwd": "2f71d04555cc7afda719f5299d85a303",
                "status": "0",
                "phone": "18080091166",
                "deleted_at": null,
                "created_at": "-0001-11-30 00:00:00",
                "updated_at": "2017-07-10 19:27:46",
                "extend": null
            }
        ],
        "allCount": 3
    }
});

//用户详情
Mock.mock(URI + '/user/info', {
    "success": true,
    "errors": [],
    "data": {
        "id": 1,
        "name": "admin",
        "alias": "老板",
        "phone": "18080091166",
        "status": "1",
        "datetime": "2017-07-06 10:41:30",
        "group": [
            {
                "id": 1,
                "name": "超级管理员"
            }
        ]
    }
});
//删除用户列表用户
Mock.mock(URI + '/user/delete', { "success": true, "errors": [], "data": [] });
//更改用户状态
Mock.mock(URI + '/user/stat', { "success": true, "errors": [], "data": [] });
//新增用户
Mock.mock(URI + '/user/add', { "success": true, "errors": [], "data": [] });
//修改用户资料
Mock.mock(URI + '/user/update', { "success": true, "errors": [], "data": [] });
//添加用户--权限分组
Mock.mock(URI + '/user/groups', {
    "success": true,
    "errors": [],
    "data": [
        {
            "id": 1,
            "name": "超级管理员"
        },
        {
            "id": 2,
            "name": "普通用户"
        },
        {
            "id": 3,
            "name": "测试"
        },
        {
            "id": 4,
            "name": "财务人员"
        }
    ]
});
//修改密码
Mock.mock(URI + '/user/updatepwd', { "success": true, "errors": [], "data": [] });

//获取权限分组
Mock.mock(URI + '/rule/gsearch', {
    "success": true,
    "errors": [],
    "data": {
        "groupList": [
            {
                "id": 1,
                "name": "超级管理员",
                "desc": "拥有所有的权限哟哟",
                "status": "1",
                "deleted_at": null,
                "created_at": "2017-07-06 11:32:32",
                "updated_at": "2017-07-11 16:18:06"
            }
        ],
        "allCount": 1
    }
});
//删除分组
Mock.mock(URI + '/rule/gdelete', { "success": true, "errors": [], "data": [] });
//更改分组状态
Mock.mock(URI + '/rule/stat', { "success": true, "errors": [], "data": [] });
//新增分组
Mock.mock(URI + '/rule/addgroup', { "success": true, "errors": [], "data": [] });
//修改分组
Mock.mock(URI + '/rule/groupupdate', { "success": true, "errors": [], "data": [] });
//获取分组详情信息
Mock.mock(URI + '/rule/groupinfo', {
    "success": true,
    "errors": [],
    "data": {
        "id": 1,
        "name": "超级管理员",
        "desc": "拥有所有的权限哟哟",
        "status": "1",
        "rule": {
            "1": "获取运营用户列表",
            "2": "查看运营人员详细信息",
            "3": "添加运营人员",
            "4": "运营用户信息修改",
            "5": "改变运营用户状态",
            "6": "删除运营用户",
            "7": "搜索运营用户",
            "8": "获取权限组模块",
            "9": "获取运营用户所拥有的权限",
            "10": "获取权限小组列表",
            "11": "添加权限小组",
            "12": "获取权限组详细信息",
            "13": "修改权限组",
            "14": "改变小组状态",
            "15": "删除权限小组",
            "16": "权限小组搜索",
            "17": "添加品牌",
            "18": "修改品牌",
            "19": "更改品牌状态",
            "20": "删除品牌",
            "22": "品牌详情",
            "23": "分类列表",
            "24": "添加商品分类",
            "25": "修改商品分类",
            "26": "删除商品分类",
            "27": "添加商品模板",
            "28": "修改商品模板",
            "29": "商品模板列表",
            "30": "商品模板列表详情",
            "31": "删除商品模板",
            "32": "添加商品",
            "33": "修改商品信息",
            "34": "商品详情",
            "36": "商品列表",
            "37": "商品单位转换",
            "38": "获取商品SKU信息",
            "39": "更新SKU信息",
            "40": "添加门店",
            "41": "修改门店",
            "42": "门店信息",
            "43": "更改门店状态",
            "44": "删除门店",
            "45": "获取门店店员",
            "46": "门店采购列表",
            "47": "门店在售商品",
            "48": "门店列表",
            "49": "消费者管理",
            "50": "消费者消费记录",
            "51": "消费者消费详情",
            "52": "消费者来电记录",
            "53": "订单列表",
            "54": "修改订单状态",
            "55": "订单详情",
            "56": "代客下单",
            "57": "消费者支付记录",
            "58": "消费者退款记录",
            "59": "门店采购记录",
            "60": "门店结算记录",
            "61": "门店提现申请",
            "62": "门店提现审核",
            "63": "用户退款申请",
            "64": "用户退款",
            "65": "查看所有店员",
            "66": "消费者详情",
            "67": "仓库列表",
            "68": "添加仓库",
            "69": "单个仓库信息",
            "70": "修改仓库",
            "71": "修改仓库状态",
            "72": "删除仓库",
            "73": "添加仓库人员",
            "74": "仓库人员列表",
            "75": "删除仓库人员"
        }
    }
});
//获取权限列表
Mock.mock(URI + '/rule/list', {
    "success": true,
    "errors": [],
    "data": [
        {
            "id": 1,
            "name": "运营用户",
            "rule": {
                "1": "获取运营用户列表",
                "2": "查看运营人员详细信息",
                "3": "添加运营人员",
                "4": "运营用户信息修改",
                "5": "改变运营用户状态",
                "6": "删除运营用户",
                "7": "搜索运营用户"
            }
        },
        {
            "id": 2,
            "name": "权限分组",
            "rule": {
                "8": "获取权限组模块",
                "9": "获取运营用户所拥有的权限",
                "10": "获取权限小组列表",
                "11": "添加权限小组",
                "12": "获取权限组详细信息",
                "13": "修改权限组",
                "14": "改变小组状态",
                "15": "删除权限小组",
                "16": "权限小组搜索"
            }
        }
    ]
});

//品牌列表
Mock.mock(URI + '/brand/lists', {
    "success": true,
    "errors": [],
    "data": {
        "count": 3,
        "datas": [
            {
                "id": 1,
                "name": "农夫山泉",
                "status": "1"
            },
            {
                "id": 7,
                "name": "康师傅吧",
                "status": "1"
            },
            {
                "id": 8,
                "name": "乐事",
                "status": "1"
            }
        ]
    }
});
//更改品牌状态
Mock.mock(URI + '/brand/stat', { "success": true, "errors": [], "data": [] });
//删除品牌
Mock.mock(URI + '/brand/delete', { "success": true, "errors": [], "data": [] });
//添加品牌
Mock.mock(URI + '/brand/create', { "success": true, "errors": [], "data": [] });
//修改品牌
Mock.mock(URI + '/brand/update', { "success": true, "errors": [], "data": [] });
//获取品牌详情
Mock.mock(URI + '/brand/info', {
    "success": true,
    "errors": [],
    "data": {
        "id": 1,
        "name": "测试添加品牌",
        "status": "1"
    }
});

//分类列表
Mock.mock(URI + '/category/lists', {
    "success": true,
    "errors": [],
    "data": [
        {
            "id": 16,
            "name": "你好",
            "pid": 0,
            "status": "1"
        },
        {
            "id": 20,
            "name": "零食",
            "pid": 0,
            "status": "1"
        },
        {
            "id": 22,
            "name": "薯片",
            "pid": 20,
            "status": "1"
        },
        {
            "id": 24,
            "name": "哎哟",
            "pid": 20,
            "status": "1"
        },
        {
            "id": 25,
            "name": "不是吧",
            "pid": 20,
            "status": "1"
        },
        {
            "id": 26,
            "name": "还有呢",
            "pid": 20,
            "status": "1"
        },
        {
            "id": 27,
            "name": "还是有的",
            "pid": 24,
            "status": "1"
        },
        {
            "id": 28,
            "name": "继续测试",
            "pid": 27,
            "status": "1"
        },
        {
            "id": 29,
            "name": "好",
            "pid": 22,
            "status": "1"
        }
    ]
});
//添加分类
Mock.mock(URI + '/category/create', { "success": true, "errors": [], "data": { id: 3 } });
//修改分类
Mock.mock(URI + '/category/update', { "success": true, "errors": [], "data": [] });
//获取分类祥情
Mock.mock(URI + '/category/info', {
    "success": true,
    "errors": [],
    "data": {
        "id": 1,
        "name": "分类01",
        "pid": 0,
        "status": "1"
    }
});
//删除分类
Mock.mock(URI + '/category/delete', { "success": true, "errors": [], "data": [] });

//获取属性模板列表
Mock.mock(URI + '/attr/list', {
    "success": true,
    "errors": [],
    "data": {
        "count": 2,
        "datas": [
            {
                "id": 6,
                "name": "不是",
                "attr": "[{\"options\":[\"想想吧\"], \"attribute_id\":\"test\", \"attribute_name\":\"测试dev\"}]",
                "status": "1",
                "cateid": 16,
                "cateName": "你好"
            },
            {
                "id": 8,
                "name": "薯片",
                "attr": "[{\"options\":[\"椒盐\", \"烧烤\", \"麻辣\"], \"attribute_id\":\"taste\", \"attribute_name\":\"口味\"}, {\"options\":[\"500g\", \"750g\"], \"attribute_id\":\"size\", \"attribute_name\":\"大小\"}]",
                "status": "1",
                "cateid": 22,
                "cateName": "薯片"
            }
        ]
    }
});
//更改模板状态
// Mock.mock(URI + '/attr/list', { "success": true, "errors": [], "data": [] });
//删除属性模板
Mock.mock(URI + '/attr/delete', { "success": true, "errors": [], "data": [] });
//新增属性模板
Mock.mock(URI + '/attr/create', { "success": true, "errors": [], "data": [] });
//修改属性模板
Mock.mock(URI + '/attr/update', { "success": true, "errors": [], "data": [] });
//获取模板详情
Mock.mock(URI + '/attr/info', {
    "success": true,
    "errors": [],
    "data": {
        "id": 6,
        "name": "不是",
        "attribute_options": "[{\"options\":[\"想想吧\"], \"attribute_id\":\"test\", \"attribute_name\":\"测试dev\"}]",
        "status": "1",
        "catergoy_id": 16,
        "deleted_at": null,
        "created_at": "2017-07-13 12:57:25",
        "updated_at": "2017-07-13 19:32:14"
    }
});

//商品列表
Mock.mock(URI + '/goods/list', {
    "success": true,
    "errors": [],
    "data": {
        "count": 3,
        "goodList": [
            {
                "goods_id": 18,
                "goods_name": "乐事薯片",
                "brand": "乐事",
                "category": "薯片",
                "life": 120,
                "status": "1",
                "place": "浙江",
                "company": "乐事薯片有限公司",
                "seller": "食品批发商",
                "defaultUnit": "包",
                "imgs": [
                    {
                        "hash": "5cf65d9fed1b7e255b1be1c25da0e1b9",
                        "url": "https://umijoy.s3.cn-north-1.amazonaws.com.cn/umijoy-5cf65d9fed1b7e255b1be1c25da0e1b9.jpg"
                    }
                ]
            },
            {
                "goods_id": 16,
                "goods_name": "乐事薯片",
                "brand": "农夫山泉",
                "category": "",
                "life": 180,
                "status": "1",
                "place": "浙江",
                "company": "乐事薯片有限公司",
                "seller": "食品公司",
                "defaultUnit": "包",
                "imgs": [
                    {
                        "hash": "5cf65d9fed1b7e255b1be1c25da0e1b9",
                        "url": "https://umijoy.s3.cn-north-1.amazonaws.com.cn/umijoy-5cf65d9fed1b7e255b1be1c25da0e1b9.jpg"
                    }
                ]
            },
            {
                "goods_id": 15,
                "goods_name": "农夫山泉矿泉水",
                "brand": "农夫山泉",
                "category": "你好",
                "life": 180,
                "status": "1",
                "place": "峨眉山",
                "company": "农夫山泉公司",
                "seller": "心空购物",
                "defaultUnit": "瓶",
                "imgs": [
                    {
                        "hash": "d58d1467874ae93d40857c3187668f49",
                        "url": "https://umijoy.s3.cn-north-1.amazonaws.com.cn/umijoy-d58d1467874ae93d40857c3187668f49.png"
                    }
                ]
            }
        ]
    }
});
//添加商品
Mock.mock(URI + '/goods/create', { "success": true, "errors": [], "data": 6 });
//商品详情
Mock.mock(URI + '/goods/info', {
    "success": true,
    "errors": [],
    "data": {
        "goods_id": 15,
        "goods_name": "农夫山泉矿泉水",
        "alias": "农夫山泉，山泉，矿泉水",
        "cate_id": 16,
        "brand_id": 1,
        "warning": 0,
        "place": "峨眉山",
        "company": "农夫山泉公司",
        "seller": "心空购物",
        "life": 180,
        "attr": "[{\"id\":\"weidao\", \"name\":\"口味\", \"options\":[\"水蜜桃\", \"荔枝\"]}, {\"id\":\"size\", \"name\":\"容量\", \"options\":[\"500ml\", \"500ml\"]}]",
        "sku": [
            {
                "sku_id": 1,
                "goods_id": 15,
                "goods_name": "农夫山泉矿泉水 水蜜桃 + 500ml",
                "barcode": "1232453654",
                "price": "4.00",
                "wholease_price": "2.00",
                "image": [
                    {
                        "hash": "5cf65d9fed1b7e255b1be1c25da0e1b9",
                        "url": "https://umijoy.s3.cn-north-1.amazonaws.com.cn/umijoy-5cf65d9fed1b7e255b1be1c25da0e1b9.jpg"
                    }
                ],
                "attribute": "{\"size\":\"500ml\", \"weidao\":\"水蜜桃\"}"
            },
            {
                "sku_id": 2,
                "goods_id": 15,
                "goods_name": "农夫山泉矿泉水 荔枝 + 500ml",
                "barcode": "34654675545",
                "price": "5.00",
                "wholease_price": "2.00",
                "image": [
                    {
                        "hash": "d58d1467874ae93d40857c3187668f49",
                        "url": "https://umijoy.s3.cn-north-1.amazonaws.com.cn/umijoy-d58d1467874ae93d40857c3187668f49.png"
                    }
                ],
                "attribute": "{\"size\":\"500ml\", \"weidao\":\"荔枝\"}"
            }
        ],
        "selectedAttr": {
            "0": "500ml",
            "1": "水蜜桃",
            "3": "荔枝"
        },
        "image": [
            {
                "set_uri": "https://umijoy.s3.cn-north-1.amazonaws.com.cn/umijoy-d58d1467874ae93d40857c3187668f49.png",
                "hash": "d58d1467874ae93d40857c3187668f49",
                "name": "Screenshot_20170713-161425.png"
            }
        ],
        "desc": "hfhdsfsdfd",
        "status": "1",
        "units": [
            {
                "id": 28,
                "goods_id": 15,
                "name": "瓶",
                "factor": 1,
                "default": "1"
            },
            {
                "id": 29,
                "goods_id": 15,
                "name": "件",
                "factor": 12,
                "default": "0"
            },
            {
                "id": 44,
                "goods_id": 15,
                "name": "箱",
                "factor": 36,
                "default": "0"
            }
        ]
    }
});
//修改商品
Mock.mock(URI + '/goods/update', { "success": true, "errors": [], "data": [] });

//门店列表
Mock.mock(URI + '/seller/list', {
    "success": true,
    "errors": [],
    "data": {
        "list": [
            {
                "id": 2,
                "name": "龙湖店",
                "city_id": 385,
                "area_id": 45056,
                "address": "成都市 高新区 龙湖世纪啥地方",
                "image": [
                    {
                        "hash": "5cf65d9fed1b7e255b1be1c25da0e1b9",
                        "url": "https://umijoy.s3.cn-north-1.amazonaws.com.cn/umijoy-5cf65d9fed1b7e255b1be1c25da0e1b9.jpg"
                    }
                ],
                "location": "26.074508 119.296494",
                "phone": "83252323",
                "status": "1",
                "master": "张三"
            }
        ],
        "allCount": 1
    }
});
//添加门店
Mock.mock(URI + '/seller/create', {
    "success": true,
    "errors": [],
    "data": {
        "seller_id": 3,
        "adminId": 4
    }
});
//获取门店信息
Mock.mock(URI + '/seller/info', {
    "success": true,
    "errors": [],
    "data": {
        "id": 2,
        "name": "龙湖店",
        "city_id": 385,
        "area_id": 45056,
        "address": "成都市 高新区 龙湖世纪啥地方",
        "location": "26.074508 119.296494",
        "phone": "83252323",
        "image": {
            "hash": "5cf65d9fed1b7e255b1be1c25da0e1b9",
            "url": "https://umijoy.s3.cn-north-1.amazonaws.com.cn/umijoy-5cf65d9fed1b7e255b1be1c25da0e1b9.jpg"
        },
        "admin": "张三",
        "adminPhone": "18080091133"
    }
});
//修改门店
Mock.mock(URI + '/seller/update', { "success": true, "errors": [], "data": [] });
//更改门店状态
Mock.mock(URI + '/seller/stat', { "success": true, "errors": [], "data": [] });
//删除门店
Mock.mock(URI + '/seller/delete', { "success": true, "errors": [], "data": [] });
//地址信息
Mock.mock(URI + '/seller/area', {
    "success": true,
    "errors": [],
    "data": {
        "list": [
            {
                "id": 385,
                "name": "成都市",
                "deep": 2
            },
            {
                "id": 386,
                "name": "自贡市",
                "deep": 2
            },
            {
                "id": 387,
                "name": "攀枝花市",
                "deep": 2
            },
            {
                "id": 388,
                "name": "泸州市",
                "deep": 2
            },
            {
                "id": 389,
                "name": "德阳市",
                "deep": 2
            },
            {
                "id": 390,
                "name": "绵阳市",
                "deep": 2
            },
            {
                "id": 391,
                "name": "广元市",
                "deep": 2
            },
            {
                "id": 392,
                "name": "遂宁市",
                "deep": 2
            },
            {
                "id": 393,
                "name": "内江市",
                "deep": 2
            },
            {
                "id": 394,
                "name": "乐山市",
                "deep": 2
            },
            {
                "id": 395,
                "name": "南充市",
                "deep": 2
            },
            {
                "id": 396,
                "name": "眉山市",
                "deep": 2
            },
            {
                "id": 397,
                "name": "宜宾市",
                "deep": 2
            },
            {
                "id": 398,
                "name": "广安市",
                "deep": 2
            },
            {
                "id": 399,
                "name": "达州市",
                "deep": 2
            },
            {
                "id": 400,
                "name": "雅安市",
                "deep": 2
            },
            {
                "id": 401,
                "name": "巴中市",
                "deep": 2
            },
            {
                "id": 402,
                "name": "资阳市",
                "deep": 2
            },
            {
                "id": 403,
                "name": "阿坝藏族羌族自治州",
                "deep": 2
            },
            {
                "id": 404,
                "name": "甘孜藏族自治州",
                "deep": 2
            },
            {
                "id": 405,
                "name": "凉山彝族自治州",
                "deep": 2
            }
        ]
    }
});
//门店店员
Mock.mock(URI + '/seller/asslist', {
    "success": true,
    "errors": [],
    "data": {
        "list": [
            {
                "id": 1,
                "name": "张三",
                "phone": "18080091133",
                "status": "1"
            },
            {
                "id": 1,
                "name": "张三",
                "phone": "18080091133",
                "status": "0"
            }
        ],
        "allCount": 2
    }
});
//门店商品
Mock.mock(URI + '/seller/goodslist', {
    "success": true,
    "errors": [],
    "data": {
        "allCount": 3,
        "list": [
            {
                "sku_id": 1,
                "image": "5cf65d9fed1b7e255b1be1c25da0e1b9",
                "name": "农夫山泉矿泉水 水蜜桃 + 500ml",
                "price": "1.50",
                "save": 428,
                "sellNum": "5",
                "createTime": "2017-07-24 10:40:38",
                "attr": [
                    {
                        "name": "口味",
                        "value": "水蜜桃"
                    },
                    {
                        "name": "容量",
                        "value": "500ml"
                    }
                ],
                "unit": "瓶"
            },
            {
                "sku_id": 2,
                "image": "d58d1467874ae93d40857c3187668f49",
                "name": "农夫山泉矿泉水 荔枝 + 500ml",
                "price": "15.00",
                "save": 300,
                "sellNum": "8",
                "createTime": "2017-07-24 10:41:14",
                "attr": [
                    {
                        "name": "口味",
                        "value": "荔枝"
                    },
                    {
                        "name": "容量",
                        "value": "500ml"
                    }
                ],
                "unit": "瓶"
            },
            {
                "sku_id": 7,
                "image": "5cf65d9fed1b7e255b1be1c25da0e1b9",
                "name": "乐事薯片 椒盐 + 500g",
                "price": "13.00",
                "save": 250,
                "sellNum": "0",
                "createTime": "2017-07-24 10:41:37",
                "attr": [
                    {
                        "name": "口味",
                        "value": "椒盐"
                    },
                    {
                        "name": "大小",
                        "value": "500g"
                    }
                ],
                "unit": "包"
            }
        ]
    }
});
//门店采购记录
Mock.mock(URI + '/seller/orderlist', {
    "success": true,
    "errors": [],
    "data": {
        "list": [
            {
                "id": 6,
                "order_sn": "CD2017080652692",
                "seller_id": 2,
                "money": "536.00",
                "status": "待仓库确认",
                "payment_status": "待支付",
                "memo": "",
                "created_at": "2017-08-06 07:58:40"
            },
            {
                "id": 4,
                "order_sn": "CD201708022BBA2",
                "seller_id": 2,
                "money": "536.00",
                "status": "已完成",
                "payment_status": "待支付",
                "memo": "",
                "created_at": "2017-08-02 00:05:06"
            },
            {
                "id": 3,
                "order_sn": "CD201708029F6C2",
                "seller_id": 2,
                "money": "536.00",
                "status": "已完成",
                "payment_status": "待支付",
                "memo": "",
                "created_at": "2017-08-02 00:01:18"
            },
            {
                "id": 1,
                "order_sn": "dfsdgfhgfjtyyt454",
                "seller_id": 2,
                "money": "23456.55",
                "status": "已完成",
                "payment_status": "待支付",
                "memo": "hah",
                "created_at": "2017-07-24 13:36:51"
            }
        ],
        "allCount": 4
    }
});
//门店采购记录详情
Mock.mock(URI + '/seller/orderinfo', {
    "success": true,
    "errors": [],
    "data": {
        "allCount": 2,
        "list": [
            {
                "sku_id": 1,
                "image": "5cf65d9fed1b7e255b1be1c25da0e1b9",
                "name": "农夫山泉矿泉水 水蜜桃 + 500ml",
                "attr": [
                    {
                        "name": "口味",
                        "value": "水蜜桃"
                    },
                    {
                        "name": "容量",
                        "value": "500ml"
                    }
                ],
                "pur_num": "28瓶",
                "minUnit_num": "28瓶",
                "price": "2.00",
                "createTime": "2017-08-06 07:58:40"
            },
            {
                "sku_id": 8,
                "image": "5cf65d9fed1b7e255b1be1c25da0e1b9",
                "name": "乐事薯片 烧烤 + 500g",
                "attr": [
                    {
                        "name": "口味",
                        "value": "烧烤"
                    },
                    {
                        "name": "大小",
                        "value": "500g"
                    }
                ],
                "pur_num": "12箱",
                "minUnit_num": "240包",
                "price": "2.00",
                "createTime": "2017-08-06 07:58:40"
            }
        ]
    }
});
//门店结算记录
Mock.mock(URI + '/seller/settlement', {
    "success": true,
    "errors": [],
    "data": {
        "allCount": 1,
        "list": [
            {
                "time": "2017-07-24 16:13:59",
                "money": "12345.00"
            }
        ]
    }
});
//所有店员
Mock.mock(URI + '/seller/allasslist', {
    "success": true,
    "errors": [],
    "data": {
        "allCount": 3,
        "list": [
            {
                "id": 1,
                "name": "张三",
                "phone": "18080091133",
                "seller": "龙湖店",
                "status": "1"
            },
            {
                "id": 2,
                "name": "李四",
                "phone": "18080091122",
                "seller": "会展店",
                "status": "1"
            },
            {
                "id": 3,
                "name": "王五",
                "phone": "18080091111",
                "seller": "会展店",
                "status": "1"
            }
        ]
    }
});

//消费者列表
Mock.mock(URI + '/consumer/lists', {
    "success": true,
    "errors": [],
    "data": {
        "allCount": 3,
        "list": [
            {
                "id": 1,
                "name": "张三",
                "phone": "18080091133",
                "seller": "龙湖店",
                "status": "1"
            },
            {
                "id": 2,
                "name": "李四",
                "phone": "18080091122",
                "seller": "会展店",
                "status": "1"
            },
            {
                "id": 3,
                "name": "王五",
                "phone": "18080091111",
                "seller": "会展店",
                "status": "1"
            }
        ]
    }
});
//消费者详情
Mock.mock(URI + '/consumer/info', {
    "success": true,
    "errors": [],
    "data": {
        "id": 1,
        "name": "Tom",
        "phone": "18080091133",
        "city_id": 36,
        "area_id": 41,
        "address": "成都市 青羊区 金河路世纪大厦",
        "ext": "{\"wxToken\":\"qwertyuiop\"}"
    }
});
//消费者消费记录
Mock.mock(URI + '/consumer/orderlist', {
    "success": true,
    "errors": [],
    "data": {
        "allCount": 3,
        "list": [
            {
                "id": 1,
                "order_num": "dfadgsdf34234",
                "seller": "龙湖店",
                "amount": "188.00",
                "price": "188.00",
                "fav": "无",
                "pay_type": "微信",
                "note": "无",
                "created_at": "2017-07-25 11:02:11",
                "pay_time": "2017-07-25 11:02:07",
                "order_status": "已完成"
            },
            {
                "id": 2,
                "order_num": "345678989878",
                "seller": "龙湖店",
                "amount": "188.00",
                "price": "188.00",
                "fav": "无",
                "pay_type": "线下",
                "note": "无",
                "created_at": "2017-08-01 14:00:44",
                "pay_time": "2017-08-01 14:00:39",
                "order_status": "已取消"
            },
            {
                "id": 3,
                "order_num": "G80181754177087912",
                "seller": "会展店",
                "amount": "18.00",
                "price": "18.00",
                "fav": "--",
                "pay_type": "线下",
                "note": "--",
                "created_at": "2017-08-01 18:02:34",
                "pay_time": "2017-08-01 10:02:34",
                "order_status": "待付款"
            }
        ]
    }
});
//消费者订单详情
Mock.mock(URI + '/consumer/orderinfo', {
    "success": true,
    "errors": [],
    "data": {
        "allCount": 2,
        "list": [
            {
                "sku_id": 1,
                "image": "5cf65d9fed1b7e255b1be1c25da0e1b9",
                "name": "农夫山泉矿泉水 水蜜桃 + 500ml",
                "price": "12.00",
                "amount": "60.00",
                "goodsNum": 5,
                "unit": "瓶",
                "fav": "无",
                "attr": [
                    {
                        "name": "口味",
                        "value": "水蜜桃"
                    },
                    {
                        "name": "容量",
                        "value": "500ml"
                    }
                ]
            },
            {
                "sku_id": 2,
                "image": "d58d1467874ae93d40857c3187668f49",
                "name": "农夫山泉矿泉水 荔枝 + 500ml",
                "price": "15.00",
                "amount": "120.00",
                "goodsNum": 8,
                "unit": "瓶",
                "fav": "无",
                "attr": [
                    {
                        "name": "口味",
                        "value": "荔枝"
                    },
                    {
                        "name": "容量",
                        "value": "500ml"
                    }
                ]
            }
        ]
    }
});
//消费者来电记录
Mock.mock(URI + '/consumer/callorders', {
    "success": true,
    "errors": [],
    "data": {
        "allCount": 2,
        "list": [
            {
                "id": 2,
                "user_id": 5,
                "phone": "18080012233",
                "name": "18080012233",
                "call_type": "",
                "note": "价格问题",
                "created_at": "2017-08-01 17:50:34"
            },
            {
                "id": 1,
                "user_id": 1,
                "phone": "18080091133",
                "name": "李先生",
                "call_type": "",
                "note": "一份大鸡腿",
                "created_at": "2017-07-25 13:51:55"
            }
        ]
    }
});
//添加来电记录
Mock.mock(URI + '/consumer/addcall', {
    "success": true,
    "errors": [],
    "data": []
});

//订单列表
Mock.mock(URI + '/order/list', {
    "success": true,
    "errors": [],
    "data": {
        "allCount": 3,
        "list": [
            {
                "id": 3,
                "order_sn": "G80181754177087912",
                "seller": "会展店",
                "amount": "18.00",
                "fav": "--",
                "price": "18.00",
                "pay_type": "offline",
                "buyer": "Tom",
                "shipping_phone": "18080091133",
                "order_status": "wait",
                "created_at": "2017-08-01 18:02:34",
                "pay_type_name": "线下",
                "order_status_name": "待付款"
            },
            {
                "id": 2,
                "order_sn": "345678989878",
                "seller": "龙湖店",
                "amount": "188.00",
                "fav": "无",
                "price": "188.00",
                "pay_type": "offline",
                "buyer": "Tom",
                "shipping_phone": "18080092233",
                "order_status": "cacel",
                "created_at": "2017-08-01 14:00:44",
                "pay_type_name": "线下",
                "order_status_name": "已取消"
            },
            {
                "id": 1,
                "order_sn": "dfadgsdf34234",
                "seller": "龙湖店",
                "amount": "188.00",
                "fav": "无",
                "price": "188.00",
                "pay_type": "wechat",
                "buyer": "Tom",
                "shipping_phone": "18080092233",
                "order_status": "complate",
                "created_at": "2017-07-25 11:02:11",
                "pay_type_name": "微信",
                "order_status_name": "已完成"
            }
        ]
    }
});
//订单详情
Mock.mock(URI + '/order/info', {
    "success": true,
    "errors": [],
    "data": {
        "allCount": 1,
        "goodslist": [
            {
                "sku_id": 1,
                "image": "https://umijoy.s3.cn-north-1.amazonaws.com.cn/umijoy-5cf65d9fed1b7e255b1be1c25da0e1b9.jpg",
                "name": "农夫山泉矿泉水 水蜜桃 + 500ml",
                "price": "1.50",
                "amount": "18.00",
                "goodsNum": 12,
                "unit": "瓶",
                "fav": "--",
                "barcode": "1232453654",
                "attr": [
                    {
                        "name": "口味",
                        "value": "水蜜桃"
                    },
                    {
                        "name": "容量",
                        "value": "500ml"
                    }
                ]
            }
        ],
        "order_sn": "G80181754177087912",
        "pay_type": "offline",
        "order_status": "wait",
        "amount": "18.00",
        "price": "18.00",
        "pay_time": "2017-08-01 10:02:34",
        "created_at": "2017-08-01 18:02:34",
        "buyer": "Tom",
        "seller": "会展店",
        "fav": "--",
        "shipping_address": "成都市 双流县 龙泉街道",
        "shipping_phone": "18080091133",
        "delivery_person": "--",
        "delivery_phone": "--",
        "delivery_type": "门店配送上门",
        "note": "--",
        "pay_type_name": "线下",
        "order_status_name": "待付款",
        "completeTime": " ",
        "order_id": "3"
    }
});
//代客下单
Mock.mock(URI + '/order/add', {
    "success": true,
    "errors": [],
    "data": {
        "id": 23
    }
});



