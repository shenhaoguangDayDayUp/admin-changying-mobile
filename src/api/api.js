import Api from './Apis';
export let loginApi = new Api('user','id',{
    login:{
        url: 'login',
        method: 'put',
    },
    logout:{
        url: 'logout',
        method: 'put',
    },
})
// 会员相关
export let mbrApi = new Api('member','id',{
    getVipList:{
        url: 'list/vip/', // 贵宾列表
    },
    getAuthList:{
        url: 'list/authentication', // 待认证名单
    },
    delVip:{
        url: 'vip/{id}', //移除贵宾
        method:'delete',
    },
    changeStatus:{
        url:'status',//更改用户状态
        method:'put'
    },
    addVip:{
        url:'vip/{id}',// 加入贵宾
        method:'post',
    },
    searchVip:{
        url:'entity/{id}', // 会员查询
        method:'get',
    },
    getMbrList:{
        url:'list', // 会员列表
        method:'get',
    },
    userInfo:{
        url:'entity/{id}', // 会员详情
        method:'get'
    },
    getBlackList:{
        url:'list/suspend',// 黑名单列表
        method:'get'
    },
    addBlackList:{
        url:'list/suspend/{id}',// 加入黑名单
        method:'post'
    },
    delBlackList:{
        url:'list/suspend/{id}',// 删除黑名单
        method:'delete'
    }
})
// 认证
export let authApi = new Api('member','id',{
    front:{url:'idcard/front/{id}'},// 身份证正面
    back:{url:'idcard/back/{id}'},// 身份证背面
    auth:{
        url:'authenticate/{id}',// 认证
        method:'put'
    }
})

export let rechargesApi = new Api('account/recharge','id')//充值
export let rechargesTotalApi = new Api('account/recharge/total')//充值总计

export let bonusApi = new Api('account/recharge/bonus','id')//赠送
export let bonusTotalApi = new Api('account/recharge/bonus/total','id')//赠送

export let paymentApi = new Api('account/bet','id')//消费
export let paymentTotalApi = new Api('account/bet/total','id')//消费

export let prizepoolsApi = new Api('account/prizepools','id')//奖金池
export let prizepoolsDetailApi = new Api('account/prizepool','id',{
    detail:{url:'{id}'},// 奖金池详情
})

export let prizepoolsTotalApi = new Api('account/prizepools/total','id')//奖金池
export let prizepoolsDetailTotalApi = new Api('account/balance','id')//奖金池

export let issuanceApi = new Api('account/issuance','id')//发行费
export let issuanceTotalApi = new Api('account/issuance/total','id')//发行费

export let welfareApi = new Api('account/welfare','id')//发行费
export let welfareTotalApi = new Api('account/welfare/total','id')//发行费

export let redeemApi = new Api('account/redeem','id')//兑换
export let redeemTotalApi = new Api('account/redeem/total','id')//兑换总数

export let rechargeBonusApi = new Api('rule/rechargeBonus','id')//业务规则-充值赠送
export let rechargeCapApi = new Api('rule/rechargeCap','id')//业务规则-充值上限

export let productListApi = new Api('store/product/list','id')//兑换中心列表
export let productDetailApi = new Api('store/product/entity','id')//兑换中心列表
export let productSearchApi = new Api('store/product/search','id')//搜索
export let productAddApi = new Api(`store/product/add`,'id')//新增

export let productPreviewApi = new Api('store/product/preview','id')//预览

export let orderUnpaidApi = new Api('store/order/list/unpaid','id')//代付款
export let orderUnreceivedApi = new Api('store/order/list/unreceived','id')//代收获
export let orderAllApi = new Api('store/order/list/all','id')//全部
export let orderEntityDetailApi = new Api('store/order/entity','id')//兑换订单详情
export let gameListDropdownApi = new Api('game/list/dropdown','id')//游戏下拉
export let accountPaymentTotalApi = new Api('account/bet/game/total','id')//奖池消费合计
export let payoutTotalApi = new Api('account/payout/game/total','id')//奖池奖金合计

// 充值相关
export let rechargeApi = new Api('account/recharge','id',{
    rechargeList:{url:'member/transaction/{id}'},// 充值明细
    rechargeTotal:{url:'member/total/{id}'},// 充值合计
})

