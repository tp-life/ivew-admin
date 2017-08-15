const _import = require('./_import_' + process.env.NODE_ENV);

//login 
const Login = _import('Login/Login');

//layout
const layout = _import('main');

//主面板
const main = _import('index/index');

/** 用户模块 start **/
//用户中心
const userMain = _import('user/user');
//添加用户
const addUser = _import('user/add');
//修改用户
const editUser = _import('user/edit');

//修改密码
const changPwd = _import('user/pwd');
/** 用户模块 end */

/** 权限模块 start */

//权限列表
const authMain = _import('auth/rule');
//添加权限
const addAuth = _import('auth/add');
//修改权限
const editAuth = _import('auth/edit');
/** 权限模块end */

/**  商品模块 start  **/

//品牌列表
const brand = _import('brand/index');
//添加品牌
const brandAdd = _import('brand/add');
//编辑品牌
const brandEdit = _import('brand/edit');
//商品分类
const cate = _import('cate/index');

//商品模板
const goodsTempMain = _import('attr/index');
//添加商品模板
const addGoodsTemp = _import('attr/add');
//修改商品模板 
const editGoodsTemp = _import('attr/edit');

//商品列表
const goodsMain = _import('goods/index');
//添加商品
const addGoods = _import('goods/add');
//编辑商品
const editGoods = _import('goods/edit');
/** 商品模块 end  **/


/** 门店管理 start **/
const seller = _import('seller/index');
//添加门店
const sellerAdd = _import('seller/add');
//修改门店
const sellerEdit = _import('seller/edit');
//门店详情
const sellerInfo = _import('seller/info');
//店员管理
const sellerAsslist = _import('asslist/index');

/** 门店管理end **/

/** 消费者管理 start **/
//消费者列表
const consumer = _import('consumer/index');
//消费者详情
const consumerInfo = _import('consumer/info');
/** 消费者管理end **/

/** 订单模块 start **/

//订单列表
const order = _import('orders/index');
//订单详情
const orderInfo = _import('orders/info');

//呼叫中心
const call = _import('orders/call');
//代客下单
const buy = _import('orders/buy');

/** 订单模块 end **/

//** 财务中心 start */
const finance = _import('finance/index');
//结算审批列表
const cash = _import('finance/cash');
//退款审批列表
const refund = _import('finance/refund');
//退款单详情
const refundInfo = _import('finance/refundInfo');

//** 财务中心 end */

/** 仓库模块 start **/
//仓库列表
const godown = _import('godown/index');

//添加仓库
const godown_create = _import('godown/add');
//编辑仓库
const godown_update = _import('godown/edit');
//仓库人员
const godown_user = _import('godown/user');
//添加仓库人员
const godown_adduser = _import('godown/adduser');

/** 仓库模块 end **/

