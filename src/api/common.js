import * as ax from './instrance';


//上传地址：
export const uploadUrl = ax.uploadUrl;

//获取菜单
export const getAllMenu = (params) => {
  return ax.g('/rule/uroles', params);
}

// 用户登录
export const Login = (params) => {
  return ax.p('/user/login', params);
}

/**
 *  用户列表接口start
 */

//单个用户列表用户详细数据
export const getUserList = (params) => {
  return ax.g('/user/search', params);
}

export const userInfo = (params) => {
  return ax.g('/user/info', params);
}

//删除用户列表用户
export const delUser = (params) => {
  return ax.d('/user/delete', params);
};

//更改用户状态
export const changeUser = (params) => {
  return ax.u('/user/stat', params);
}


//新增用户
export const createUser = (params) => {
  return ax.p('/user/add', params);
}


//修改用户资料
export const modUser = (params) => {
  return ax.u('/user/update', params);
}

//添加用户--权限分组
export const userGroup = (params) => {
  return ax.g('/user/groups', params);
}

//修改密码
export const userChangePwd = params => {
  return ax.pa('/user/updatepwd', params);
}

/** 用户列表接口 end */

/** 权限接口 start */

//获取权限分组
export const authGroup = (params) => {
  return ax.g('/rule/gsearch', params);
}

//删除用户列表用户
export const delGroup = (params) => {
  return ax.d('/rule/gdelete', params);
};

//更改分组状态
export const changeGroup = (params) => {
  return ax.u('/rule/stat', params);
}


//新增分组
export const createGroup = (params) => {
  return ax.p('/rule/addgroup', params);
}

//修改分组
export const updateGroup = (params) => {
  return ax.u('/rule/groupupdate', params);
}

//获取分组详情信息
export const groupInfo = (params) => {
  return ax.g('/rule/groupinfo', params);
}
//获取权限列表
export const getRule = (params) => {
  return ax.g('/rule/list', params);
}

/** 权限接口 end */


/** 商品管理中心 start */


/***** 品牌 start  ******/
//品牌列表
export const getBrand = (params) => {
  return ax.g('/brand/lists', params);
}

//更改品牌状态
export const brandStat = (params) => {
  return ax.pa('/brand/stat', params);
}

//删除品牌
export const brandDel = (params) => {
  return ax.d('/brand/delete', params);
}

//添加品牌
export const brandCreate = (params) => {
  return ax.p('/brand/create', params);
}

//修改品牌
export const brandEdit = (params) => {
  return ax.u('/brand/update', params);
}

//获取品牌详情
export const brandInfo = (params) => {
  return ax.g('/brand/info', params);
}

/****** 品牌end ******/

/** 商品分类start **/

//分类列表
export const getCate = params => {
  return ax.g('/category/lists', params);
}

//添加分类
export const cateCreate = params => {
  return ax.p('/category/create', params);
}

//修改分类
export const cateEdit = params => {
  return ax.u('/category/update', params);
}

//获取分类祥情
export const cateInfo = params => {
  return ax.g('/category/info', params);
}

//删除分类
export const cateDel = params => {
  return ax.d('/category/delete', params);
}

/** 商品分类end **/

/** 属性模板 start */

//获取属性模板列表
export const getAttrLists = (params) => {
  return ax.g('/attr/list', params);
}

//更改模板状态
export const changeAttrStatus = (params) => {
  return ax.u('/user/stat', params);
}

//删除属性模板
export const delAttr = (params) => {
  return ax.d('attr/delete', params);
}

//新增属性模板
export const createAttrTemp = params => {
  return ax.p('/attr/create', params);
}

//修改属性模板
export const updateAttrTemp = params => {
  return ax.u('/attr/update', params);
}

//获取模板详情
export const getAttrTempInfo = params => {
  return ax.g('/attr/info', params);
}

/** 属性模板 end */

/** 仓库商品 start */

//商品列表
export const getGoodsLists = params => {
  return ax.g('/goods/list', params);
}

//添加商品
export const goodsCreate = params => {
  return ax.p('/goods/create', params);
}

//商品详情
export const goodsInfo = params => {
  return ax.g('/goods/info', params);
}

//修改商品
export const goodsEdit = params => {
  return ax.u('/goods/update', params)
}

