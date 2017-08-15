module.exports = {
    // 用户
    user: 'user.list',  //管理员列表
    user_add: 'user.add', //新增管理员
    user_edit: 'user.update',//更新管理员
    user_info: 'user.info',//用户详情
    user_state: 'user.stat',//更改用户状态
    user_del: 'user.delete',//删除用户,

    //权限组
    group: 'rule.group',//权限分组
    group_add: 'rule.addgroup',//添加分组
    group_edit: 'rule.groupupdate',//编辑分组
    group_info: 'rule.groupinfo',//分组详情
    group_state: 'rule.stat',//更改用户状态
    group_del: 'rule.gdelete',//删除用户,

    //品牌
    brand_create: 'brand.create',//添加商品
    brand_update: 'brand.update',//修改品牌
    brand_stat: 'brand.state',//更改品牌状态
    brand_del: 'brand.delete',//删除品牌
    brand: 'brand.lists',//品牌列表
    brand_info: 'brand.info',//品牌详情

    //商品分类
    cate: 'category.lists',//商品分类列表
    cate_create: 'category.create',//添加商品分类
    cate_update: 'category.update',//修改商品分类
    cate_del: 'category.delete',//删除商品分类

    //商品模板
    attr_create: 'attr.create',//添加商品模板,
    attr_update: 'attr.update',//修改商品模板
    attr: 'attr.list',//商品属性模板
    attr_info: 'attr.info',//商品属性模板详情
    attr_del: 'attr.delete',//删除商品属性模板

    //商品
    goods: 'goods.list',//商品列表
    goods_add: 'goods.create',//添加商品
    godos_edit: 'goods.update',//修改商品
    goods_info: 'goods.info',//商品详情
    goods_factor: 'goods.unitfactor',//商品单位转换
    goods_sku: 'goods.skuinfo',//商品sku信息
    goods_sku_edit: 'goods.uupdate',//更新商品sku信息，


    //门店
    seller: 'seller.list',
    seller_create: 'seller.create',//添加门店
    seller_update: 'seller.update',//更改门店
    seller_info: 'seller.info',//门店信息
    seller_stat: 'seller.stat',//更改门店状态
    seller_del: 'seller.delete',//删除门店
    seller_asslist: 'seller.asslist',//获取门店店员
    seller_order: 'seller.orderlist',//门店订单
    seller_goods: 'seller.goodslist',//门店商品
    seller_all_asslist: 'seller.allasslist',//所有店员

    //消费者管理
    consumer: 'consumer.list',//消费者列表
    consumer_info: 'consumer.info',//消费者详情,
    consumer_order_list: 'consumer.orderlist',//消费者订单
    consumer_order_info: 'consumer.orderinfo',//订单详情
    consumer_call: 'consumer.callorders',//消费者来电记录

    //订单管理
    order: 'order.list',//订单列表
    order_state: 'order.stat',//订单状态
    order_info: 'order.info',//订单详情
    order_create: 'order.add',//代客下单

    //财务中心
    finance_pay: 'finance.userorders',//消费者支付记录
    finance_refund: 'finance.userrefund',//消费者退款记录,
    finance_purlist: 'finance.purlist',//门店采购记录
    finance_settle: 'finance.settlement',//门店结算记录 
    finance_cash: 'finance.approvallist',//门店提现申请
    finance_cash_audit: 'finance.approval',//门店提现审核
    finance_refund_applf: 'finance.refundlist',//用户退款申请
    finance_refund_audit: 'finance.refund',//用户退款审核

    //仓库相关
    godown: 'godown.list',//仓库列表
    godown_info: 'godown.info',//单个仓库信息
    godown_create: 'godown.create',//添加仓库
    godown_update: 'godown.update',//修改仓库
    godown_status: 'godown.status',//修改仓库状态
    godown_del: 'godown.delete',//删除仓库
    godown_adduser: 'godown.adduser',//添加仓库人员
    godown_userlist: 'godown.userlist',//仓库人员列表
    godown_deleteuser: 'godown.deleteuser',//删除仓库人员
}