export default [
  {
    path: '/login', component: Login, hidden: true
  },
  {
    path: '/', redirect: '/main', hidden: true
  },
  {
    path: '/main', name: '', icon: 'grid', component: layout, noDropdown: true, children: [{ path: '', name: '主页', component: main }]
  },
  {
    path: '/sys', name: '系统设置', icon: 'ios-cog', component: layout, redirect: '/sys/user',
    children: [
      { path: 'user', name: '用户列表', meta: { alias: 'user' }, component: userMain },
      { path: 'user/add', name: '添加用户', meta: { alias: 'user_add' }, component: addUser, hidden: true },
      { path: 'user/edit', name: '编辑用户', meta: { alias: 'user_edit' }, component: editUser, hidden: true },
      { path: 'user/change', name: '修改密码', meta: { alias: 'user_pwd' }, component: changPwd, hidden: true },
      { path: 'group', name: '权限分组', meta: { alias: 'group' }, component: authMain },
      { path: 'group/add', name: '添加分组', meta: { alias: 'group_add' }, component: addAuth, hidden: true },
      { path: 'group/edit', name: '编辑分组信息', meta: { alias: 'group_edit' }, component: editAuth, hidden: true }
    ]
  },
  {
    path: '/pro', name: '产品中心', component: layout, redirect: '/pro/goods', icon: 'android-playstore',
    children: [
      { path: 'brand', name: '品牌列表', meta: { alias: 'brand' }, component: brand },
      { path: 'brand/add', name: '添加品牌', meta: { alias: 'brand_create' }, component: brandAdd, hidden: true },
      { path: 'brand/edit', name: '编辑品牌', meta: { alias: 'brand_update' }, component: brandEdit, hidden: true },
      { path: 'cate', name: '商品分类', meta: { alias: 'cate' }, component: cate },
      { path: 'cate/add', name: '添加分类', meta: { alias: 'cate_create' }, component: addGoodsTemp, hidden: true },
      { path: 'cate/edit', name: '编辑分类', meta: { alias: 'cate_update' }, component: editGoodsTemp, hidden: true },
      { path: 'attrtemp', name: '属性模板', meta: { alias: 'attr' }, component: goodsTempMain },
      { path: 'attrtemp/add', name: '添加属性模板', meta: { alias: 'attr_create' }, component: addGoodsTemp, hidden: true },
      { path: 'attrtemp/edit', name: '编辑属性模板', meta: { alias: 'attr_update' }, component: editGoodsTemp, hidden: true },
      { path: 'goods', name: '商品列表', meta: { alias: 'goods' }, component: goodsMain },
      { path: 'goods/add', name: '添加商品', meta: { alias: 'goods_add' }, component: addGoods, hidden: true },
      { path: 'goods/edit', name: '编辑商品', meta: { alias: 'godos_edit' }, component: editGoods, hidden: true },
    ]
  },
  {
    path: '/seller', name: '门店管理', component: layout, redirect: '/seller/store', icon: 'pricetags',
    children: [
      { path: 'store', name: '门店列表', meta: { alias: 'seller' }, component: seller },
      { path: 'store/add', name: '添加门店', meta: { alias: 'seller_create' }, component: sellerAdd, hidden: true },
      { path: 'store/edit', name: '修改门店', meta: { alias: 'seller_update' }, component: sellerEdit, hidden: true },
      { path: 'store/info', name: '门店详情', meta: { alias: 'seller_info' }, component: sellerInfo, hidden: true },
      { path: 'asslist', name: '店员管理', meta: { alias: 'seller_all_asslist' }, component: sellerAsslist }
    ]
  },
  {
    path: '/consumer', name: '消费者管理', component: layout, redirect: '/consumer/index', icon: 'cube',
    children: [
      { path: 'index', name: '消费者列表', meta: { alias: 'consumer' }, component: consumer },
      { path: 'info', name: '消费者详情', meta: { alias: 'consumer_info' }, component: consumerInfo, hidden: true },
    ]
  },
  {
    path: '/order', name: '订单管理', component: layout, redirect: '/order/index', icon: 'bag',
    children: [
      { path: 'index', name: '订单列表', meta: { alias: 'order' }, component: order },
      { path: 'info', name: '订单详情', meta: { alias: 'order_info' }, component: orderInfo, hidden: true },
      { path: 'call', name: '呼叫记录', meta: { alias: 'consumer_call' }, component: call },
      { path: 'buy', name: '代客下单', meta: { alias: 'order_create' }, component: buy },
    ]
  },
  {
    path: '/finance', name: '财务中心', component: layout, redirect: '/finance/index', icon: 'social-yen',
    children: [
      { path: 'index', name: '支付记录', meta: { alias: 'finance_pay' }, component: finance },
      { path: 'pay', name: '消费者支付记录', meta: { alias: 'finance_pay' }, component: finance, hidden: true },
      { path: 'urefund', name: '消费者退款记录', meta: { alias: 'finance_refund' }, component: finance, hidden: true },
      { path: 'purlist', name: '门店采购支付记录', meta: { alias: 'finance_purlist' }, component: finance, hidden: true },
      { path: 'settlement', name: '门店结算记录', meta: { alias: 'finance_settle' }, component: finance, hidden: true },
      { path: 'approvallist', name: '提现审批', meta: { alias: 'finance_cash' }, component: cash },
      { path: 'approval', name: '提现申请', meta: { alias: 'finance_cash_audit' }, component: finance, hidden: true },
      { path: 'refundlist', name: '退款审批', meta: { alias: 'finance_refund_applf' }, component: refund },
      { path: 'refundinfo', name: '退款单详情', meta: { alias: 'finance_refund_audit' }, component: refundInfo, hidden: true },
    ]
  },
  {
    path: '/godown', name: '仓库管理', component: layout, redirect: '/godown/index', icon: 'soup-can',
    children: [
      { path: 'index', name: '仓库列表', meta: { alias: 'godown' }, component: godown },
      { path: 'add', name: '添加仓库', meta: { alias: 'godown_create' }, component: godown_create, hidden: true },
      { path: 'edit', name: '编辑仓库', meta: { alias: 'godown_update' }, component: godown_update, hidden: true },
      { path: 'user', name: '仓库人员', meta: { alias: 'godown_userlist' }, component: godown_user },
      { path: 'useradd', name: '添加仓库人员', meta: { alias: 'godown_adduser' }, component: godown_adduser, hidden: true },
    ]
  }


]