/** 仓库商品 end */

/** 商品管理中心 end */

/** 门店管理start **/
export const sellerLists = params => {
  return ax.g('/seller/list', params);
}

//添加门店
export const sellerCreate = params => {
  return ax.p('/seller/create', params);
}

//获取门店信息
export const sellerInfo = params => {
  return ax.g('/seller/info', params);
}

//修改门店
export const sellerEdit = params => {
  return ax.u('/seller/update', params);
}

//更改门店状态
export const sellerChange = params => {
  return ax.u('/seller/stat', params);
};

//删除门店
export const sellerDel = params => {
  return ax.d('/seller/delete', params);
}

//地址信息
export const area = params => {
  return ax.g('/seller/area', params);
}

//门店店员
export const assistants = params => {
  return ax.g('/seller/asslist', params);
}

//门店商品
export const sellerGoods = params => {
  return ax.g('/seller/goodslist', params);
}

//门店采购记录
export const sellerPur = params => {
  return ax.g('/seller/orderlist', params);
}

//门店采购记录详情
export const purchaseInfo = params => {
  return ax.g('/seller/orderinfo', params);
}

//门店结算记录
export const sellerSettlement = params => {
  return ax.g('/seller/settlement', params);
}

//所有店员
export const assistantsAll = params => {
  return ax.g('/seller/allasslist', params);
}

/** 门店管理end **/

/** 消费者管理 start **/

//消费者列表
export const consumer = params => {
  return ax.g('/consumer/lists', params);
}

//消费者详情
export const consumerInfo = params => {
  return ax.g('/consumer/info', params);
}

//消费者消费记录
export const consumerOrder = params => {
  return ax.g('/consumer/orderlist', params);
}

//消费者订单详情
export const consumerOrderInfo = params => {
  return ax.g('/consumer/orderinfo', params);
}

//消费者来电记录
export const consumerCall = params => {
  return ax.g('/consumer/callorders', params);
}
//添加来电记录
export const addCall = params => {
  return ax.p('consumer/addcall', params);
}

/** 消费者管理 end **/

/** 订单中心 start **/

//订单列表
export const orderLists = params => {
  return ax.g('/order/list', params);
}
//呼叫记录列表
export const orderCallList = params => {
  return ax.g('/consumer/callorders', params);
}

//订单详情
export const orderInfo = params => {
  return ax.g('/order/info', params);
}
//代客下单
export const addOrder = params => {
  return ax.p('/order/add', params);
}

/** 订单中心end **/

/** 财务中心 start */

export const userOrders = params => {
  //消费者支付记录
  return ax.g('finance/userorders', params);
}

//消费者退款记录
export const userRefund = params => {
  return ax.g('finance/userrefund', params);

}
//门店采购记录
export const allSellerPur = params => {
  return ax.g('finance/purlist', params);
}
//门店结算记录
export const allSellerPayments = params => {
  return ax.g('finance/settlement', params);
}
//结算审批列表 
export const approvallist = params => {
  return ax.g('finance/approvallist', params);
}
//结算审批
export const approval = params => {
  return ax.pa('finance/approval', params);
}
//退款列表
export const refund = params => {
  return ax.g('finance/refundlist', params);
}
//退款审批
export const refundSure = params => {
  return ax.pa('finance/refund', params);
}
//退款单信息
export const refundInfo = params => {
  return ax.g('finance/refundinfo', params);
}

//仓库列表
export const godown = params => {
  return ax.g('godown/list', params);
}
//添加仓库
export const godownCreate = params => {
  return ax.p('godown/create', params);
}
//仓库详情
export const godownInfo = params => {
  return ax.g('godown/info', params);
}

//修改仓库
export const godownUpdate = params => {
  return ax.u('godown/update', params);
}
//更改仓库状态
export const godownStatus = params => {
  return ax.pa('godown/status', params);
}
//删除仓库
export const godownDel = params => {
  return ax.d('godown/delete', params);
}

//仓库人员
export const godownUser = params => {
  return ax.g('godown/userlist', params);
}
//删除仓库人员
export const godownUserDel = params => {
  return ax.d('godown/deleteuser', params);
}
//添加仓库人员
export const godownUserCreate = params => {
  return ax.p('godown/adduser', params);
}