// 积分相关
export let integralApi = new Api('account','id',{
    integralList:{url:'transaction/{id}' },// 会员 交易明细
    mbrexpenseDetail:{ url:'bet/member/transaction/{id}' },// 会员 下注明细
    mbrprizeDetail:{ url:'payout/member/transaction/{id}'},// 会员 奖金明细
    mbrwelfareDetail:{url:'welfare/game/transaction/{id}'},// 会员 公益金明细
    mbrwelfareTotal:{url:'welfare/game/total/{id}'},// 会员 公益金合计
    mbrissuanceDetail:{ url:'issuance/game/transaction/{id}'},// 会员 发行费明细
    mbrissuanceTotal:{ url:'issuance/game/total/{id}'},// 会员 发行费合计
    mbrredeemDetail:{ url:'redeem/member/transaction/{id}'},// 会员 兑换明细
    mbrredeemTotal:{url:'redeem/member/total/{id}'},// 会员 兑换总计
    mbrprizeTotal:{ url:'payout/member/total/{id}'},// 会员 奖金合计
    mbrexpenseTotal:{url:'bet/member/total/{id}'},// 会员 下注合计
    bonusList:{ url:'payout/member/transaction/{id}'},// 会员 奖金明细
    integralRest:{ url:'balance/{id}'},// 会员 积分余额（奖池余额）
    expenseDetail:{ url:'bet/game/transaction/{id}'},// 游戏 下注明细
    prizePoolList:{ url:'prizepool/{id}'},// 游戏 奖金池明细 交易明细
    prizeList:{ url:'payout/game/transaction/{id}'},// 游戏 奖金明细
    prizeTotal:{ url:'payout/game/total/{id}'},// 游戏 奖金合计
    expenseTotal:{ url:'bet/game/total/{id}'}// 游戏 下注总计
})

// 游戏相关
export let gameApi = new Api('game','id/index',{
    gameList:{ url:'list'},// 游戏列表
    gameDetail:{ url:'entity/{id}'},// 游戏详情
    gameEdit:{
        url:'entity', // 游戏 费用计提或 状态编辑
        method:'put'
    },
    gameAdd:{
        url:'entity',// 新增游戏
        method:'post'
    },
    gameIcon:{
        url:'icon/{id}', // 游戏图标上传
        method:'post'
    },
    gameBanner:{
        url:'banner/{id}/{index}', // 游戏轮播图上传
        method:'post'
    },
    gameStatus:{
        url:'status', // 游戏icon上传
        method:'put'
    },
})

// 总览相关
export let chartApi = new Api('analytics','id',{
    overView:{ url:'overview' },// 总览信息
    rechargeChart:{ url:'recharge/count'},//充值数量
    rechargeTotalChart:{ url:'recharge/total' },//充值合计
    mbrBetRank:{ url:'bet/ranking/member'},// 会员下注排行榜
    mbrRechargeRank:{ url:'recharge/ranking/member'},// 會員充值的排行榜
    betChart:{ url:'bet/count' },//下注数量
    betTotalChart:{ url:'bet/total'},//下注合计
    mbrBetRank:{ url:'bet/ranking/member'},// 会员下注排行榜
    gameBetRank:{ url:'bet/ranking/game'},// 游戏下注排行榜
    mbrPrizeRank:{ url:'payout/ranking/member'}, // 会员收奖排行榜
    gamePrizeRank:{ url:'payout/ranking/game'},// 游戏收奖排行榜
    exchangeRank:{ url:'redeem/ranking/product'},// 兑换排行榜
    prizeChart:{ url:'payout/count'}, //奖金数量
    prizeTotalChart:{ url:'payout/total' },//奖金合计
    exchangeChart:{ url:'redeem/count' },//兑换数量
    exchangeTotalChart:{ url:'redeem/total' },//兑换合计
})
// 广告相关
export let adverListApi = new Api('marketing/banner/list','id') // 广告清单
export let adverAddApi = new Api('marketing/banner/entity','id') // 广告清单
export let rewordListApi = new Api('account/payout','id') // 奖金
export let rewordDetApi = new Api('account/payout/total','id') // 奖金
export let notificationApi = new Api('marketing/announcement/list','id') // 公告
export let notificationAddApi = new Api('marketing/announcement/entity','id') // 公告
export let marketingWelfareApi = new Api('marketing/welfare/list','id') // 公益项目
export let marketingWelfareEntityApi = new Api('marketing/welfare/entity','id') // 公益项目

export let businessApi = new Api('operation/unit/list','id') //营业管理
export let businessCreateApi = new Api('operation/unit/entity','id') //营业管理
export let businessLocationApi = new Api('operation/location/entity','id') //营业管理
export let businessDeviceApi = new Api('operation/device/entity','id') //营业管理
export let businessDropdownApi = new Api('operation/location/dropdown','id') //营业管理










